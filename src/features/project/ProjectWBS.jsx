import { useEffect, useState, useRef } from "react";
import { HotTable, HotColumn } from '@handsontable/react-wrapper';
import Handsontable from 'handsontable';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';
import { getWbsData, getWbsDateInfo } from "./wbs/wbsAPI";
import '../../theme/pikaday.css';
import { getMemberListAPI } from "./member/memberAPI";
import { updateTaskAPI } from "./task/taskAPI";

// register Handsontable's modules
registerAllModules();

const ProjectWBS = ({projectId}) => {

  const hotTableRef = useRef(null);

  //화면 표시 용
  const [saturdayCols, setSaturdayCols] = useState([]);
  const [sundayCols, setSundayCols] = useState([]);
  const [weekHeaders, setWeekHeaders] = useState([]);
  const [dateHeaders, setDateHeaders] = useState([]);
  const [columns, setColumns] = useState([]);
  const [wbsData, setWbsData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [headerRes, wbsRes, memberRes] = await Promise.all(
          [
            getWbsDateInfo(projectId),
            getWbsData(projectId),
            getMemberListAPI(projectId)
          ]
        );
        //console.log("📦 wbsRes", JSON.stringify(wbsRes.data, null, 2)); 

        if(headerRes.data){
          await setNestedHeaders(headerRes.data);
          await setWeekEndCols(headerRes.data);

          if(memberRes.data){
            await setCols(headerRes.data, memberRes.data);
          }
        }

        if(wbsRes.data){
          await setWbsData(wbsRes.data);
        }

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [projectId]);

  const setNestedHeaders = async (data) => {

    const fixedWeekHeaders = [
      { label: '', rowspan: 2 },
      { label: '', rowspan: 2 },
      { label: '', rowspan: 2 },
      { label: '', rowspan: 2 },
      { label: '', rowspan: 2 },
      { label: '계획', colspan: 3 },
      { label: '실적', colspan: 3 },
      { label: '', rowspan: 2 }
    ];

    const fixedDateHeaders = [
      { label: '작업 ID' },
      { label: 'Depth' },
      { label: '작업 명' },
      { label: '담당자' },
      { label: '파트 명' },
      { label: '시작일' },
      { label: '종료일' },
      { label: '진행률(%)' },
      { label: '시작일' },
      { label: '종료일' },
      { label: '진행률(%)' },
      { label: '가중치' }
    ];

    const weekExtras = data.weeks.map(element => ({
      label: element.label,
      colspan: element.dateCnt
    }));
  
    const dateExtras = data.dates.map(element => ({
      label: element.date.substring(8, 10)
    }));
  
    setWeekHeaders([...fixedWeekHeaders, ...weekExtras]);
    setDateHeaders([...fixedDateHeaders, ...dateExtras]);
  }

  const setWeekEndCols = async (data) => {
    data.dates.forEach((element, idx) => {
      if(element.dayOfWeek == 6){
        setSaturdayCols(prev => [...prev, ...[12+idx]]);        
      }else if(element.dayOfWeek == 7){
        setSundayCols(prev => [...prev, ...[12+idx]]);        
      }
    });
  }

  const setCols = async (dateData, memberData) => {

    const source = [];

    memberData.forEach((elm, idx)=>{
      source.push(elm.user.userNm);
    })


    const fixedColumns = [
      { data: 'taskId', readOnly: true },
      { data: 'depth' },
      { data: 'taskNm' },
      { 
        data: 'charge' ,
        type: 'dropdown',
        source: source
      },
      { data: 'partNm', editor: false },
      { 
        data: 'planStartDt',
        type: 'date',
        dateFormat: 'YYYY-MM-DD',
        correctFormat: true,
        defaultDate: '2025-01-01',
        datePickerConfig: {
          firstDay: 0
        }
      },
      { 
        data: 'planEndDt',
        type: 'date',
        dateFormat: 'YYYY-MM-DD',
        correctFormat: true,
        defaultDate: '2025-01-01',
        datePickerConfig: {
          firstDay: 0
        }
      },
      { data: 'planProgress', readOnly: true },
      { 
        data: 'realStartDt',
        type: 'date',
        dateFormat: 'YYYY-MM-DD',
        correctFormat: true,
        defaultDate: '2025-01-01',
        datePickerConfig: {
          firstDay: 0
        }
      },
      { 
        data: 'realEndtDt',
        type: 'date',
        dateFormat: 'YYYY-MM-DD',
        correctFormat: true,
        defaultDate: '2025-01-01',
        datePickerConfig: {
          firstDay: 0
        }
      },
      { data: 'realProgress', readOnly: true },
      { data: 'weight', type: 'numeric' }
    ]

    const columnsExtras = dateData.dates.map(element => ({
      data : element.date,
      readOnly: true
    }));

    setColumns([...fixedColumns, ...columnsExtras]);
  }

  function indentRenderer(instance, td, row, col, prop, value, cellProperties){
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    // row 데이터에서 depth 가져오기 (data[row][1]이 depth임)
    const rowData = instance.getDataAtRow(row);
    const depth = parseInt(rowData[1] || 0, 10);
    td.style.paddingLeft = `${5+ (depth * 20)}px`; // depth 1당 20px 들여쓰기
    td.className = "ht-theme-main htLeft"
  }

  //간트차트 색칠하기
  function highlightRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = '#48A6A7'; // 여기선 !important 필요 없음
  }
  function highlightRemoveRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = '#FFFFFF'; // 여기선 !important 필요 없음
  }

  return (
    wbsData.length > 0 && (
      <HotTable
        ref={hotTableRef}
        data={wbsData}
        rowHeaders={true}
        rowHeaderWidth={100}
        colHeaders={false}
        hiddenColumns={{
          columns: [1],
          indicators: false,
        }}
        columns = {columns}
        nestedHeaders={[weekHeaders, dateHeaders]}
        nestedRows={true}
        afterGetColHeader={(col, TH, headerLevel) => {
          if(headerLevel === 1){
            if (sundayCols.includes(col)) {
              TH.style.backgroundColor = '#fdd'; // 연한 빨강
              TH.style.color = '#d00'; // 진한 빨강 글씨
            }
        
            if (saturdayCols.includes(col)) {
              TH.style.backgroundColor = '#ddf'; // 연한 파랑
              TH.style.color = '#00f'; // 진한 파랑 글씨
            }
          }
        }}
        height="auto"
        autoWrapRow={true}
        autoWrapCol={true}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        className="ht-theme-main htCenter"
        colWidths={[65,10,300,100,100,120,120,80,120,120,80,50]}
        afterChange={(changes, source) => {
          if (source === 'edit' && changes){
            const hot = hotTableRef.current.hotInstance;

            changes?.forEach(([row, prop, oldValue, newValue]) => {
              if(oldValue != newValue){
                const visibleRowData = hot.getDataAtRow(row);
                const taskId = visibleRowData[0]; //taskId 0번

                const data = {
                  taskId : taskId,
                  [prop] : newValue
                }
                
                const response = updateTaskAPI(projectId, data);
                console.log(response.data);
              }
            });
          }
        }}
        cells={(row, col) => {
          const cellProperties = {};

          const instance = hotTableRef.current?.hotInstance;
          if (!instance) return cellProperties; // 인스턴스 없으면 return

          const rowData = instance.getSourceDataAtRow(row);
          if (!rowData) return cellProperties;  // Data조회 전 return

          //1. depth 기준 들여쓰기
          if (col === 2) {
            cellProperties.renderer = indentRenderer;
          }

          //2. WBS 날짜 색칠 
          //TO-DO : 계획, 실제 RADIO 버튼 생성
          const dateCol = columns[col]?.data;
          const planStart = rowData.planStartDt;
          const planEnd = rowData.planEndDt;
          if (/\d{4}-\d{2}-\d{2}/.test(dateCol)) {
            if (dateCol >= planStart && dateCol <= planEnd) {
              cellProperties.renderer = highlightRenderer;
            }else{
              cellProperties.renderer = highlightRemoveRenderer;
            }
          }
          return cellProperties;
        }}
      />
    )
  );
};

export default ProjectWBS;
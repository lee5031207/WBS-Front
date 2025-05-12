import { useEffect, useState } from "react";
import { HotTable, HotColumn } from '@handsontable/react-wrapper';
import Handsontable from 'handsontable';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';
import { getWbsDateInfo } from "./projectAPI";

// register Handsontable's modules
registerAllModules();

const ProjectWBS = ({projectId}) => {

  //화면 표시 용
  const [saturdayCols, setSaturdayCols] = useState([]);
  const [sundayCols, setSundayCols] = useState([]);

  const [weekHeaders, setWeekHeaders] = useState([
    { label: '', rowspan: 2 },
    { label: '', rowspan: 2 },
    { label: '', rowspan: 2 },
    { label: '', rowspan: 2 },
    { label: '', rowspan: 2 },
    { label: '계획', colspan: 3 },
    { label: '실적', colspan: 3 },
    { label: '', rowspan: 2 }
  ]);

  const [dateHeaders, setDateHeaders] = useState([
    { label: '작업 ID' },
    { label: 'Depth' },
    { label: '작업 명' },
    { label: '담당자' },
    { label: '파트 명' },
    { label: '시작일' },
    { label: '종료일' },
    { label: '진행율' },
    { label: '시작일' },
    { label: '종료일' },
    { label: '진행율' },
    { label: '가중치' }
  ]);

  //columns 지정
  const [columns, setColumns] = useState([
    { data: 'taskId' },
    { data: 'depth' },
    { data: 'taskNm' },
    { data: 'charge' },
    { data: 'part' },
    { data: 'planStartDt' },
    { data: 'planEndDt' },
    { data: 'planProgress' },
    { data: 'realStartDt' },
    { data: 'realEndDt' },
    { data: 'realProgress' },
    { data: 'weight' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [headerRes] = await Promise.all(
          [
            getWbsDateInfo(projectId)
          ]
        )
        if(headerRes.data){
          await setNestedHeaders(headerRes.data);
          await setWeekEndCols(headerRes.data);
          await setCols(headerRes.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [projectId]);

  const setNestedHeaders = async (data) => {
    data.weeks.forEach(element => {
      setWeekHeaders(prev => [...prev, ...[{ 
        label : element.label,
        colspan : element.dateCnt
      }]]);        
    });

    data.dates.forEach(element => {
      setDateHeaders(prev => [...prev, ...[{
        label : element.date.substring(8,10)
      }]])
    });
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

  const setCols = async (data) => {
    data.dates.forEach(element => {
      setColumns(prev => [...prev, ...[{
        data : element.date
      }]])
    });
  }

  function indentRenderer(instance, td, row, col, prop, value, cellProperties){
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    // row 데이터에서 depth 가져오기 (data[row][1]이 depth임)
    const rowData = instance.getDataAtRow(row);
    const depth = parseInt(rowData[1] || 0, 10);
    td.style.paddingLeft = `${5+ (depth * 20)}px`; // depth 1당 20px 들여쓰기
  }

  function highlightRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = '#48A6A7'; // 여기선 !important 필요 없음
  }
  

  return (
    <HotTable
      data={[
        {
          id: '123',
          depth: 0,
          task: '서버 구축(Linux, CentOs)',
          owner: '이성욱',
          part: '공통',
          planStart: '2025-04-12',
          planEnd: '2025-05-12',
          planProgress: '50%',
          realStart: '2025-04-12',
          realEnd: '2025-05-12',
          realProgress: '50%',
          weight : '5',
          __children: [
            {
              id: '123',
              depth: 1,
              task: '서버 설치 및 기초 설정',
              owner: '이성욱',
              part: '공통',
              planStart: '2025-04-12',
              planEnd: '2025-05-12',
              planProgress: '50%',
              realStart: '2025-04-12',
              realEnd: '2025-05-12',
              realProgress: '50%',
              weight : '2',
              __children : [
                {
                  id: '123',
                  depth: 2,
                  task: '서버 설치 및 기초 설정2',
                  owner: '이성욱',
                  part: '공통',
                  planStart: '2025-04-12',
                  planEnd: '2025-05-12',
                  planProgress: '50%',
                  realStart: '2025-04-12',
                  realEnd: '2025-05-12',
                  realProgress: '50%',
                  weight : '1'
                },
                {
                  id: '123',
                  depth: 2,
                  task: '서버 설치 및 기초 설정2',
                  owner: '이성욱',
                  part: '공통',
                  planStart: '2025-04-12',
                  planEnd: '2025-05-12',
                  planProgress: '50%',
                  realStart: '2025-04-12',
                  realEnd: '2025-05-12',
                  realProgress: '50%',
                  weight : '1'
                }
              ]
            }
          ]
        }
      ]}
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
      className="ht-theme-main"
      colWidths={[80,80,300,80,80,100,100,100,100,100,100,50]}
      cells={(row, col) => {
        const cellProperties = {};
        if (col === 2) {
          // 2번 열(업무명)에만 들여쓰기 적용
          cellProperties.renderer = indentRenderer;
        }

        if (row === 2 && (col>=15 && col<24)) {
          cellProperties.renderer = highlightRenderer;
        }

        if (row === 3 && (col>=17 && col<26)) {
          cellProperties.renderer = highlightRenderer;
        }
        
        return cellProperties;
      }}
    >
    </HotTable>
  );
};

export default ProjectWBS;
import { useEffect, useState, useRef } from "react";
import { HotTable, HotColumn } from '@handsontable/react-wrapper';
import Handsontable from 'handsontable';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';
import { getWbsData, getWbsDateInfo } from "./wbs/wbsAPI";
import '../../theme/pikaday.css';
import { getMemberListAPI } from "./member/memberAPI";
import { getTaskDscendantsAPI, updateTaskAPI } from "./task/taskAPI";
import { useToast } from '@chakra-ui/react'
import { el } from "date-fns/locale";
import TaskCreateForm from './task/TaskCreateForm';
import { useDisclosure } from '@chakra-ui/react';
import { htmlRenderer } from 'handsontable/renderers';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  UnorderedList, ListItem,
  Button, ButtonGroup, Box, Text
} from '@chakra-ui/react'


// register Handsontable's modules
registerAllModules();

const ProjectWBS = ({projectId}) => {

  const hotTableRef = useRef(null);
  const toast = useToast();

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose
  } = useDisclosure();

  const {
    isOpen: isDelAlertOpen,
    onOpen: onDelAlertOpen,
    onClose: onDelAlertClose
  } = useDisclosure();
  const [descendants, setDescendants] = useState([]);
  const cancelRef = useRef()

  //화면 표시 용
  const [saturdayCols, setSaturdayCols] = useState([]);
  const [sundayCols, setSundayCols] = useState([]);
  const [weekHeaders, setWeekHeaders] = useState([]);
  const [dateHeaders, setDateHeaders] = useState([]);
  const [columns, setColumns] = useState([]);
  const [wbsData, setWbsData] = useState([]);
  const [memberList, setMemberList] = useState([]);

  // TaskCreate용
  const [taskInfo, setTaskInfo] = useState({});
  
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

        if(memberRes.data){
          await setMemberList(memberRes.data);
        }

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

    const memberTableData = [];
    memberData.forEach((elm, idx) => {
      memberTableData.push({
        name : elm.user.userNm,
        dept : elm.user.teamNm,
        part : elm.partNm,
        prjMemId : elm.prjMemId
      })
    })

    const fixedColumns = [
      { data: 'taskId', readOnly: true },
      { data: 'depth' },
      { data: 'taskNm' },
      { 
        data: 'charge' ,
        type: 'handsontable',
        handsontable: {
          colHeaders: ['이름', '부서', '파트', 'PrjMemId'],
          autoColumnSize: true,
          data: memberTableData,
          getValue() {
            const selection = this.getSelectedLast();
            const selected = this.getSourceDataAtRow(Math.max(selection[0], 0));
            return `${selected.name}#${selected.prjMemId}`;
          },
          hiddenColumns : {
            columns: [3],
            indicators: false
          },
          renderer(hotInstance, td, row, col, prop, value, cellProperties) {
            // 셀에 보여질 때는 이름만 보이게
            const nameOnly = value?.split?.('#')?.[0] ?? value;
            Handsontable.renderers.TextRenderer.apply(this, [hotInstance, td, row, col, prop, nameOnly, cellProperties]);
          }
        }
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
      { 
        data: 'planProgress', 
        readOnly: true,
        renderer: percentRenderer
      },
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
      { 
        data: 'realProgress', 
        readOnly: true,
        renderer: percentRenderer
      },
      { data: 'weight', type: 'numeric' }
    ]

    const columnsExtras = dateData.dates.map(element => ({
      data : element.date,
      readOnly: true
    }));

    setColumns([...fixedColumns, ...columnsExtras]);
  }

  const editTask = async (changes, source) => {
    const hot = hotTableRef.current.hotInstance;
    for (const [row, prop, oldValue, newValue] of changes ?? []){
      if(oldValue != newValue){
        const visibleRowData = hot.getDataAtRow(row);
        const taskId = visibleRowData[0]; //taskId 0번

        let data = {};
        if(prop == "planStartDt"){
          data = {
            taskId : taskId,
            [prop] : newValue,
            planEndDt : visibleRowData[6]
          }
        }else if(prop == "planEndDt"){
          data = {
            taskId : taskId,
            [prop] : newValue,
            planStartDt : visibleRowData[5]
          }
        }else if(prop == "charge"){
          const [name, prjMemIdStr] = newValue.split('#');
          const prjMemId = parseInt(prjMemIdStr, 10);
          data = {
            taskId : taskId,
            chargeId : prjMemId
          }
        }else{
          data = {
            taskId : taskId,
            [prop] : newValue
          }
        }
        try{
          const response = await updateTaskAPI(projectId, data);
          if(response?.data){
            const updated = response.data;
            handleTaskUpdate('update', updated);
            toast({
                title: "수정 완료",
                description: "TSAKID["+taskId+"] 수정 완료" ,
                status: 'success',
                duration: 1000,     // 3초 후 사라짐
                isClosable: true,   // 닫기 버튼 있음
                position: 'bottom-right',    // top, top-right, bottom-right 등 설정 가능
            })
          }
        }catch(error){
          const colIdx = hot.propToCol(prop);
          hot.setDataAtCell(row, colIdx, oldValue, "rollback"); //화면 롤백
          toast({
            title: "수정 실패",
            description: error.response.data ,
            status: 'error',
            duration: 1000,     // 3초 후 사라짐
            isClosable: true,   // 닫기 버튼 있음
            position: 'bottom-right',    // top, top-right, bottom-right 등 설정 가능
          })
        }
      }
    };
  }

  const handleTaskUpdate = (type, task) => {
    switch (type) {
      case 'create':
        setWbsData(addWbsData(wbsData, task));
        break;
      case 'update':
        setWbsData(modifyWbsData(wbsData, task));
        break;
      case 'delete':

        break;
      default:
        console.warn('Unknown task update type:', type);
    }
  }

  //wbsData state MODIFY 재귀함수
  const modifyWbsData = (wbsData, updatedTask) => {
    return wbsData.map(task => {
      if(task.taskId == updatedTask.taskId){
        return {...task, ...buildWbsData(updatedTask)};
      }
      if(task.__children){
        return {
          ...task,
          __children : modifyWbsData(task.__children, updatedTask)
        }
      }
      return task;
    })
  }
  //wbsData state ADD 재귀함수
  const addWbsData = (wbsData, createdTask) => {
    if(createdTask.parentTask.taskId){
      return wbsData.map(task =>{
        if(task.taskId == createdTask.parentTask.taskId){
          return {
            ...task,
            __children : [
              ...(task.__children || []),
              buildWbsData(createdTask)
            ]
          }
        }
        if(task.__children){
          return {
            ...task,
            __children : addWbsData(task.__children, createdTask)
          }
        }
        return task;
      })
    }else{
      return [
        ...wbsData,
        buildWbsData(createdTask)
      ]
    }
  }

  const buildWbsData = (task) => {
    return {
      taskId : task.taskId,
      depth : task.depth,
      taskNm : task.taskNm,
      charge : task.charge.user.userNm,
      partNm : task.charge.partNm,
      planStartDt : task.planStartDt,
      planEndDt : task.planEndDt,
      planProgress : task.planProgress,
      realStartDt : task?.realStartDt,
      realEndDt : task?.realEndDt,
      realProgress : task?.realProgress,
      weight : task.weight
    }
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

  const percentRenderer = (instance, td, row, col, prop, value, cellProperties) => {
    htmlRenderer(instance, td, row, col, prop, `${value}%`, cellProperties);
  };

  return (
    wbsData.length > 0 && (
    <>
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
          if(source === 'edit' && changes){
            editTask(changes, source);
          }
        }}
        contextMenu={
          {
            items: {
              addTask: {
                name: '✔️ 하위 작업 추가',
                callback: function(key, selection, clickEvent) {
                  const selectedRow = selection[0].start.row;
                  const hot = hotTableRef.current.hotInstance;
                  const selectedRowData = hot.getDataAtRow(selectedRow);
                  const data = {
                    parentTaskId : selectedRowData[0],
                  };
                  setTaskInfo(data);
                  onCreateModalOpen();
                }
              },
              deleteTask: {
                name: '❌ 작업 삭제',
                callback : function(key, selection, clickEvent) {
                  const selectedRow = selection[0].start.row;
                  const hot = hotTableRef.current.hotInstance;
                  const selectedRowData = hot.getDataAtRow(selectedRow);
                  const taskId = selectedRowData[0];
                  (async () => {
                    try {
                      const dscRes = await getTaskDscendantsAPI(projectId, taskId);
              
                      if (dscRes?.data?.length > 1) {
                        setDescendants(dscRes.data);
                        onDelAlertOpen();
                      } else {
                        // 하위작업 없을 경우 바로 삭제 수행
                        // await deleteTask(taskId); 등
                      }
                    } catch (e) {
                      console.error("하위 작업 조회 실패", e);
                    }
                  })();
                }
              }
            }
          }
        }
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
      <TaskCreateForm 
        isOpen={isCreateModalOpen} 
        onOpen={onCreateModalOpen} 
        onClose={onCreateModalClose} 
        taskInfo={taskInfo}
        memberList={memberList}
        projectId={projectId}
        onCreate={handleTaskUpdate}
      />
      <AlertDialog
        isOpen={isDelAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDelAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              작업 삭제
            </AlertDialogHeader>
            <AlertDialogBody>
              삭제 시 하위 작업들도 삭제됩니다.
              삭제 하시겠습니까 ? 
              <UnorderedList>
              {descendants.map((elm, idx)=> {
                return (
                  <>
                  <ListItem key={idx}>{elm.taskNm}</ListItem>
                  </>
                )
              })}
              </UnorderedList>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDelAlertClose}>
                취소
              </Button>
              <Button colorScheme='red' onClick={onDelAlertClose} ml={3}>
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
    )
  );
};

export default ProjectWBS;
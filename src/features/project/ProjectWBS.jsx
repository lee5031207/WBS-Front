import { HotTable, HotColumn } from '@handsontable/react-wrapper';
import Handsontable from 'handsontable';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';

// register Handsontable's modules
registerAllModules();

const ProjectWBS = () => {


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
        ['123', 0, '- 서버 구축(Linux, CentOs)', '이성욱', '공통', '2025-04-12', '2025-05-12', '50%', '2025-04-12', '2025-05-12', '50%', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['123', 1, 'ㄴ 서버 설치 및 기초 설정', '이성욱', '공통', '2025-04-12', '2025-05-12', '50%', '2025-04-12', '2025-05-12', '50%' , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['123', 2, 'ㄴ TEST2', '이성욱', '공통', '2025-04-12', '2025-05-12', '50%', '2025-04-12', '2025-05-12', '50%' , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['123', 2, 'ㄴ TEST3', '이성욱', '공통', '2025-04-12', '2025-05-12', '50%', '2025-04-12', '2025-05-12', '50%' , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
      ]}
      rowHeaders={true}
      colHeaders={false}
      hiddenColumns={{
        columns: [1],
        indicators: false,
      }}
      nestedHeaders={[
        [
          { label: '', rowspan: 2 },
          { label: '', rowspan: 2 },
          { label: '', rowspan: 2 },
          { label: '', rowspan: 2 },
          { label: '', rowspan: 2 },
          { label: '계획', colspan: 3 },
          { label: '실적', colspan: 3 },
          { label: '2025-04(1W)', colspan: 5 },
          { label: '2025-04(2W)', colspan: 7 },
          { label: '2025-05(3W)', colspan: 7 },
          { label: '2025-05(4W)', colspan: 7 },
          { label: '2025-05(5W)', colspan: 5 }
        ],
        [
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
          { label: '22' },
          { label: '23' },
          { label: '24' },
          { label: '25' },
          { label: '26' },
          { label: '27' },
          { label: '28' },
          { label: '29' },
          { label: '30' },
          { label: '01' },
          { label: '02' },
          { label: '03' },
          { label: '04' },
          { label: '05' },
          { label: '06' },
          { label: '07' },
          { label: '08' },
          { label: '09' },
          { label: '10' },
          { label: '11' },
          { label: '12' },
          { label: '13' },
          { label: '14' },
          { label: '15' },
          { label: '16' },
          { label: '17' },
          { label: '18' },
          { label: '19' },
          { label: '20' },
          { label: '21' },
          { label: '22' }
        ]
      ]}
      afterGetColHeader={(col, TH, headerLevel) => {
        const sundayCols = [16, 23, 30];  // 일요일 인덱스
        const saturdayCols = [15, 22, 29]; // 토요일 인덱스
    
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
      colWidths={[80,80,300,80,80,100,100,100,100,100,100]}
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
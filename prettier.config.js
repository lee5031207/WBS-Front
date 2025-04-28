module.exports = {
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: [
        '^react$',           // react 관련은 맨 위
        '<THIRD_PARTY_MODULES>', // 외부 라이브러리
        '^@/.*$',             // 내 프로젝트 alias
        '^[./]',              // 상대 경로(import ~ from './')
    ],
    importOrderSeparation: true, // 그룹별로 한 줄 띄워
    importOrderSortSpecifiers: true, // import {} 안도 알파벳순 정렬
};
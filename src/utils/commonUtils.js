export const getProjectRoles = () => {
    const roles = [
        "PM", "PL", "DEV", "FED", "BED", "DSG", "WPB", "DBA", "INFRA"
    ]
    return roles;
};

export const getProjectRoleKR = (code) => {
    const data = {
        "PM" : "프로젝트 매니저",
        "PL" : "프로젝트 리더",
        "DEV" : "개발자",
        "FED" : "프론트엔드 개발자",
        "BED" : "백엔드 개발자",
        "DSG" : "디자이너",
        "WPB" : "웹 퍼블리셔",
        "DBA" : "DBA",
        "INFRA" : "인프라 담당",
    }
    return data[code];
}
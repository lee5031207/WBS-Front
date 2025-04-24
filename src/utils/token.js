export const getToken = () => {
    const grantType = localStorage.getItem('WBS_GRANT_TYPE');
    const accessToken = localStorage.getItem('WBS_ACCESS_TOKEN');
  
    if (!grantType || !accessToken) return null;
    return `${grantType} ${accessToken}`;
  };
  
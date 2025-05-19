import { jwtDecode } from "jwt-decode"; 

export const getToken = () => {
  const grantType = localStorage.getItem('WBS_GRANT_TYPE');
  const accessToken = localStorage.getItem('WBS_ACCESS_TOKEN');

  if (!grantType || !accessToken) return null;
  return `${grantType} ${accessToken}`;
};

export const getMyId = () => {
  const accessToken = localStorage.getItem('WBS_ACCESS_TOKEN');
  const decodedToken = jwtDecode(accessToken);
  const myLogonId = decodedToken.sub;
  return myLogonId;
}

export const getDecodedToken = () => {
  const accessToken = localStorage.getItem('WBS_ACCESS_TOKEN');
  const decodedToken = jwtDecode(accessToken);
  return decodedToken;
}
  
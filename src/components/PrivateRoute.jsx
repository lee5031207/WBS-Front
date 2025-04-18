import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("WBS_ACCESS_TOKEN");
    //토큰 없으면 로그인페이지로
    if(!token){
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default PrivateRoute;
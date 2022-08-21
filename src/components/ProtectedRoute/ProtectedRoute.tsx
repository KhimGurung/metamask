import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useVerifyToken from "../../hooks/useVerifyToken";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<undefined|boolean>();
    const { checkToken } =  useVerifyToken();

    useEffect(() =>{
        checkToken().then(value => {
            setIsAuthenticated( _ => value)
        })
    },[])

    if(isAuthenticated === undefined ) return null
    else return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
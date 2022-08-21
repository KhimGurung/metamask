import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/auth.slice";
import { AppDispatch } from "../store";

interface JwtPayload {
    name: string;
    exp: number;
}

const useVerifyToken = () => {
    const dispatch = useDispatch<AppDispatch>();

    const checkToken  = async () => {
        const token = localStorage.getItem("accessToken");
        if(token){
            const decodedToken = jwt_decode<JwtPayload>(token);
            const currentDate = new Date();
            if(decodedToken.exp * 1000 < currentDate.getTime()){
                dispatch(logoutUser())
                return false
            }
            return true
        }
        return false
    }

    return { checkToken }
}

export default useVerifyToken

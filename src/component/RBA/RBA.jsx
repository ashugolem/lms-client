import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Decode from "../JWT/Decode";

const RoleBasedAuthentication = () => {
    const role = useSelector((state) => state.setLog.role);
    const navigate = useNavigate();

    useEffect(() => {
        if (Decode().user.status === 'Pending') {
            navigate('/pending');
        }
        else if (Decode().user.status === 'Declined') {
            navigate('/blocked');
        }
        else {
            if (role === 'Admin') {
            } else if (role === 'Teacher') {
                navigate('/books');
            } else {
                navigate('/books');
            }
        }
    }, [role, navigate]);

    return null; 
};

export default RoleBasedAuthentication;

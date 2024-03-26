import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";
import { roles } from "../../App";
import { getToken } from "../../utilities/helper-service";
import { getAccessLevel } from "../../utilities/helper-service";

interface Props {
    admin?: JSX.Element;
    hospital?: JSX.Element;
    user?: JSX.Element;
}

const ProtectedRoute = ({ admin, hospital, user }: Props) => {
    // const { isLoggedIn, accessLevel } = useContext(LoginContext);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(
        getToken() ? true : false
    );
    const accessLevel = getAccessLevel();

    // useEffect(() => {
    //     getToken().then((token) => {
    //         setLoggedIn(!token ? false : true);
    //     });
    // }, []);
    if (!isLoggedIn) return <Navigate to="/auth/login" replace />;

    switch (accessLevel) {
        case roles.admin:
            if (admin) return admin;
        case roles.hospital:
            if (hospital) return hospital;
        default:
            return user || null;
    }
};

export default ProtectedRoute;

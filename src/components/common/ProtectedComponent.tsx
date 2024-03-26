import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";
import { roles } from "../../App";
import { getAccessLevel, getToken } from "../../utilities/helper-service";

interface Props {
    admin?: JSX.Element;
    hospital?: JSX.Element;
    user?: JSX.Element;
    defaultComponent?: JSX.Element;
}

const ProtectedComponent = ({
    admin,
    hospital,
    user,
    defaultComponent,
}: Props) => {
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

    if (!isLoggedIn) return defaultComponent || null;

    switch (accessLevel) {
        case roles.admin:
            if (admin) return admin;

        case roles.hospital:
            if (hospital) return hospital;

        default:
            return user || null;
    }
};

export default ProtectedComponent;

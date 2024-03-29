import { useEffect, useState } from "react";
import { roles } from "../../App";
import { getAccessLevel } from "../../utilities/helper-service";
import { getCurrentUser } from "aws-amplify/auth";

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
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const accessLevel = getAccessLevel();

    useEffect(() => {
        getCurrentUser()
            .then(() => setLoggedIn(true))
            .catch(() => setLoggedIn(false));
    }, []);

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

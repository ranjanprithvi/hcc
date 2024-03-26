import { roles } from "../App";
import { getAccessLevel, getToken } from "./helper-service";

interface Props<T> {
    admin?: T;
    hospital?: T;
    user?: T;
    fallback?: T;
}

export function getValueByRole<T extends string | any[]>({
    admin,
    hospital,
    user,
    fallback,
}: Props<T>) {
    // const isLoggedIn = getToken() !== null;
    const accessLevel = getAccessLevel();

    // if (!isLoggedIn) return fallback || (undefined as unknown as T);

    switch (accessLevel) {
        case roles.admin:
            if (admin) return admin;

        case roles.hospital:
            if (hospital) return hospital;

        default:
            return user || (undefined as unknown as T);
    }
}

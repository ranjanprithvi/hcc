import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { jwtDecode } from "jwt-decode";
import { roles } from "../App";

type User = {
    _id: string;
    email: string;
    accessLevel: string;
    profiles?: string[];
};

export const getToken = () => {
    // const { tokens } = await fetchAuthSession();
    // return tokens?.accessToken.toString();
    return localStorage.getItem("token");
};

// export const setToken = async () => {
//     const { tokens } = await fetchAuthSession();
//     localStorage.setItem("token", tokens?.accessToken.toString() || "");
// };

// export const removeToken = () => {
//     localStorage.removeItem("token");
// };

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user") || "{}") as User;
};

// export const setUser = async () => {
//     localStorage.setItem(
//         "user",
//         JSON.stringify(jwtDecode((await getToken()) || ""))
//     );
// };

export const removeUser = () => {
    localStorage.removeItem("user");
};

export const setAccessLevel = async () => {
    const { tokens } = await fetchAuthSession();

    const groups = (tokens?.accessToken?.payload["cognito:groups"] ||
        []) as string[];
    const level = groups.includes("Admin")
        ? roles.admin
        : groups.includes("Hospital")
        ? roles.hospital
        : roles.user;

    localStorage.setItem("accessLevel", level.toString());

    // return Number.parseInt(
    //     JSON.parse(localStorage.getItem("user") || "{}").accessLevel
    // );
};

export const getAccessLevel = () => {
    return Number.parseInt(
        JSON.parse(localStorage.getItem("accessLevel") || "0")
    );
};

export const getCurrentProfileId = () => {
    return localStorage.getItem("currentProfileId");
};

export const setCurrentProfileId = (id: string) => {
    localStorage.setItem("currentProfileId", id);
};

export const removeCurrentProfileId = () => {
    localStorage.removeItem("currentProfileId");
};

export const getCurrentDoctorId = () => {
    return localStorage.getItem("currentDoctorId");
};

export const setCurrentDoctorId = (id: string) => {
    localStorage.setItem("currentDoctorId", id);
};

export const removeCurrentDoctorId = () => {
    localStorage.removeItem("currentDoctorId");
};

// export const getGalleryPath = () => {
//     return localStorage.getItem("galleryPath");
// };

// export const setGalleryPath = (path: string) => {
//     localStorage.setItem("galleryPath", path);
// };

export const handleLogout = () => {
    // removeToken();
    // removeUser();
    removeCurrentProfileId();
    removeCurrentDoctorId();
    signOut()
        .then(() => {
            window.location.assign("/");
        })
        .catch((e) => {
            console.error(e);
        });
};

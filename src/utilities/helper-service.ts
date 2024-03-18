import { jwtDecode } from "jwt-decode";

type User = {
    _id: string;
    email: string;
    accessLevel: string;
    profiles?: string[];
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user") || "{}") as User;
};

export const setUser = () => {
    localStorage.setItem("user", JSON.stringify(jwtDecode(getToken() || "")));
};

export const removeUser = () => {
    localStorage.removeItem("user");
};

export const getAccessLevel = () => {
    return Number.parseInt(
        JSON.parse(localStorage.getItem("user") || "{}").accessLevel
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
    removeToken();
    removeUser();
    removeCurrentProfileId();
    removeCurrentDoctorId();
    window.location.assign("/");
};
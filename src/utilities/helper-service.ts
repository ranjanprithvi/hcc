import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { jwtDecode } from "jwt-decode";
import { roles } from "../App";
import { useContext } from "react";
import { AccountContext } from "../contexts/profileContext";

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

export const getProfileId = () => {
    return localStorage.getItem("profileId") || "";
};

export const setProfileId = (id: string) => {
    localStorage.setItem("profileId", id);
};

// export const handleLogout = () => {
//     // removeToken();
//     // removeUser();
//     const { setProfileId, setIdentityId } = useContext(ProfileContext);
//     setProfileId("");
//     setIdentityId("");

//     signOut()
//         .then(() => {
//             window.location.assign("/");
//         })
//         .catch((e) => {
//             console.error(e);
//         });
// };

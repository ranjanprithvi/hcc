import React, { useContext } from "react";
import { LoginContext } from "../../contexts/loginContext";

interface Props {
    items: { accessLevel: number; component: React.ReactNode }[];
}

const RenderByRole = ({ items }: Props) => {
    const { accessLevel } = useContext(LoginContext);
    return items.find((i) => i.accessLevel === accessLevel)?.component || null;
};

export default RenderByRole;

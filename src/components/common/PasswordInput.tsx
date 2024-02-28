import {
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface Props {
    name: string;
    register: UseFormRegister<any>;
}

const PasswordInput = ({ name, register }: Props) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow((s) => !s);

    return (
        <InputGroup>
            <Input
                background={"#f6f6f6"}
                border={"none"}
                paddingX={"12px"}
                size={"sm"}
                fontSize={"14px"}
                color={"gray.700"}
                step="any"
                id={name}
                type={show ? "text" : "password"}
                {...register(name)}
            />
            <InputRightElement height={"35px"}>
                <IconButton
                    marginTop={"0"}
                    icon={show ? <FaEyeSlash /> : <FaEye />}
                    aria-label={""}
                    background={"none"}
                    _hover={{ background: "none" }}
                    size={"xs"}
                    onClick={handleClick}
                ></IconButton>
            </InputRightElement>
        </InputGroup>
    );
};

export default PasswordInput;

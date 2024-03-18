import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field } from "../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useContext } from "react";
import { LoginContext } from "../../contexts/loginContext";
import { httpService } from "../../services/http-service";
import {
    getAccessLevel,
    getUser,
    setCurrentProfileId,
    setToken,
    setUser,
} from "../../utilities/helper-service";
import { roles } from "../../App";
// import useToast from "../hooks/generic/useToast";

const schema = z.object({
    email: z
        .string({ invalid_type_error: "Email is required" })
        .email({ message: "Invalid email" }),
    password: z.string({ invalid_type_error: "User is required" }),
});

type LoginData = z.infer<typeof schema>;

interface LoginResponse {
    token: string;
}

const LoginForm = () => {
    // const navigate = useNavigate();
    // const { showError } = useToast();
    const toast = useToast();
    const { setLoggedIn, setAccessLevel } = useContext(LoginContext);

    const resolver = zodResolver(schema);

    const fields: Field<LoginData>[] = [
        {
            type: "textInput",
            label: "Email",
            name: "email",
        },
        {
            type: "password",
            label: "Password",
            name: "password",
        },
    ];

    const onLogin = (data: LoginData) => {
        const authService = httpService("/auth/login");
        authService
            .post<LoginData, LoginResponse>(data)
            .then((response) => {
                console.log(response.data);

                setToken(response.data.token);
                setUser();
                if (getAccessLevel() === roles.user) {
                    const profiles = getUser().profiles;
                    profiles && profiles[0] && setCurrentProfileId(profiles[0]);
                }
                // if (getAccessLevel() === roles.hospital) {
                //     setCurrentProfileId(getUser().hospital.doctors[0] || "");
                // }
                setLoggedIn(true);
                window.location.replace("/portal/appointments");
                // navigate("/books");
            })
            .catch((err) => {
                // toast;
                toast({
                    title: "Error",
                    description:
                        err.response?.data || "Sorry. Something went wrong",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                });
            });
    };

    return (
        <GridItem colSpan={2} marginX={5} marginY="auto">
            <Box
                marginX={"auto"}
                marginTop="5%"
                padding={10}
                maxWidth={"600px"}
                background={"white"}
                borderRadius={"5px"}
                boxShadow={"0px 0px 10px #b3b3b3"}
            >
                <Form<LoginData>
                    resolver={resolver}
                    fields={fields}
                    heading={"Login"}
                    onSubmit={onLogin}
                />
            </Box>
        </GridItem>
    );
};

export default LoginForm;

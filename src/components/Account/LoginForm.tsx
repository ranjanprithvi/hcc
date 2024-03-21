import {
    Box,
    Flex,
    GridItem,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useToast,
    Text,
    Button,
    Image,
} from "@chakra-ui/react";
import Form, { Field } from "../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useContext, useState } from "react";
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
import colourPalette from "../../utilities/colour-palette";
import logo from "/Logo.png";

// import useToast from "../hooks/generic/useToast";

const loginSchema = z.object({
    email: z
        .string({ invalid_type_error: "Email is required" })
        .min(4, { message: "Email must contain at least 4 characters" })
        .email({ message: "Invalid email" }),
    password: z
        .string({ invalid_type_error: "Password is required" })
        .min(5, { message: "Password must contain at least 5 characters" }),
});
type LoginData = z.infer<typeof loginSchema>;

const registerSchema = z
    .object({
        email: z
            .string({ invalid_type_error: "Email is required" })
            .email({ message: "Invalid email" }),
        password: z
            .string({ invalid_type_error: "Password is required" })
            .min(5, { message: "Password must contain at least 5 characters" }),
        confirmPassword: z.string({
            invalid_type_error: "Please confirm your password",
        }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                path: ["confirmPassword"],
                code: "custom",
                message: "The passwords did not match",
            });
        }
    });
type RegisterData = z.infer<typeof registerSchema>;
type RegisterDTO = Omit<RegisterData, "confirmPassword">;

interface LoginResponse {
    token: string;
}

const LoginForm = () => {
    // const navigate = useNavigate();
    // const { showError } = useToast();
    const toast = useToast();
    const { setLoggedIn, setAccessLevel } = useContext(LoginContext);

    const [tabIndex, setTabIndex] = useState(0);

    const loginResolver = zodResolver(loginSchema);
    const loginFields: Field<LoginData>[] = [
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

                setToken(response.headers["x-auth-token"]);
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
                        err.toString() || "Sorry. Something went wrong",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                });
            });
    };

    const registerResolver = zodResolver(registerSchema);
    const registerFields: Field<RegisterData>[] = [
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
        {
            type: "password",
            label: "Confirm Password",
            name: "confirmPassword",
        },
    ];
    const onRegister = (data: RegisterData) => {
        const authService = httpService("/accounts/registerUser");
        const dataDTO = _.omit(data, "confirmPassword") as RegisterDTO;
        authService
            .post<RegisterDTO, LoginResponse>(dataDTO)
            .then((response) => {
                console.log(response.data);

                setToken(response.headers["x-auth-token"]);
                setUser();
                if (getAccessLevel() === roles.user) {
                    const profiles = getUser().profiles;
                    profiles && profiles[0] && setCurrentProfileId(profiles[0]);
                }
                // if (getAccessLevel() === roles.hospital) {
                //     setCurrentProfileId(getUser().hospital.doctors[0] || "");
                // }
                setLoggedIn(true);
                window.location.replace("/portal/profiles");
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
        <GridItem colSpan={2} width={"100vw"} height={"100vh"} padding={"10px"}>
            <HStack
                position={"absolute"}
                top={0}
                left={0}
                marginLeft={"50px"}
                marginTop={"50px"}
            >
                <Image src={logo} height={{ base: "8", md: "10" }} />
                <Text fontWeight={"bold"} fontSize={"sm"}>
                    Heart Care Clinic
                </Text>
            </HStack>

            <Flex
                alignItems={"center"}
                justifyContent={"center"}
                height={"100%"}
                width={"100%"}
                backgroundImage={"LoginBackground.png"}
                backgroundPosition={"bottom left"}
                backgroundSize={"cover"}
            >
                <Box
                    maxWidth={"500px"}
                    height={"70%"}
                    width={"100%"}
                    background={"white"}
                    borderRadius={"5px"}
                    boxShadow={"0px 0px 10px #b3b3b3"}
                >
                    <Tabs
                        index={tabIndex}
                        onChange={(index) => setTabIndex(index)}
                        isFitted
                    >
                        <TabList mb={"3em"}>
                            <Tab
                                fontWeight={"bold"}
                                _selected={{
                                    color: colourPalette.primary,
                                    borderColor: colourPalette.primary,
                                }}
                            >
                                Sign In
                            </Tab>
                            <Tab
                                fontWeight={"bold"}
                                _selected={{
                                    color: colourPalette.secondary,
                                    borderColor: colourPalette.secondary,
                                }}
                            >
                                Sign Up
                            </Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <>
                                    <Form<LoginData>
                                        resolver={loginResolver}
                                        fields={loginFields}
                                        onSubmit={onLogin}
                                        heading="Sign In"
                                        submitButtonLabel="Sign In"
                                    />
                                    <HStack
                                        justifyContent={"center"}
                                        marginTop={"20px"}
                                    >
                                        <Text
                                            color={"GrayText"}
                                            fontSize={"sm"}
                                        >
                                            Don't have an account?
                                        </Text>
                                        <Button
                                            variant="link"
                                            colorScheme="pink"
                                            size={"sm"}
                                            onClick={() => setTabIndex(1)}
                                        >
                                            Sign Up
                                        </Button>
                                    </HStack>
                                </>
                            </TabPanel>
                            <TabPanel>
                                <Form<RegisterData>
                                    resolver={registerResolver}
                                    fields={registerFields}
                                    onSubmit={onRegister}
                                    heading="Sign Up"
                                    submitButtonColourScheme="orange"
                                    submitButtonLabel="Sign Up"
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </GridItem>
    );
};

export default LoginForm;

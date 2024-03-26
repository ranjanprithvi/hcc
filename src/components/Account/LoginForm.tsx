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
import _, { replace, set } from "lodash";
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
import {
    fetchAuthSession,
    getCurrentUser,
    signIn,
    signOut,
    signUp,
} from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

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
type RegisterDTO = { email: string; sub: string };

interface LoginResponse {
    token: string;
}

const LoginForm = () => {
    const navigate = useNavigate();
    // const { showError } = useToast();
    const toast = useToast();
    // const { setLoggedIn, setAccessLevel } = useContext(LoginContext);

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

    const onLogin = async (data: LoginData) => {
        try {
            const result = await signIn({
                username: data.email,
                password: data.password,
            });

            if (result.nextStep.signInStep == "CONFIRM_SIGN_UP") {
                toast({
                    title: "Error",
                    description:
                        "Please confirm your email address before signing in",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
            console.log(result);
            if (result.isSignedIn) {
                await setToken();
                window.location.replace("/portal/appointments");
            }
        } catch (err) {
            console.log(err);
            // signOut({ global: true });
        }
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

    const onRegister = async (data: RegisterData) => {
        try {
            const details = await signUp({
                username: data.email,
                password: data.password,
                options: {
                    autoSignIn: { enabled: true },
                    userAttributes: { email: data.email },
                },
            });

            const accountService = httpService("/accounts/registerUser");
            const dataDTO = { email: data.email, sub: details.userId || "" };
            await accountService.post<RegisterDTO, LoginResponse>(dataDTO);

            // details.userId
            if (details.nextStep.signUpStep == "CONFIRM_SIGN_UP")
                navigate(`/auth/enterCode/${details.userId}`, {
                    replace: true,
                });
        } catch (err) {
            console.log(err);
            // signOut({ global: true });
        }
    };

    return (
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
                        <HStack justifyContent={"center"} marginTop={"20px"}>
                            <Text color={"GrayText"} fontSize={"sm"}>
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
    );
};

export default LoginForm;

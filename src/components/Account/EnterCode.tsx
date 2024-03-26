import React from "react";
import Form from "../common/Form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { autoSignIn, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { setToken } from "../../utilities/helper-service";
import { Flex } from "@aws-amplify/ui-react";

const codeSchema = z.object({
    code: z.number({ invalid_type_error: "Code is required" }),
});
type CodeData = z.infer<typeof codeSchema>;

const EnterCode = () => {
    const { username } = useParams();

    return (
        <Flex margin={"5em"} direction={"column"}>
            <Heading
                fontWeight={"bold"}
                fontSize={"x-large"}
                mb={"1rem"}
                textAlign={"center"}
            >
                Enter the code sent to your email address:
            </Heading>
            <Form<CodeData>
                submitButtonColourScheme="orange"
                fields={[
                    {
                        name: "code",
                        label: "",
                        type: "textInput",
                        inputType: "number",
                    },
                ]}
                onSubmit={({ code }) => {
                    confirmSignUp({
                        username: username || "",
                        confirmationCode: code.toString(),
                    })
                        .then(({ nextStep }) => {
                            if (
                                nextStep.signUpStep == "COMPLETE_AUTO_SIGN_IN"
                            ) {
                                autoSignIn().then(() => {
                                    setToken().then(() => {
                                        setTimeout(() => {
                                            window.location.replace(
                                                "/portal/appointments"
                                            );
                                        }, 2000);
                                    });
                                });
                            }

                            // setStatus(
                            //     "Email Verified Successfully. Please log in to continue.."
                            // );
                            else if (nextStep.signUpStep == "DONE") {
                                setToken()
                                    .then(() => {
                                        window.location.replace("/auth/login");
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            // setStatus(err.message);
                        });
                }}
            />
            <Button
                onClick={() => resendSignUpCode({ username: username || "" })}
                variant={"link"}
                justifySelf={"flex-end"}
                mt={"3rem"}
            >
                Resend Verification Code
            </Button>
        </Flex>
    );
};

export default EnterCode;

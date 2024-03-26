import {
    autoSignIn,
    confirmSignUp,
    signIn,
    resendSignUpCode,
} from "aws-amplify/auth";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setToken } from "../../utilities/helper-service";
import { Box } from "@chakra-ui/react";

const VerifyEmail = () => {
    const queryParams = new URLSearchParams(window.location.search);

    const [status, setStatus] = React.useState<string>("Verifying Email..");

    // Get the value of 'data' parameter
    const data = queryParams.get("data");
    const confirmationCode = queryParams.get("code");
    // const { data, confirmationCode } = useParams();
    console.log(data);
    useEffect(() => {
        console.log(data);
        const dataObj = JSON.parse(atob(data || "")) as {
            userName: string;
        };
        const userName = dataObj.userName;

        // resendSignUpCode({ username: userName });

        confirmSignUp({
            username: userName,
            confirmationCode: confirmationCode || "123",
        })
            .then(({ isSignUpComplete, nextStep }) => {
                if (nextStep.signUpStep == "DONE") {
                    setStatus(
                        "Email Verified Successfully. Please log in to continue.."
                    );
                    // autoSignIn()
                    //     .then(() => {
                    //         setToken().then(() => {
                    setTimeout(() => {
                        window.location.replace("/auth/login");
                    }, 2000);
                    //     });
                    // })
                    // .catch((err) => {
                    //     console.log(err);
                    // });
                }
            })
            .catch((err) => {
                setStatus(err.message);
            });
    }, []);
    return (
        <Box margin={"3em"} fontWeight={"bold"}>
            {status}
        </Box>
    );
};

export default VerifyEmail;

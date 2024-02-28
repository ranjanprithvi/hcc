import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field } from "../../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { httpService } from "../../../services/http-service";
import { Profile } from "../../../models/profile";
import Loader from "../../common/Loader";
import useAccounts from "../../../hooks/useAccounts";

const schemaObject = {
    accountId: z.string(),
};
const schema = z.object(schemaObject);

type LinkAccountData = z.infer<typeof schema>;

const LinkAccountForm = () => {
    const { accounts, isLoading, error } = useAccounts();
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
    if (!id) return null;

    const resolver = zodResolver(schema);

    const resetObject = {
        accountId: "",
    };

    const onSubmit = (data: LinkAccountData) => {
        let profileService = httpService("/profiles/link");

        profileService
            .patch<LinkAccountData, Profile>(data, id)
            .then((res) => {
                navigate(`/portal/profiles`, {
                    replace: true,
                });
            })
            .catch((err) => {
                toast({
                    title: "Error",
                    description: err.response?.data?.toString(),
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    const fields: Field<LinkAccountData>[] = [
        {
            type: "select",
            placeholder: "--Select Account--",
            options: accounts.map((account) => ({
                label: account.email,
                value: account._id,
            })),
            label: "Account",
            name: "accountId",
        },
    ];

    return (
        <GridItem colSpan={2} marginX={5}>
            <Box
                marginX={"auto"}
                padding={10}
                maxWidth={"600px"}
                background={"white"}
                borderRadius={"5px"}
                boxShadow={"0px 0px 10px #b3b3b3"}
            >
                {isLoading ? (
                    <Loader />
                ) : (
                    <Form<LinkAccountData>
                        resolver={resolver}
                        fields={fields}
                        heading={"Link Account"}
                        onSubmit={onSubmit}
                        resetObject={resetObject}
                    />
                )}
            </Box>
        </GridItem>
    );
};

export default LinkAccountForm;

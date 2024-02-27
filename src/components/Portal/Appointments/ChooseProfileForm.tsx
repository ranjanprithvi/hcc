import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field } from "../../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { httpService } from "../../../services/http-service";
import moment from "moment";
import useProfile from "../../../hooks/useProfile";
import { Profile } from "../../../models/profile";
import { Appointment } from "../../../models/appointment";
import useProfiles from "../../../hooks/useProfiles";
import Loader from "../../common/Loader";

const phoneRegex = new RegExp(/^[+]?[0-9]{9,13}$/);

const schemaObject = {
    profileId: z.string(),
};
const schema = z.object(schemaObject);

type ChooseProfileData = z.infer<typeof schema>;

const ChooseProfileForm = () => {
    const { profiles, isLoading, error } = useProfiles();
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
    if (!id) return null;

    const resolver = zodResolver(schema);

    const resetObject = {
        profileId: "",
    };

    const onSubmit = (data: ChooseProfileData) => {
        let appointmentService = httpService("/appointments/book");

        appointmentService
            .patch<ChooseProfileData, Appointment>(data, id)
            .then((res) => {
                navigate(`/portal/appointments`, {
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

    const fields: Field<ChooseProfileData>[] = [
        {
            type: "select",
            placeholder: "--Select Profile--",
            options: profiles.map((profile) => ({
                label:
                    profile.name +
                    " " +
                    (profile.phone ? `(${profile.phone})` : ""),
                value: profile._id,
            })),
            label: "Profile",
            name: "profileId",
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
                    <Form<ChooseProfileData>
                        resolver={resolver}
                        fields={fields}
                        heading={"Choose Profile"}
                        onSubmit={onSubmit}
                        resetObject={resetObject}
                    />
                )}
            </Box>
        </GridItem>
    );
};

export default ChooseProfileForm;

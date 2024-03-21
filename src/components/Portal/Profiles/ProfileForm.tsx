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
import { setCurrentProfileId } from "../../../utilities/helper-service";

const phoneRegex = new RegExp(/^[+]?[0-9]{9,13}$/);

// const countryCodes = [];
const schemaObject = {
    name: z.string({ invalid_type_error: "Name is required" }),
    gender: z.string(),
    dob: z.custom(
        (value) =>
            value !== "Invalid date" &&
            value &&
            new Date(value as string) < new Date(),
        {
            message: "Valid date of Birth is required",
        }
    ),
    phone: z
        .union([
            z.literal(""),
            z
                .string()
                .regex(
                    phoneRegex,
                    "Phone number must be numeric and between 10 and 14 digits long."
                ),
        ])
        .transform((value) => (value === "" ? undefined : value)),
};
const schema = z.object(schemaObject);

type ProfileData = z.infer<typeof schema>;
// _.omit(schema.shape, ["countryCode", "phoneNumber"]);
// const schemaDTO = z.object(
//     _.omit(schemaObject, ["countryCode", "phoneNumber"])
// );

// type ProfileDTO = z.infer<typeof schemaDTO> & {
//     countryCode: string | undefined;
//     phoneNumber: string | undefined;
// };

const ProfileForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
    if (!id) return null;

    const resolver = zodResolver(schema);

    const { profile, error } = useProfile(id);

    const resetObject = {
        name: profile.name,
        gender: profile.gender,
        phone: profile.phone,
        dob: moment(profile.dob).format("YYYY-MM-DD"),
    };

    if (error) navigate("/not-found");

    const onSubmit = (data: ProfileData) => {
        let profileService = httpService("/profiles");

        data = _.omitBy(data, (value) => !value) as ProfileData;

        let promise;
        if (id == "new") {
            promise = profileService.post<ProfileData, Profile>(data);
        } else {
            promise = profileService.patch<ProfileData, Profile>(data, id);
        }

        promise
            .then((res) => {
                setCurrentProfileId(res.data._id);
                window.location.href = `/portal/profiles`;
            })
            .catch((err) => {
                toast({
                    title: "Error",
                    description: err.response?.data?.toString(),
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                });
            });
    };

    const fields: Field<ProfileData>[] = [
        {
            type: "textInput",
            label: "Name",
            name: "name",
        },
        {
            type: "select",
            label: "Gender",
            name: "gender",
            options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
            ],
            placeholder: "---Select Gender---",
        },
        {
            type: "textInput",
            label: "Date of Birth",
            name: "dob",
            inputType: "date",
        },
        {
            type: "textInput",
            label: "Phone",
            name: "phone",
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
                <Form<ProfileData>
                    resolver={resolver}
                    fields={fields}
                    heading={id == "new" ? "New Profile" : "Edit Profile"}
                    onSubmit={onSubmit}
                    resetObject={resetObject}
                    resetDependencies={[profile]}
                />
            </Box>
        </GridItem>
    );
};

export default ProfileForm;

import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field } from "../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { httpService } from "../../services/http-service";
import { User } from "../../models/user";
import useUser from "../../hooks/useProfile";
import moment from "moment";

// const countryCodes = [];
const schemaObject = {
    name: z
        .string({ invalid_type_error: "Name is required" })
        .nonempty({ message: "Name is required" }),
    email: z
        .string({ invalid_type_error: "Email is required" })
        .email({ message: "Invalid email" })
        .nonempty({ message: "Email is required" }),
    countryCode: z.union([z.string(), z.nan()]).optional(),
    phoneNumber: z
        .union([
            z
                .number()
                .min(0, {
                    message: "Phone Number must be positive",
                })
                .max(99999999999, {
                    message:
                        "Phone Number should be less than or equal to 11 digits",
                })
                .multipleOf(1, {
                    message: "Phone Number should be a whole number",
                }),
            z.nan(),
        ])
        .optional(),
    membershipExpiry: z.custom((value) => value !== "Invalid date", {
        message: "Membership expiry is required",
    }),
    dateOfBirth: z.custom(
        (value) =>
            value !== "Invalid date" &&
            value &&
            new Date(value as string) < new Date(),
        {
            message: "Valid date of Birth is required",
        }
    ),
    maxBorrow: z.union([z.number(), z.nan()]).optional(),
};
const schema = z.object(schemaObject);

type UserData = z.infer<typeof schema>;
_.omit(schema.shape, ["countryCode", "phoneNumber"]);
const schemaDTO = z.object(
    _.omit(schemaObject, ["countryCode", "phoneNumber"])
);

type UserDTO = z.infer<typeof schemaDTO> & {
    countryCode: string | undefined;
    phoneNumber: string | undefined;
};

const UserForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
    if (!id) return null;

    const resolver = zodResolver(schema);

    const { user, error } = useUser(id);

    const resetObject = {
        name: user.name,
        email: user.email,
        countryCode: user.countryCode,
        phoneNumber: parseInt(user.phoneNumber),
        dateOfBirth: moment(new Date(user.dateOfBirth || "")).format(
            "YYYY-MM-DD"
        ),
        membershipExpiry: moment(new Date(user.membershipExpiry || "")).format(
            "YYYY-MM-DD"
        ),
        maxBorrow: user.maxBorrow,
    };

    if (error) navigate("/not-found");

    const onSubmit = (data: UserData) => {
        let dataDTO = {
            ...data,
            countryCode: data.countryCode?.toString(),
            phoneNumber: data.phoneNumber?.toString(),
        } as UserDTO;
        // console.log(data);

        let userService = httpService("/users");
        let promise;
        if (id == "new") {
            dataDTO = _.omitBy(dataDTO, (value) => {
                return !value || value === "Invalid date";
            }) as UserDTO;

            promise = userService.post<UserDTO, User>(dataDTO);
        } else {
            data = _.omitBy(
                data,
                (value) => value === "Invalid date"
            ) as UserData;
            promise = userService.patch<UserDTO, User>(dataDTO, id);
        }

        promise
            .then((res) => {
                navigate(`/userDetails/${res.data._id}`, {
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

    const fields: Field<UserData>[] = [
        {
            type: "textInput",
            label: "Name",
            name: "name",
        },
        {
            type: "textInput",
            label: "Email",
            name: "email",
        },
        {
            type: "select",
            label: "Country Code",
            name: "countryCode",
            // options: countryCodes.map((countryCode) => ({
            //     label: `${countryCode.country} (${countryCode.code})`,
            //     value: countryCode.code,
            // })),
            placeholder: "---Select Country Code---",
        },
        {
            type: "textInput",
            label: "Phone",
            name: "phoneNumber",
            inputType: "number",
        },
        {
            type: "textInput",
            label: "Date of Birth",
            name: "dateOfBirth",
            inputType: "date",
        },
        {
            type: "textInput",
            label: "Membership Expiry",
            name: "membershipExpiry",
            inputType: "date",
        },
        {
            type: "select",
            label: "Book Limit",
            name: "maxBorrow",
            options: [
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "3", value: 3 },
                { label: "4", value: 4 },
                { label: "5", value: 5 },
            ],
            inputType: "number",
        },
    ];

    return (
        <GridItem colSpan={2} marginX={5}>
            <Box
                marginX={"auto"}
                borderColor={"blue.800"}
                borderWidth={"medium"}
                borderRadius={"xl"}
                padding={10}
                maxWidth={"600px"}
            >
                <Form<UserData>
                    resolver={resolver}
                    fields={fields}
                    heading={id == "new" ? "New User" : "Edit User"}
                    onSubmit={onSubmit}
                    resetObject={resetObject}
                    resetDependencies={[user]}
                />
            </Box>
        </GridItem>
    );
};

export default UserForm;

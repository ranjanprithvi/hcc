import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field, Option } from "../../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { httpService } from "../../../services/http-service";
import { Appointment } from "../../../models/appointment";
import moment from "moment";
import { doctorId } from "../../../App";

const schema = z.object({
    date: z.custom((value) => value !== "Invalid date", {
        message: "Date is required",
    }),
    startTime: z.custom((value) => value !== "", {
        message: "Start Time is required",
    }),
    endTime: z.custom((value) => value !== "", {
        message: "End Time is required",
    }),
    durationInMinutes: z.number().int().positive(),
    doctorId: z.string(),
});

type AppointmentData = z.infer<typeof schema>;

const CreateSlotsForm = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const resolver = zodResolver(schema);

    const resetObject = {
        date: new Date().toISOString().split("T")[0],
        startTime: "",
        endTime: "",
        durationInMinutes: 20,
        doctorId: doctorId,
    };

    const resetDependencies = [] as any[];

    const onSubmit = (data: AppointmentData) => {
        console.log(data);
        let createSlotsService = httpService("/appointments/createSlots");
        createSlotsService
            .post<AppointmentData, Appointment[]>(data)
            .then((res) => {
                navigate("/portal/hospital/appointments", {
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

    const fields: Field<AppointmentData>[] = [
        {
            type: "textInput",
            inputType: "date",
            label: "Date",
            name: "date",
        },
        {
            type: "textInput",
            inputType: "time",
            label: "Start Time",
            name: "startTime",
        },
        {
            type: "textInput",
            inputType: "time",
            label: "End Time",
            name: "endTime",
        },
        {
            type: "textInput",
            inputType: "number",
            label: "Duration (in minutes)",
            name: "durationInMinutes",
        },
    ];

    return (
        <GridItem colSpan={2} marginX={5} color={"gray.700"}>
            <Box
                marginX={"auto"}
                borderColor={"gray.400"}
                borderWidth={"1px"}
                borderRadius={"xl"}
                padding={10}
                maxWidth={"600px"}
            >
                <Form<AppointmentData>
                    resolver={resolver}
                    fields={fields}
                    heading={"Create Slots"}
                    onSubmit={onSubmit}
                    resetObject={resetObject}
                    resetDependencies={resetDependencies}
                    submitButtonLabel={"Create"}
                />
            </Box>
        </GridItem>
    );
};

export default CreateSlotsForm;

import { Appointment } from "../../../models/appointment";
import useMyAppointments from "../../../hooks/useMyAppointments";
import AppointmentsPanel from "./AppointmentsPanel";
import { getCurrentProfileId } from "../../../utilities/helper-service";
import { VStack, Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const mockAppointments: Appointment[] = [
    {
        _id: "1",
        timeSlot: new Date("2024-04-01T10:00:00.000Z"),
        doctor: {
            _id: "1",
            name: "Dr. Roopa Ravi",
            hospital: {
                _id: "1",
                name: "Heart Care Clinic",
                doctors: ["1"],
            },
            specialization: { _id: "1", name: "Cardiology" },
            qualifications: "MBBS, MD",
            practicingSince: new Date("2010-01-01"),
        },
        profile: "123",
    },
    {
        _id: "2",
        timeSlot: new Date("2022-03-01T11:00:00.000Z"),
        doctor: {
            _id: "1",
            name: "Dr. Roopa Ravi",
            hospital: {
                _id: "1",
                name: "Heart Care Clinic",
                doctors: ["1"],
            },
            specialization: { _id: "1", name: "Cardiology" },
            qualifications: "MBBS, MD",
            practicingSince: new Date("2010-01-01"),
        },
        profile: "123",
        cancelled: true,
    },
    {
        _id: "3",
        timeSlot: new Date("2023-02-01T12:00:00.000Z"),
        doctor: {
            _id: "2",
            name: "Dr. Ravi",
            hospital: {
                _id: "2",
                name: "Ravi Clinic",
                doctors: ["2"],
            },
            specialization: { _id: "2", name: "Veterinary" },
            qualifications: "MBBS, MD",
            practicingSince: new Date("2015-05-01"),
        },
        profile: "123",
    },
];

const UserAppointments = () => {
    const { appointments, error, isLoading } = useMyAppointments({
        profileId: localStorage.getItem("currentProfileId") || "",
    });

    return !getCurrentProfileId() ? (
        <Flex width={"100%"} height={"100%"} justifyContent={"center"}>
            <VStack>
                <Text>There are no profiles in your account</Text>
                <Button
                    variant={"link"}
                    as={Link}
                    to={"/portal/profiles/new"}
                    colorScheme="pink"
                >
                    Create a profile to get started
                </Button>
            </VStack>
        </Flex>
    ) : (
        <AppointmentsPanel
            appointments={appointments}
            error={error}
            isLoading={isLoading}
        />
    );
};

export default UserAppointments;

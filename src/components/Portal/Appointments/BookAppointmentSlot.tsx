import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    Stack,
    StackDivider,
    Button,
    Divider,
    Grid,
    Box,
    Flex,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import {
    Appointment,
    BookAppointmentData,
    RescheduleAppointmentData,
} from "../../../models/appointment";
import moment from "moment";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar } from "react-icons/bs";
import useAppointments from "../../../hooks/useAppointments";
import { doctorId } from "../../../App";
import Modal from "../../common/Modal";
import { httpService } from "../../../services/http-service";
import { useNavigate, useParams } from "react-router-dom";
import colourPalette from "../../../utilities/colour-palette";
import Loader from "../../common/Loader";
import { getCurrentProfileId } from "../../../utilities/helper-service";

interface Props {
    appointments?: Appointment[];
}

const mockAppointments: Appointment[] = [
    {
        _id: "1",
        timeSlot: new Date("2024-04-01T10:00:00.000Z"),
        doctor: "1",
    },
    {
        _id: "2",
        timeSlot: new Date("2024-05-01T11:00:00.000Z"),
        doctor: "1",
    },
    {
        _id: "2",
        timeSlot: new Date("2024-05-01T13:00:00.000Z"),
        doctor: "1",
        cancelled: true,
    },
    {
        _id: "3",
        timeSlot: new Date("2024-05-02T12:00:00.000Z"),
        doctor: "1",
    },
];

const BookAppointmentSlot = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { profileId: profileIdParam, oldId } = useParams();
    const profileId = profileIdParam || getCurrentProfileId() || "";

    const [date, setDate] = useState(new Date());

    const navigate = useNavigate();
    const toast = useToast();

    const handleConfirm = (id: string) => {
        let promise;
        if (oldId) {
            promise = httpService(`/appointments/reschedule`).patch<
                RescheduleAppointmentData,
                Appointment
            >({ newAppointmentId: id }, oldId);
        } else {
            promise = httpService(`/appointments/book`).patch<
                BookAppointmentData,
                Appointment
            >(
                {
                    profileId: profileId,
                },
                id
            );
        }

        promise
            .then((res) => {
                navigate("/portal/appointments", {
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
                    position: "bottom-right",
                });
            });
    };

    const { appointments, error, isLoading } = useAppointments(
        {
            date: date,
            doctorId: doctorId,
        },
        [date]
    );
    const [selectedAppointmentId, setSelectedAppointmentId] =
        useState<string>("");

    return (
        <div>
            <Modal
                header="Logout"
                body="Are you sure you want to book this appointment?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button
                            colorScheme="pink"
                            backgroundColor={colourPalette.primary}
                            mr={3}
                            onClick={() => {
                                handleConfirm(selectedAppointmentId);
                            }}
                        >
                            Confirm
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            />
            <Card
                maxWidth="750px"
                boxShadow={"0px 0px 10px #b3b3b3"}
                marginX={"auto"}
            >
                <CardHeader>
                    <Flex flexDirection={"column"} alignItems={"center"}>
                        <Heading
                            size="md"
                            color={"pink.400"}
                            marginBottom={"10px"}
                        >
                            {oldId ? "Reschedule" : "Book"} Appointment
                        </Heading>
                        <Box border={"1px solid #b3b3b3"} borderRadius={"5px"}>
                            <DatePicker
                                showIcon
                                icon={<BsCalendar />}
                                selected={date}
                                onChange={(date) => setDate(date as Date)}
                                // includeDates={[
                                //     new Date(),
                                //     ...mockAppointments.map((a) => a.timeSlot),
                                // ]}
                            />
                        </Box>
                    </Flex>
                </CardHeader>

                <Divider color={"gray.300"} />

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <div>{error}</div>
                ) : appointments.length == 0 ? (
                    <Box marginX={"auto"} marginY={"20px"}>
                        There are no slots available
                    </Box>
                ) : (
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing="4">
                            {appointments
                                .sort((a, b) =>
                                    a.timeSlot > b.timeSlot ? 1 : -1
                                )
                                .map(
                                    (a) =>
                                        !a.cancelled && (
                                            <Grid
                                                marginX={"auto"}
                                                maxWidth={"200px"}
                                                templateColumns="1fr 1fr"
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                            >
                                                <Heading size="xs">
                                                    {moment(a.timeSlot).format(
                                                        "h:mm a"
                                                    )}
                                                </Heading>
                                                {new Date(a.timeSlot) >
                                                    new Date() &&
                                                    !a.profile && (
                                                        <Button
                                                            size="xs"
                                                            leftIcon={
                                                                <BiPlus />
                                                            }
                                                            colorScheme="orange"
                                                            variant={"outline"}
                                                            border={"1px"}
                                                            marginX={"10px"}
                                                            onClick={() => {
                                                                setSelectedAppointmentId(
                                                                    a._id
                                                                );
                                                                onOpen();
                                                            }}
                                                        >
                                                            Book
                                                        </Button>
                                                    )}
                                            </Grid>
                                        )
                                )}
                        </Stack>
                    </CardBody>
                )}
            </Card>
        </div>
    );
};

export default BookAppointmentSlot;

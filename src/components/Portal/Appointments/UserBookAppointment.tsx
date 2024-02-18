import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    Stack,
    StackDivider,
    HStack,
    Button,
    Divider,
    Grid,
    Box,
    VStack,
    Flex,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Appointment, BookAppointmentData } from "../../../models/appointment";
import moment from "moment";
import { BiPlus } from "react-icons/bi";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "../../common/Form";
import { BsCalendar } from "react-icons/bs";
import useAppointments from "../../../hooks/useAppointments";
import { doctorId } from "../../../App";
import { ColourPaletteContext } from "../../../contexts/colourPaletteContext";
import Modal from "../../common/Modal";
import { httpService } from "../../../services/http-service";
import { useNavigate } from "react-router-dom";

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

const UserBookAppointment = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { primaryColour } = useContext(ColourPaletteContext);
    const [date, setDate] = useState(new Date());

    const navigate = useNavigate();
    const toast = useToast();

    const handleConfirm = (data: BookAppointmentData, id: string) => {
        let bookAppointmentService = httpService(`/appointments/book`);
        bookAppointmentService
            .patch<BookAppointmentData, Appointment>(data, id)
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
                            backgroundColor={primaryColour}
                            mr={3}
                            onClick={() => {
                                handleConfirm(
                                    {
                                        profileId:
                                            localStorage.getItem(
                                                "currentProfileId"
                                            ) || "",
                                    },
                                    selectedAppointmentId
                                );
                            }}
                        >
                            Confirm
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            />
            <Card maxWidth="750px" boxShadow={"0px 0px 10px #b3b3b3"}>
                <CardHeader>
                    <Flex flexDirection={"column"} alignItems={"center"}>
                        <Heading
                            size="md"
                            color={"pink.400"}
                            marginBottom={"10px"}
                        >
                            Book Appointment
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

                <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                        {appointments.map(
                            (a) =>
                                !a.cancelled && (
                                    <Grid
                                        marginX={"auto"}
                                        maxWidth={"200px"}
                                        templateColumns="1fr 1fr"
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                    >
                                        <Heading
                                            size="xs"
                                            textTransform="uppercase"
                                        >
                                            {moment(a.timeSlot).format(
                                                "h:mm a"
                                            )}
                                        </Heading>
                                        {new Date(a.timeSlot) > new Date() && (
                                            <Button
                                                size="xs"
                                                leftIcon={<BiPlus />}
                                                color={"orange.500"}
                                                border={"1px"}
                                                borderColor={"orange.200"}
                                                backgroundColor={"white"}
                                                _hover={{
                                                    backgroundColor:
                                                        "orange.100",
                                                }}
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
            </Card>{" "}
        </div>
    );
};

export default UserBookAppointment;

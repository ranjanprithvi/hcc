import {
    HStack,
    Heading,
    Button,
    Grid,
    Box,
    Text,
    GridItem,
    Flex,
    VStack,
    Tooltip,
    IconButton,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import {
    BiCalendarAlt,
    BiCalendarX,
    BiCalendarPlus,
    BiCalendarEvent,
    BiCalendarEdit,
} from "react-icons/bi";
import { IoMdCalendar } from "react-icons/io";
import { Link } from "react-router-dom";
import { Appointment } from "../../../models/appointment";
import colourPalette from "../../../utilities/colour-palette";
import { partition } from "lodash";
import Loader from "../../common/Loader";
import { httpService } from "../../../services/http-service";
import Modal from "../../common/Modal";
import { useState } from "react";

interface Props {
    appointments: Appointment[];
    profileId?: string;
    error: string;
    isLoading: boolean;
}

const AppointmentsPanel = ({
    appointments,
    profileId,
    error,
    isLoading,
}: Props) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment>(
        {} as Appointment
    );

    const [upcomingAppointments, otherAppointments] = partition(
        appointments,
        (a) => {
            return new Date(a.timeSlot) > new Date() && !a.cancelled;
        }
    );

    function handleCancel(a: Appointment): void {
        const appointmentService = httpService("/appointments/cancel");

        appointmentService
            .patch({}, a._id)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                toast({
                    title: "Error",
                    description: err.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    }

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <Modal
                header="Cancel Appointment"
                body="Are you sure you want to cancel this appointment?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button
                            colorScheme="pink"
                            mr={3}
                            onClick={() => handleCancel(appointmentToCancel)}
                        >
                            Yes
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            />
            <Grid
                templateColumns={"1fr 1fr 170px"}
                columnGap={"50px"}
                rowGap={"10px"}
                padding={"20px"}
            >
                <GridItem colSpan={2}>
                    <HStack>
                        <BiCalendarEvent
                            size="20px"
                            color={colourPalette.primary}
                        />
                        <Heading size="md">Upcoming Appointments</Heading>
                    </HStack>
                </GridItem>
                <Button
                    as={Link}
                    to={
                        profileId
                            ? `/portal/appointments/book/${profileId}`
                            : "/portal/appointments/book"
                    }
                    size="sm"
                    colorScheme="pink"
                    variant={"outline"}
                    leftIcon={<BiCalendarPlus />}
                    disabled={upcomingAppointments.length >= 2}
                    onClick={(e) => {
                        if (upcomingAppointments.length >= 2) {
                            e.preventDefault();
                            alert(
                                "You cannot have more than 2 appointments booked"
                            );
                        }
                    }}
                >
                    Book Appointment
                </Button>
                {upcomingAppointments.length == 0 ? (
                    <Text>There are no upcoming appointments</Text>
                ) : (
                    upcomingAppointments.map((a) => (
                        <Box
                            background={colourPalette.primaryBg}
                            padding={"20px 30px 20px 40px"}
                        >
                            <HStack
                                justifyContent={"space-between"}
                                width={"100%"}
                                alignItems={"flex-start"}
                            >
                                <VStack alignItems={"flex-start"}>
                                    <Heading size="xs">
                                        {moment(a.timeSlot).format(
                                            "ddd, Do MMM YYYY"
                                        )}
                                    </Heading>

                                    <Text fontSize="x-large">
                                        {moment(a.timeSlot).format("h:mm a")}
                                    </Text>
                                </VStack>

                                <Box>
                                    <Tooltip label="Reschedule">
                                        <IconButton
                                            as={Link}
                                            to={`/portal/appointments/reschedule/${a._id}`}
                                            marginRight={"10px"}
                                            size={"sm"}
                                            colorScheme="pink"
                                            variant={"outline"}
                                            icon={
                                                <IoMdCalendar size={"20px"} />
                                            }
                                            aria-label={"Reschedule"}
                                        ></IconButton>
                                    </Tooltip>
                                    <Tooltip label="Cancel">
                                        <IconButton
                                            size={"sm"}
                                            colorScheme="pink"
                                            icon={<BiCalendarX size={"20px"} />}
                                            aria-label={"Cancel"}
                                            onClick={() => {
                                                setAppointmentToCancel(a);
                                                onOpen();
                                            }}
                                        ></IconButton>
                                    </Tooltip>
                                </Box>
                            </HStack>
                        </Box>
                    ))
                )}
            </Grid>
            <Grid
                templateColumns={"1fr 1fr 170px"}
                columnGap={"50px"}
                rowGap={"20px"}
                padding={"20px"}
            >
                <HStack>
                    <BiCalendarAlt
                        size="20px"
                        color={colourPalette.secondary}
                    />
                    <Heading size="md">Past Appointments</Heading>
                </HStack>

                {otherAppointments.length == 0 ? (
                    <GridItem colSpan={3}>
                        <Text>There are no past appointments</Text>
                    </GridItem>
                ) : (
                    otherAppointments
                        .sort((a, b) => {
                            return a.timeSlot > b.timeSlot ? -1 : 1;
                        })
                        .map((a, idx) => (
                            <GridItem
                                background={
                                    a.cancelled
                                        ? "gray.200"
                                        : colourPalette.secondaryBg
                                }
                                padding={"20px 30px 20px 40px"}
                                gridColumn={idx % 2 == 0 ? 1 : 2}
                            >
                                <HStack justifyContent={"space-between"}>
                                    <VStack alignItems={"flex-start"}>
                                        <Heading size="xs">
                                            {moment(a.timeSlot).format(
                                                "ddd, Do MMM YYYY"
                                            )}
                                        </Heading>
                                        <Text fontSize="x-large">
                                            {moment(a.timeSlot).format(
                                                "h:mm a"
                                            )}
                                        </Text>
                                    </VStack>
                                    {a.cancelled && <div>Cancelled</div>}
                                </HStack>
                            </GridItem>
                        ))
                )}
            </Grid>
        </>
    );
};

export default AppointmentsPanel;

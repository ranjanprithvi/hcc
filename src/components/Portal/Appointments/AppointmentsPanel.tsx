import { HStack, Heading, Button, Grid, Box, Text } from "@chakra-ui/react";
import moment from "moment";
import {
    BiCalendarAlt,
    BiCalendarX,
    BiCalendarPlus,
    BiCalendarEvent,
} from "react-icons/bi";
import { IoMdCalendar } from "react-icons/io";
import { Link } from "react-router-dom";
import { Appointment } from "../../../models/appointment";
import colourPalette from "../../../utilities/colour-palette";
import { partition } from "lodash";

interface Props {
    appointments: Appointment[];
    error: string;
}

const AppointmentsPanel = ({ appointments, error }: Props) => {
    const [upcomingAppointments, pastAppointments] = partition(
        appointments,
        (a) => {
            return new Date(a.timeSlot) > new Date() && !a.cancelled;
        }
    );
    return (
        <>
            <HStack
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                paddingX={"20px"}
            >
                <Box>
                    <Box marginBottom={"20px"}>
                        <HStack>
                            <BiCalendarEvent
                                size="20px"
                                color={colourPalette.primary}
                            />
                            <Heading size="md">Upcoming Appointments</Heading>
                        </HStack>

                        <Grid
                            templateColumns={"auto auto auto"}
                            columnGap={"50px"}
                            padding={"20px"}
                        >
                            {upcomingAppointments.length == 0 && (
                                <Text>There are no upcoming appointments</Text>
                            )}
                            {upcomingAppointments.map((a) => (
                                <Box
                                    background={colourPalette.primaryBg}
                                    padding={"20px 60px 20px 40px"}
                                >
                                    <Heading size="xs">
                                        {moment(a.timeSlot).format(
                                            "dddd, MMMM Do YYYY"
                                        )}
                                    </Heading>
                                    <Text fontSize="x-large">
                                        {moment(a.timeSlot).format("h:mm a")}
                                    </Text>

                                    {a.cancelled ? (
                                        <div>Cancelled</div>
                                    ) : (
                                        new Date(a.timeSlot) > new Date() && (
                                            <HStack>
                                                <Button
                                                    size="xs"
                                                    leftIcon={<IoMdCalendar />}
                                                    colorScheme="orange"
                                                    variant={"outline"}
                                                >
                                                    Reschedule
                                                </Button>

                                                <Button
                                                    size="xs"
                                                    leftIcon={<BiCalendarX />}
                                                    colorScheme="red"
                                                    variant={"outline"}
                                                >
                                                    Cancel
                                                </Button>
                                            </HStack>
                                        )
                                    )}
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                    <Box marginBottom={"30px"}>
                        <HStack>
                            <BiCalendarAlt
                                size="20px"
                                color={colourPalette.secondary}
                            />
                            <Heading size="md">Past Appointments</Heading>
                        </HStack>

                        <Grid
                            templateColumns={"auto auto auto"}
                            columnGap={"50px"}
                            padding={"20px"}
                        >
                            {pastAppointments.length == 0 && (
                                <Text>There are no past appointments</Text>
                            )}
                            {pastAppointments.map((a) => (
                                <Box
                                    background={colourPalette.secondaryBg}
                                    padding={"20px 60px 20px 40px"}
                                >
                                    <Heading size="xs">
                                        {moment(a.timeSlot).format(
                                            "dddd, MMMM Do YYYY"
                                        )}
                                    </Heading>
                                    <Text fontSize="x-large">
                                        {moment(a.timeSlot).format("h:mm a")}
                                    </Text>
                                    {a.cancelled ? (
                                        <div>Cancelled</div>
                                    ) : (
                                        new Date(a.timeSlot) > new Date() && (
                                            <HStack>
                                                <Button
                                                    size="xs"
                                                    leftIcon={<IoMdCalendar />}
                                                    colorScheme="orange"
                                                    variant={"outline"}
                                                >
                                                    Reschedule
                                                </Button>

                                                <Button
                                                    size="xs"
                                                    leftIcon={<BiCalendarX />}
                                                    colorScheme="red"
                                                    variant={"outline"}
                                                >
                                                    Cancel
                                                </Button>
                                            </HStack>
                                        )
                                    )}
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                </Box>
                <Button
                    as={Link}
                    to="/portal/appointments/book"
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
            </HStack>
        </>
    );
};

export default AppointmentsPanel;

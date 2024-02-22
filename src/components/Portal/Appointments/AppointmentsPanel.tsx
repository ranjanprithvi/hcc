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
                {upcomingAppointments.length == 0 && (
                    <Text>There are no upcoming appointments</Text>
                )}
                {upcomingAppointments.map((a) => (
                    <Box
                        background={colourPalette.primaryBg}
                        padding={"20px 30px 20px 40px"}
                    >
                        <HStack justifyContent={"space-between"} width={"100%"}>
                            <VStack alignItems={"flex-start"}>
                                <Heading size="xs">
                                    {moment(a.timeSlot).format(
                                        "ddd, MMM Do YYYY"
                                    )}
                                </Heading>

                                <Text fontSize="x-large">
                                    {moment(a.timeSlot).format("h:mm a")}
                                </Text>
                            </VStack>

                            <VStack alignItems={"stretch"}>
                                <Button
                                    size="xs"
                                    leftIcon={<IoMdCalendar />}
                                    colorScheme="pink"
                                    variant={"outline"}
                                >
                                    Reschedule
                                </Button>

                                <Button
                                    justifyContent={"flex-start"}
                                    size="xs"
                                    leftIcon={<BiCalendarX />}
                                    colorScheme="orange"
                                    variant={"outline"}
                                >
                                    Cancel
                                </Button>
                            </VStack>
                        </HStack>
                    </Box>
                ))}
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

                {pastAppointments.length == 0 && (
                    <GridItem colSpan={3}>
                        <Text>There are no past appointments</Text>
                    </GridItem>
                )}
                {pastAppointments.map((a, idx) => (
                    <GridItem
                        background={colourPalette.secondaryBg}
                        padding={"20px 30px 20px 40px"}
                        gridColumn={idx % 2 == 0 ? 1 : 2}
                    >
                        <Heading size="xs">
                            {moment(a.timeSlot).format("ddd, MMM Do YYYY")}
                        </Heading>
                        <Text fontSize="x-large">
                            {moment(a.timeSlot).format("h:mm a")}
                        </Text>
                        {a.cancelled && <div>Cancelled</div>}
                    </GridItem>
                ))}
            </Grid>
        </>
    );
};

export default AppointmentsPanel;

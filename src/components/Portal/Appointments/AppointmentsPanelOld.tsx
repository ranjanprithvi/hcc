import {
    Card,
    CardHeader,
    HStack,
    Heading,
    Button,
    Divider,
    CardBody,
    Stack,
    StackDivider,
    Flex,
} from "@chakra-ui/react";
import moment from "moment";
import {
    BiCalendarAlt,
    BiPlus,
    BiCalendarX,
    BiCalendarPlus,
} from "react-icons/bi";
import { IoMdCalendar } from "react-icons/io";
import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Appointment } from "../../../models/appointment";
import colourPalette from "../../../utilities/colour-palette";

interface Props {
    appointments: Appointment[];
    error: string;
}

const AppointmentsPanel = ({ appointments, error }: Props) => {
    return (
        <Card
            boxShadow={"0px 0px 10px #b3b3b3"}
            marginRight={"20px"}
            marginBottom={"1rem"}
        >
            <CardHeader color={colourPalette.primary}>
                <HStack justifyContent={"space-between"} paddingX={"20px"}>
                    <HStack>
                        <BiCalendarAlt size="20px" />
                        <Heading size="md">Appointments</Heading>
                    </HStack>
                    <Button
                        as={Link}
                        to="/portal/appointments/book"
                        size="sm"
                        colorScheme="pink"
                        variant={"outline"}
                        leftIcon={<BiCalendarPlus />}
                    >
                        Book Appointment
                    </Button>
                </HStack>
            </CardHeader>
            <Divider color={"gray.300"} />

            <CardBody>
                <Stack divider={<StackDivider />} spacing="4" paddingX={"20px"}>
                    {appointments.map((a) => (
                        <Flex justifyContent="space-between">
                            <HStack>
                                <VscDebugBreakpointDataUnverified />
                                <Heading size="xs" textTransform="uppercase">
                                    {moment(a.timeSlot).format(
                                        "MMMM Do YYYY, h:mm a"
                                    )}
                                </Heading>
                                {/* {typeof a.doctor != "string" && (
                                <>
                                    <Heading>{a.doctor.name}</Heading>
                                    {typeof a.doctor.hospital !=
                                        "string" && (
                                        <Heading>
                                            {a.doctor.hospital.name}
                                        </Heading>
                                    )}
                                </>
                            )} */}
                            </HStack>
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
                        </Flex>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    );
};

export default AppointmentsPanel;

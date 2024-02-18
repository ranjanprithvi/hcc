import {
    Flex,
    HStack,
    Text,
    Input,
    Button,
    VStack,
    Card,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Box,
} from "@chakra-ui/react";
import { HorizontalCalendar } from "../../common/HorizontalCalendar";
import { useContext, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { Appointment } from "../../../models/appointment";
import { Link } from "react-router-dom";
import { Profile } from "../../../models/profile";
import moment from "moment";
import { HiDotsVertical } from "react-icons/hi";
import { ColourPaletteContext } from "../../../contexts/colourPaletteContext";
import { FaPhoneAlt, FaRegTimesCircle, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Loader from "../../common/Loader";
import useAppointments from "../../../hooks/useAppointments";
import { doctorId } from "../../../App";

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
        profile: {
            _id: "123",
            name: "John Doe",
            account: "123",
            dob: new Date("2004-04-01"),
            gender: "Male",
            phone: "1234567890",
            appointments: ["1", "2"],
            medicalRecords: ["1", "2"],
            prescriptions: ["1", "2"],
            externalRecords: ["1", "2"],
            externalPrescriptions: ["1", "2"],
        },
    },
    {
        _id: "2",
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
    },
    {
        _id: "3",
        timeSlot: new Date("2024-04-01T11:00:00.000Z"),
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
        profile: {
            _id: "123",
            name: "Jane Doe",
            account: "123",
            dob: new Date("2004-04-01"),
            gender: "Female",
            phone: "1234567890",
            appointments: ["1", "2"],
            medicalRecords: ["1", "2"],
            prescriptions: ["1", "2"],
            externalRecords: ["1", "2"],
            externalPrescriptions: ["1", "2"],
        },
        cancelled: true,
    },
    {
        _id: "4",
        timeSlot: new Date("2024-04-01T12:00:00.000Z"),
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
        profile: {
            _id: "123",
            name: "Ju Doe",
            account: "123",
            dob: new Date("2004-04-01"),
            gender: "Female",
            phone: "1234567890",
            appointments: ["1", "2"],
            medicalRecords: ["1", "2"],
            prescriptions: ["1", "2"],
            externalRecords: ["1", "2"],
            externalPrescriptions: ["1", "2"],
        },
    },
    {
        _id: "5",
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
    },
    {
        _id: "6",
        timeSlot: new Date("2024-04-01T11:00:00.000Z"),
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
    },
];

export const HospitalAppointments = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { primaryColour, secondaryBgColour } =
        useContext(ColourPaletteContext);

    const { appointments, isLoading, error } = useAppointments(
        {
            date: selectedDate,
            doctorId: doctorId,
        },
        [selectedDate]
    );

    return (
        <VStack height={"100%"} width={"100%"}>
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <Button
                    colorScheme="pink"
                    as={Link}
                    to={"/portal/hospital/appointments/create"}
                    leftIcon={<PiPlusBold />}
                    size={"sm"}
                    variant={"outline"}
                    borderColor={primaryColour}
                    color={primaryColour}
                >
                    Create Slots
                </Button>
                <HorizontalCalendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                <VStack>
                    <Text>Custom Date:</Text>
                    <Input
                        value={selectedDate.toISOString().split("T")[0]}
                        type="date"
                        width={"150px"}
                        onChange={(date) => {
                            setSelectedDate(new Date(date.target.value));
                        }}
                    ></Input>
                </VStack>
            </Flex>

            {isLoading ? (
                <Box marginTop={"200px"}>
                    <Loader />
                </Box>
            ) : (
                <VStack width={"65%"} marginTop={"30px"}>
                    {appointments
                        .sort((a, b) => (a.timeSlot > b.timeSlot ? 1 : -1))
                        .map((appointment) => (
                            <HStack
                                key={appointment._id}
                                borderTop={"1px solid #d1d1d1"}
                                padding={"10px"}
                                width={"100%"}
                                alignItems={"flex-start"}
                            >
                                <Text
                                    fontSize={"small"}
                                    color={"gray"}
                                    width={"80px"}
                                >
                                    {moment(appointment.timeSlot).format(
                                        "hh:mm a"
                                    )}
                                </Text>

                                <Card
                                    padding={"20px"}
                                    width={"100%"}
                                    background={
                                        !appointment.profile ||
                                        appointment.cancelled
                                            ? "#f8f9fa"
                                            : secondaryBgColour
                                    }
                                >
                                    <HStack
                                        width={"100%"}
                                        justifyContent={"space-between"}
                                    >
                                        <HStack>
                                            {appointment.profile && (
                                                <>
                                                    <Text
                                                        fontSize={"medium"}
                                                        fontWeight={"bold"}
                                                        marginRight={"30px"}
                                                    >
                                                        {
                                                            (
                                                                appointment.profile as Profile
                                                            )?.name
                                                        }
                                                    </Text>
                                                    <Text
                                                        fontSize={"small"}
                                                        color={"gray"}
                                                        marginRight={"30px"}
                                                    >
                                                        {(
                                                            appointment.profile as Profile
                                                        )?.gender +
                                                            " | " +
                                                            moment().diff(
                                                                (
                                                                    appointment.profile as Profile
                                                                )?.dob,
                                                                "year"
                                                            )}
                                                    </Text>
                                                    <FaPhoneAlt
                                                        color="gray"
                                                        size={"10px"}
                                                    />
                                                    <Text
                                                        fontSize={"small"}
                                                        color={"gray"}
                                                    >
                                                        {
                                                            (
                                                                appointment.profile as Profile
                                                            )?.phone
                                                        }
                                                    </Text>
                                                </>
                                            )}
                                        </HStack>

                                        <HStack>
                                            {appointment.cancelled ? (
                                                <Text
                                                    fontSize={"small"}
                                                    color={"gray"}
                                                >
                                                    Cancelled
                                                </Text>
                                            ) : (
                                                <Menu>
                                                    <MenuButton
                                                        as={Button}
                                                        size={"sm"}
                                                        background={"none"}
                                                        _hover={{
                                                            background: "none",
                                                        }}
                                                    >
                                                        <HiDotsVertical />
                                                    </MenuButton>
                                                    <MenuList
                                                        fontSize={"small"}
                                                    >
                                                        {!appointment.profile ? (
                                                            <>
                                                                <MenuItem
                                                                    as={Link}
                                                                    to={
                                                                        "/portal/user/appointments/book"
                                                                    }
                                                                    icon={
                                                                        <FaUser />
                                                                    }
                                                                >
                                                                    Book
                                                                    Appointment
                                                                </MenuItem>
                                                                <MenuItem
                                                                    as={NavLink}
                                                                    to={
                                                                        "/userDetails/me"
                                                                    }
                                                                    icon={
                                                                        <FaRegTimesCircle />
                                                                    }
                                                                >
                                                                    Delete Slot
                                                                </MenuItem>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <MenuItem
                                                                    as={NavLink}
                                                                    to={
                                                                        "/userDetails/me"
                                                                    }
                                                                    icon={
                                                                        <FaRegTimesCircle />
                                                                    }
                                                                >
                                                                    Cancel
                                                                    Appointment
                                                                </MenuItem>
                                                            </>
                                                        )}
                                                    </MenuList>
                                                </Menu>
                                            )}
                                        </HStack>
                                    </HStack>
                                </Card>
                            </HStack>
                        ))}
                </VStack>
            )}

            {/* <Flex
                justifyContent={"center"}
                border={"1px solid gray"}
                borderRadius={"5px"}
                paddingX={"10px"}
            >
                <ReactDatePicker
            showIcon
            icon={<Box as={BsCalendar} />}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date as Date)}
        ></ReactDatePicker>
            </Flex> */}
        </VStack>
    );
};
import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    Stack,
    StackDivider,
    Box,
    HStack,
    Button,
    Flex,
    Divider,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { Profile } from "../../../models/profile";
import moment from "moment";
import { IoMdCalendar } from "react-icons/io";
import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import {
    BiCalendarAlt,
    BiCalendarX,
    BiFolderOpen,
    BiPlus,
    BiPlusMedical,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ColourPaletteContext } from "../../../contexts/colourPaletteContext";
import useProfiles from "../../../hooks/useProfiles";
import { FaEdit, FaDownload, FaPen } from "react-icons/fa";
import { LuUser } from "react-icons/lu";

const mockProfiles: Profile[] = [
    {
        _id: "1",
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
    {
        _id: "2",
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
];

const HospitalProfiles = () => {
    const { primaryColour } = useContext(ColourPaletteContext);
    const { profiles, error, isLoading } = useProfiles({
        profileId: localStorage.getItem("currentProfileId") || "",
    });

    return (
        <div>
            <Card boxShadow={"0px 0px 10px #b3b3b3"} maxWidth={"75vw"}>
                <CardHeader>
                    <HStack justifyContent={"space-between"} paddingX={"20px"}>
                        <HStack color={primaryColour}>
                            <BiFolderOpen size="20px" />
                            <Heading size="md">Patients</Heading>
                        </HStack>
                        <Button
                            as={Link}
                            to="/portal/user/appointments/new"
                            size="sm"
                            colorScheme="orange"
                            backgroundColor={primaryColour}
                            leftIcon={<BiPlusMedical />}
                        >
                            Add Record
                        </Button>
                    </HStack>
                </CardHeader>
                <Divider color={"gray.300"} />

                <CardBody>
                    <TableContainer paddingX={"20px"}>
                        <Table variant="simple" size={"sm"}>
                            <Thead>
                                <Tr>
                                    <Th width={"5px"}></Th>
                                    <Th>Name</Th>
                                    <Th>Gender</Th>
                                    <Th>Age</Th>
                                    <Th>Phone</Th>
                                    <Th isNumeric></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {profiles.map((profile) => (
                                    <Tr key={profile._id}>
                                        <Td width={"5px"}>
                                            <LuUser />
                                        </Td>
                                        <Td>
                                            <Button
                                                size={"sm"}
                                                as={Link}
                                                to={`/portal/hospital/profiles/${profile._id}`}
                                                variant={"link"}
                                                color={"gray.800"}
                                            >
                                                {profile.name}
                                            </Button>
                                        </Td>
                                        <Td>{profile.gender}</Td>
                                        <Td>
                                            {moment(profile.dob).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </Td>
                                        <Td>{profile.phone}</Td>
                                        <Td isNumeric>
                                            <Button
                                                size={"xs"}
                                                leftIcon={<FaPen />}
                                                colorScheme="pink"
                                                variant={"outline"}
                                                marginRight={"5px"}
                                                as={Link}
                                                to={`/portal/profiles/${profile._id}`}
                                            >
                                                Edit
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
        </div>
    );
};

export default HospitalProfiles;

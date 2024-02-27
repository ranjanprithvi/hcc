import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    HStack,
    Button,
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
import { BiFolderOpen, BiPlus, BiPlusMedical } from "react-icons/bi";
import { Link } from "react-router-dom";
import useProfiles from "../../../hooks/useProfiles";
import { FaPen } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import colourPalette from "../../../utilities/colour-palette";
import Loader from "../../common/Loader";
import Searchbar from "../../common/Searchbar";
import { useState } from "react";
import ProfilesTable from "./ProfilesTable";

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

const AllProfiles = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <Card boxShadow={"0px 0px 10px #b3b3b3"} maxWidth={"75vw"}>
                <CardHeader>
                    <HStack justifyContent={"space-between"} paddingX={"20px"}>
                        <HStack color={colourPalette.primary}>
                            <BiFolderOpen size="20px" />
                            <Heading size="md">Patients</Heading>
                        </HStack>
                        <Button
                            as={Link}
                            to="/portal/profiles/new"
                            size="sm"
                            colorScheme="pink"
                            variant={"outline"}
                            leftIcon={<BiPlus />}
                        >
                            Add Patient
                        </Button>
                    </HStack>
                </CardHeader>
                <Divider color={"gray.300"} />

                <CardBody>
                    <TableContainer paddingX={"20px"}>
                        <>
                            <Searchbar
                                setSearch={setSearchTerm}
                                placeholder="Search by name or phone number.."
                                width={"50%"}
                                marginBottom={"20px"}
                            ></Searchbar>
                            <ProfilesTable searchTerm={searchTerm} />
                        </>
                    </TableContainer>
                </CardBody>
            </Card>
        </div>
    );
};

export default AllProfiles;

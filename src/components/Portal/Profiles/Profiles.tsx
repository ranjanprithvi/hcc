import {
    Box,
    Button,
    Card,
    Flex,
    HStack,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Profile } from "../../../models/profile";
import { BiUserCircle, BiUserPlus } from "react-icons/bi";
import moment from "moment";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import useProfiles from "../../../hooks/useProfiles";
import colourPalette from "../../../utilities/colour-palette";
import Loader from "../../common/Loader";

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

const Profiles = () => {
    const { profiles, error, isLoading } = useProfiles();

    return isLoading ? (
        <Loader />
    ) : error ? (
        <div>{error}</div>
    ) : (
        <>
            <HStack
                alignItems={"center"}
                marginBottom={"25px"}
                color={colourPalette.primary}
                justifyContent={"space-between"}
            >
                <HStack>
                    <BiUserCircle size={"25px"} />
                    <Heading size={"md"}>Profiles</Heading>
                </HStack>
                <Button
                    colorScheme="pink"
                    as={Link}
                    to={"/portal/profiles/new"}
                    leftIcon={<BiUserPlus />}
                    borderRadius={"5px"}
                    size={"sm"}
                    variant={"outline"}
                >
                    New Profile
                </Button>
            </HStack>
            {profiles.map((profile) => (
                <Card
                    padding={"20px"}
                    marginBottom={"20px"}
                    borderRadius={"5px"}
                    boxShadow={"0px 0px 5px #c8c8c8"}
                >
                    <HStack
                        justifyContent={"space-between"}
                        key={profile._id}
                        fontSize={"sm"}
                    >
                        <HStack>
                            <Box color={"pink.400"}>
                                <BiUserCircle size={"25px"} />
                            </Box>
                            <Text>{profile.name}</Text>
                        </HStack>
                        <Text>{profile.gender}</Text>
                        <Text>Age: {moment().diff(profile.dob, "year")}</Text>
                        <Text>
                            DoB: {moment(profile.dob).format("DD/MM/YYYY")}
                        </Text>
                        <HStack>
                            <Button
                                as={Link}
                                to={`/portal/profiles/${profile._id}`}
                                colorScheme="pink"
                                borderColor={colourPalette.primary}
                                borderRadius={"2px"}
                                size={"sm"}
                                variant={"outline"}
                            >
                                <FaPen />
                            </Button>
                            <Button
                                colorScheme="pink"
                                borderRadius={"2px"}
                                size={"sm"}
                            >
                                Delete
                            </Button>
                        </HStack>
                    </HStack>
                </Card>
            ))}
        </>
    );
};
export default Profiles;

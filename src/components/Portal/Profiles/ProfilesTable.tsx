import {
    Button,
    HStack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useContext } from "react";
import { FaPen } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { Profile } from "../../../models/profile";
import { Link } from "react-router-dom";
import useProfiles from "../../../hooks/useProfiles";
import Loader from "../../common/Loader";
import { GoLink } from "react-icons/go";
import { ProfileContext } from "../../../contexts/profileContext";

interface Props {
    searchTerm: string;
}

const ProfilesTable = ({ searchTerm }: Props) => {
    const { profileId } = useContext(ProfileContext);
    const { profiles, error, isLoading } = useProfiles(
        {
            profileId: profileId || "",
            search: searchTerm,
        },
        [searchTerm]
    );
    return isLoading ? (
        <Loader />
    ) : (
        <Table variant="simple" size={"sm"}>
            <Thead>
                <Tr>
                    <Th width={"5px"}></Th>
                    <Th>Name</Th>
                    <Th>Gender</Th>
                    <Th>Date of Birth</Th>
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
                                to={`/portal/profileOverview/${profile._id}`}
                                variant={"link"}
                                color={"gray.800"}
                                _hover={{
                                    textDecoration: "underline",
                                }}
                            >
                                {profile.name}
                            </Button>
                        </Td>
                        <Td>{profile.gender}</Td>
                        <Td>{moment(profile.dob).format("DD/MM/YYYY")}</Td>
                        <Td>{profile.phone}</Td>
                        <Td isNumeric>
                            <HStack justifyContent={"flex-end"}>
                                {!profile.account && (
                                    <Button
                                        size={"xs"}
                                        leftIcon={<GoLink />}
                                        colorScheme="pink"
                                        variant={"outline"}
                                        marginRight={"5px"}
                                        as={Link}
                                        to={`/portal/profiles/link/${profile._id}`}
                                    >
                                        Link Account
                                    </Button>
                                )}
                                <Button
                                    size={"xs"}
                                    leftIcon={<FaPen />}
                                    colorScheme="pink"
                                    marginRight={"5px"}
                                    as={Link}
                                    to={`/portal/profiles/${profile._id}`}
                                >
                                    Edit
                                </Button>
                            </HStack>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default ProfilesTable;

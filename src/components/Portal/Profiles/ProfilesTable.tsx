import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { FaPen } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { Profile } from "../../../models/profile";
import { Link } from "react-router-dom";
import useProfiles from "../../../hooks/useProfiles";
import Loader from "../../common/Loader";

interface Props {
    searchTerm: string;
}

const ProfilesTable = ({ searchTerm }: Props) => {
    const { profiles, error, isLoading } = useProfiles(
        {
            profileId: localStorage.getItem("currentProfileId") || "",
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
                                textDecoration={"underline"}
                            >
                                {profile.name}
                            </Button>
                        </Td>
                        <Td>{profile.gender}</Td>
                        <Td>{moment(profile.dob).format("DD/MM/YYYY")}</Td>
                        <Td>{profile.phone}</Td>
                        <Td isNumeric>
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
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default ProfilesTable;

import { TbLogout } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import {
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    useDisclosure,
    MenuDivider,
    MenuGroup,
} from "@chakra-ui/react";
import Modal from "../common/Modal";
import useProfiles from "../../hooks/useProfiles";
import { RiUser3Fill } from "react-icons/ri";
import useDoctors from "../../hooks/useDoctors";
// import { handleLogout } from "../../utilities/helper-service";
import ProtectedComponent from "../common/ProtectedComponent";
import colourPalette from "../../utilities/colour-palette";
import { useContext } from "react";
import { AccountContext } from "../../contexts/profileContext";
import { signOut } from "aws-amplify/auth";
import { getProfileId, setProfileId } from "../../utilities/helper-service";

const ProfilesMenuGroup = () => {
    const { profiles, error, isLoading } = useProfiles();
    // const { profileId, setProfileId } = useContext(AccountContext);

    return (
        <>
            <MenuGroup title="Profiles">
                {profiles.map((profile) => (
                    <MenuItem
                        color={
                            profile._id == getProfileId()
                                ? colourPalette.primary
                                : "gray.800"
                        }
                        backgroundColor={
                            profile._id == getProfileId()
                                ? colourPalette.primaryBg
                                : ""
                        }
                        icon={<RiUser3Fill />}
                        onClick={() => {
                            setProfileId(profile._id);
                            window.location.reload();
                        }}
                    >
                        {profile.name}
                    </MenuItem>
                ))}
            </MenuGroup>

            <MenuDivider />
        </>
    );
};

const DoctorsMenuGroup = () => {
    const { doctors, error, isLoading } = useDoctors();

    return (
        <>
            <MenuGroup title="Doctors">
                {doctors.map((d) => (
                    <MenuItem
                        color={d._id == "" ? colourPalette.primary : "gray.800"}
                        icon={<RiUser3Fill />}
                    >
                        {d.name}
                    </MenuItem>
                ))}
            </MenuGroup>

            <MenuDivider />
        </>
    );
};

const AccountDropdown = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setIdentityId } = useContext(AccountContext);

    return (
        <>
            <Modal
                header="Logout"
                body="Are you sure you want to logout?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button
                            colorScheme="pink"
                            mr={3}
                            onClick={() => {
                                signOut()
                                    .then(() => {
                                        window.location.assign("/");
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                                setProfileId("");
                                setIdentityId("");
                            }}
                        >
                            Yes
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            />
            <Menu>
                <MenuButton
                    size={"sm"}
                    as={Button}
                    leftIcon={<BiSolidUserCircle />}
                    rightIcon={<BsChevronDown />}
                >
                    Account
                </MenuButton>
                <MenuList>
                    <ProtectedComponent
                        hospital={<></>}
                        user={<ProfilesMenuGroup />}
                    ></ProtectedComponent>

                    <MenuItem icon={<TbLogout />} onClick={onOpen}>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default AccountDropdown;

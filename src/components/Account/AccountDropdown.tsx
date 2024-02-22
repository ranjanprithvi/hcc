import { useContext } from "react";
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
import { NavLink } from "react-router-dom";
import Modal from "../common/Modal";
import useProfiles from "../../hooks/useProfiles";
import { RiUser3Fill } from "react-icons/ri";
import useDoctors from "../../hooks/useDoctors";
import {
    getCurrentDoctorId,
    getCurrentProfileId,
    handleLogout,
    setCurrentProfileId,
} from "../../utilities/helper-service";
import ProtectedComponent from "../common/ProtectedComponent";
import colourPalette from "../../utilities/colour-palette";
import { LoginContext } from "../../contexts/loginContext";

const ProfilesMenuGroup = () => {
    const { profiles, error, isLoading } = useProfiles();

    return (
        <>
            <MenuGroup title="Profiles">
                {profiles.map((profile) => (
                    <MenuItem
                        color={
                            profile._id == getCurrentProfileId()
                                ? colourPalette.primary
                                : "gray.800"
                        }
                        backgroundColor={
                            profile._id == getCurrentProfileId()
                                ? colourPalette.primaryBg
                                : ""
                        }
                        icon={<RiUser3Fill />}
                        onClick={() => {
                            setCurrentProfileId(profile._id);
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
                        color={
                            d._id == getCurrentDoctorId()
                                ? colourPalette.primary
                                : "gray.800"
                        }
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
    const { props } = useContext(LoginContext);

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
                            onClick={handleLogout}
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

                    <MenuItem icon={<TbLogout />} onClick={props.signOut}>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default AccountDropdown;

import {
    Button,
    HStack,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Box,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { useRef } from "react";
import Modal from "../common/Modal";
import AccountDropdown from "../Account/AccountDropdown";
import ProtectedComponent from "../common/ProtectedComponent";
import { handleLogout } from "../../utilities/helper-service";
import colourPalette from "../../utilities/colour-palette";

interface NavItem {
    label: string;
    path: string;
}

interface Props {
    heading: string;
}

const PortalNavBar = ({ heading }: Props) => {
    const { pathname } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
    } = useDisclosure();
    const btnRef = useRef(null);

    return (
        <HStack
            justifyContent={"flex-end"}
            alignItems={"center"}
            height={"100%"}
            paddingX={"20px"}
            borderBottom={"1px solid #cecece"}
        >
            <Modal
                header="Logout"
                body="Are you sure you want to logout?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button
                            colorScheme="pink"
                            backgroundColor={colourPalette.primary}
                            mr={3}
                            onClick={handleLogout}
                        >
                            Yes
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            />
            <Drawer
                isOpen={isDrawerOpen}
                placement="top"
                onClose={onDrawerClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent width="150vw">
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder="Type here..." />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={onDrawerClose}
                        >
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <ProtectedComponent
                user={<AccountDropdown />}
                defaultComponent={
                    <Button
                        as={NavLink}
                        to="/auth/login"
                        colorScheme="pink"
                        variant="outline"
                        size={"sm"}
                    >
                        Login
                    </Button>
                }
            />
        </HStack>
    );
};

export default PortalNavBar;

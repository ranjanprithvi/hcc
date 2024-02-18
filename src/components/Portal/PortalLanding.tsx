import {
    Grid,
    GridItem,
    HStack,
    VStack,
    Image,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "/Logo.png";
import { useContext } from "react";
import { LoginContext } from "../../contexts/loginContext";
import PortalNavBar from "./PortalNavBar";
import SideBar from "../common/SideBar";
import {
    BiCalendar,
    BiFolder,
    BiFolderOpen,
    BiNote,
    BiUserCircle,
} from "react-icons/bi";
import { Box } from "@chakra-ui/react";
import { roles } from "../../App";

const userSidebarList = [
    {
        name: "Appointments",
        path: "/portal/user/appointments",
        icon: <BiCalendar />,
    },
    {
        name: "Medical Records",
        path: "/portal/user/records",
        icon: <BiFolder />,
    },
    // {
    //     name: "External Records",
    //     path: "/portal/user/externalRecords",
    //     icon: <BiFolderOpen />,
    // },
    {
        name: "Prescriptions",
        path: "/portal/user/prescriptions",
        icon: <BiNote />,
    },
    { name: "Profiles", path: "/portal/user/profiles", icon: <BiUserCircle /> },
];
const hospitalSidebarList = [
    {
        name: "Appointments",
        path: "/portal/hospital/appointments",
        icon: <BiCalendar />,
    },
    {
        name: "Patients",
        path: "/portal/hospital/profiles",
        icon: <BiCalendar />,
    },
];
export const PortalLanding = () => {
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");

    const { pathname } = useLocation();
    console.log(pathname);

    const { accessLevel } = useContext(LoginContext);
    const sidebarList =
        accessLevel >= roles.hospital ? hospitalSidebarList : userSidebarList;

    return (
        <Grid
            color={textColor}
            backgroundColor={bgColor}
            templateAreas={{
                base: `"nav" 
              "main"`,
                md: `"asidenav nav"         
            "aside main"`,
            }}
            templateColumns={{
                base: "100vw",
                md: "240px 1fr",
            }}
            templateRows={"8vh auto"}
        >
            <GridItem
                area="asidenav"
                borderRight={"1px"}
                borderColor="gray.200"
                height={"100vh"}
            >
                <HStack alignItems={"center"} margin={"10px 0 0 20px"}>
                    <Link to="/">
                        <Image src={logo} height={{ base: "6", md: "8" }} />
                    </Link>
                    <VStack alignItems={"flex-start"}>
                        <Text fontWeight={"bold"} fontSize={"medium"}>
                            Heart Care Clinic
                        </Text>
                        {accessLevel >= roles.hospital ? (
                            <Text fontSize={"sm"} marginTop={"-10px"}>
                                Admin
                            </Text>
                        ) : (
                            <Text fontSize={"sm"} marginTop={"-10px"}>
                                User Portal
                            </Text>
                        )}
                    </VStack>
                </HStack>
            </GridItem>
            <GridItem area={"aside"} paddingY={"20px"}>
                <Box marginX={"10px"}>
                    <SideBar items={sidebarList}></SideBar>
                </Box>
            </GridItem>

            <GridItem area="nav">
                <PortalNavBar
                    heading={
                        sidebarList.find((l) => l.path == pathname)?.name || ""
                    }
                />
            </GridItem>
            <GridItem
                area="main"
                padding={"2rem 3rem"}
                // background={"gray.50"}
                height={"100%"}
                overflow={"scroll"}
            >
                <Outlet />
            </GridItem>
        </Grid>
    );
};

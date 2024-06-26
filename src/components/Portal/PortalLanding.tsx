import {
    Grid,
    GridItem,
    HStack,
    VStack,
    Image,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "/Logo.png";
import PortalNavBar from "./PortalNavBar";
import SideBar from "../common/SideBar";

import { BiCalendar, BiFolder, BiNote, BiUserCircle } from "react-icons/bi";
import { Box } from "@chakra-ui/react";
import { getValueByRole } from "../../utilities/getValueByRole";
import useProfiles from "../../hooks/useProfiles";
import { useContext } from "react";
import { AccountContext } from "../../contexts/profileContext";
import { getProfileId, setProfileId } from "../../utilities/helper-service";

export const PortalLanding = () => {
    const { profiles, isLoading } = useProfiles();
    // const { profileId, setProfileId } = useContext(AccountContext);

    const navigate = useNavigate();

    if (!isLoading)
        if (!getProfileId()) {
            if (profiles.length > 0) {
                setProfileId(profiles[0]._id);
            }
        }

    let userSidebarList = [
        { name: "Profiles", path: "/portal/profiles", icon: <BiUserCircle /> },
    ];
    if (getProfileId()) {
        userSidebarList = [
            {
                name: "Appointments",
                path: "/portal/appointments",
                icon: <BiCalendar />,
            },
            {
                name: "Medical Records",
                path: "/portal/records",
                icon: <BiFolder />,
            },
            // {
            //     name: "External Records",
            //     path: "/portal/externalRecords",
            //     icon: <BiFolderOpen />,
            // },
            {
                name: "Prescriptions",
                path: "/portal/prescriptions",
                icon: <BiNote />,
            },
            ...userSidebarList,
        ];
    }
    const hospitalSidebarList = [
        {
            name: "Appointments",
            path: "/portal/appointments",
            icon: <BiCalendar />,
        },
        {
            name: "Patients",
            path: "/portal/profiles",
            icon: <BiUserCircle />,
        },
    ];
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");

    const { pathname } = useLocation();

    const sideBarList = getValueByRole({
        user: userSidebarList,
        hospital: hospitalSidebarList,
    });

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
            templateRows={"8vh 92vh"}
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
                        <Text fontSize={"sm"} marginTop={"-10px"}>
                            {getValueByRole({
                                hospital: "Admin Dashboard",
                                user: "User Portal",
                            })}
                        </Text>
                    </VStack>
                </HStack>
            </GridItem>
            <GridItem area={"aside"} paddingY={"20px"}>
                <Box marginX={"10px"}>
                    <SideBar items={sideBarList} />
                </Box>
            </GridItem>

            <GridItem area="nav" overflow={"hidden"}>
                <PortalNavBar
                    heading={
                        getValueByRole({
                            user: userSidebarList,
                            hospital: hospitalSidebarList,
                        }).find((l) => l.path == pathname)?.name || ""
                    }
                />
            </GridItem>
            <GridItem
                area="main"
                padding={"2rem 3rem"}
                background={"gray.50"}
                overflow={"scroll"}
            >
                <Outlet />
            </GridItem>
        </Grid>
    );
};

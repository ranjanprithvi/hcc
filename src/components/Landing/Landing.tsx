import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export const Landing = () => {
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("gray.50", "gray.700");
    return (
        <Grid
            width="100vw"
            color={textColor}
            templateAreas={`"nav" 
              "main"`}
            templateColumns={"100vw"}
        >
            <GridItem area="nav">
                <NavBar />
            </GridItem>
            <GridItem overflow="scroll">
                <Outlet />
                <Footer></Footer>
            </GridItem>
        </Grid>
    );
};

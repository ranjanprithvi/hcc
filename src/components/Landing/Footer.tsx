import { HStack, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <VStack
            alignItems={"center"}
            width={"100vw"}
            paddingY={"10px"}
            borderTop={"1px solid #cecece"}
        >
            
            <h3>Heart Care Clinic</h3>
            <NavLink to="/">Contact Us</NavLink>

            <HStack>
                <p>&copy;2022 Heart Care Clinic</p>
                <p>&nbsp;• Privacy • Terms • Sitemap</p>
            </HStack>
        </VStack>
    );
}

export default Footer;

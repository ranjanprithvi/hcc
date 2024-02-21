import {
    Accordion as ChakraAccordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import colourPalette from "../../utilities/colour-palette";

export interface AccordionRowData {
    mainContent?: string | ReactNode;
    subContent?: string | ReactNode;
}

interface Props {
    data: AccordionRowData[];
    [key: string]: any;
}

const AccordionTable = ({ data, ...rest }: Props) => {
    return (
        <ChakraAccordion {...rest} allowToggle>
            {data.map((item) => (
                <AccordionItem>
                    <h2>
                        <AccordionButton
                            _expanded={{
                                bg: colourPalette.primaryBg,
                                color: "white",
                            }}
                        >
                            <Box as="span" flex="1" textAlign="left">
                                {item.mainContent}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>{item.subContent}</AccordionPanel>
                </AccordionItem>
            ))}
        </ChakraAccordion>
    );
};

export default AccordionTable;

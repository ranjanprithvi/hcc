import { Heading, Text, Image, VStack, Flex, Button } from "@chakra-ui/react";
import colourPalette from "../../utilities/colour-palette";

function Home() {
    return (
        <Flex flexDirection="column" width={"100vw"}>
            <Flex
                flexDirection={{ base: "column", md: "row" }}
                background={colourPalette.secondaryBg}
                padding="20px"
                alignItems="center"
            >
                <Image src="/doc.png" width="500px" />
                <VStack paddingLeft={{ base: 0, md: "20px" }}>
                    <Heading
                        alignSelf="flex-start"
                        color={colourPalette.primary}
                    >
                        Dr. Gregory House
                    </Heading>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laborum dolores aut culpa nesciunt corporis minus
                    </Text>
                </VStack>
            </Flex>

            <Flex width={"100vw"} justifyContent={"center"}>
                <Flex
                    flexDirection={{ base: "column", md: "row-reverse" }}
                    padding="20px"
                    justifyContent={"center"}
                    alignItems="center"
                    width={{ base: "100vw", md: "80vw" }}
                >
                    <Image src="/location.png" width="500px" />
                    <VStack
                        paddingRight={{ base: 0, md: "20px" }}
                        alignItems="start"
                    >
                        <Heading
                            color={colourPalette.primary}
                            alignSelf="flex-start"
                        >
                            Location
                        </Heading>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Laborum dolores aut culpa nesciunt corporis
                            minus
                        </Text>
                        <a
                            href="https://maps.app.goo.gl/dkofohd1D8ys17359"
                            target="_blank"
                        >
                            <Button
                                size="sm"
                                borderRadius={"2px"}
                                backgroundColor={colourPalette.primary}
                                color={"white"}
                            >
                                Open in Maps
                            </Button>
                        </a>
                    </VStack>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Home;

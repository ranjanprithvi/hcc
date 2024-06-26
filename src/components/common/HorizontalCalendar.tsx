import { Button, HStack, VStack, Text } from "@chakra-ui/react";
import moment from "moment";
import colourPalette from "../../utilities/colour-palette";

interface Props {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

export const HorizontalCalendar = ({
    selectedDate,
    setSelectedDate,
}: Props) => {
    const dates = [
        moment().subtract(6, "days"),
        moment().subtract(5, "days"),
        moment().subtract(4, "days"),
        moment().subtract(3, "days"),
        moment().subtract(2, "days"),
        moment().subtract(1, "days"),
        moment(),
        moment().add(1, "days"),
        moment().add(2, "days"),
        moment().add(3, "days"),
        moment().add(4, "days"),
        moment().add(5, "days"),
        moment().add(6, "days"),
    ];

    return (
        <HStack justifyContent={"space-evenly"}>
            {dates.map((date, index) => (
                <VStack>
                    <Text
                        fontSize="small"
                        fontWeight={
                            moment(new Date()).isSame(date, "day") ? "bold" : ""
                        }
                    >
                        {date.format("ddd")}
                    </Text>
                    <Button
                        size={
                            moment(new Date()).isSame(date, "day") ? "lg" : "sm"
                        }
                        key={index}
                        colorScheme={
                            moment(selectedDate).isSame(date, "day")
                                ? "pink"
                                : "gray"
                        }
                        background={
                            moment(selectedDate).isSame(date, "day")
                                ? colourPalette.primary
                                : "gray.100"
                        }
                        onClick={() => setSelectedDate(date.toDate())}
                        borderRadius={"100px !important"}
                        padding={"0"}
                    >
                        <Text
                            fontSize={
                                moment(new Date()).isSame(date, "day")
                                    ? "x-large"
                                    : "small"
                            }
                        >
                            {date.format("D")}
                        </Text>
                    </Button>
                </VStack>
            ))}
        </HStack>
    );
};

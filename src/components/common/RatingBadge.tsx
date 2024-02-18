import React from "react";
import { Badge } from "@chakra-ui/react";

interface Props {
    rating: number;
}

const RatingBadge = ({ rating }: Props) => {
    const colour =
        rating >= 4
            ? "green"
            : rating >= 3.5
            ? "yellow"
            : rating >= 3
            ? "orange"
            : "red";

    return (
        <Badge
            fontSize={14}
            paddingX={2}
            borderRadius="4px"
            colorScheme={colour}
        >
            {rating}
        </Badge>
    );
};

export default RatingBadge;

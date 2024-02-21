import { Box, GridItem, useToast } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import Form, { Field } from "../../common/Form";

const schema = z.object({
    file: z.any(),
});

type Data = z.infer<typeof schema>;

interface LoginResponse {
    token: string;
}

const MedicalRecordForm = () => {
    const resolver = zodResolver(schema);

    const fields: Field<Data>[] = [
        {
            type: "textInput",
            label: "Upload",
            name: "file",
            inputType: "file",
        },
    ];

    const onSubmit = (data: Data) => {};

    return (
        <GridItem colSpan={2} marginX={5} marginY="auto">
            <Box
                marginX={"auto"}
                marginTop="5%"
                borderColor={"blue.800"}
                borderWidth={"medium"}
                borderRadius={"xl"}
                padding={10}
                maxWidth={"600px"}
            >
                <Form<Data>
                    resolver={resolver}
                    fields={fields}
                    heading={"Upload"}
                    onSubmit={onSubmit}
                />
            </Box>
        </GridItem>
    );
};

export default MedicalRecordForm;

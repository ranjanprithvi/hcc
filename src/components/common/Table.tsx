import {
    Table as ChakraTable,
    TableContainer,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    VStack,
    Spinner,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export interface TableRowData {
    value?: string | number | boolean;
    renderComponent?: () => ReactNode;
}

export interface TableData {
    _id: string;
    rowData: { [key: string]: TableRowData | undefined };
}

interface Props {
    data: TableData[];
    headers: string[];
    fontSize?: string;
    isLoading?: boolean;
    variant?: string;
}

const Table = ({ data, headers, isLoading, variant, ...rest }: Props) => {
    return (
        <TableContainer width="100%">
            <VStack>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <ChakraTable variant={variant}>
                        {/* <TableCaption>{heading}</TableCaption> */}
                        <Thead>
                            <Tr>
                                {headers.map((header) => (
                                    <Th key={header}>{header}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((rowObject) => {
                                return (
                                    <Tr key={rowObject._id}>
                                        {Object.keys(rowObject.rowData).map(
                                            (key) => (
                                                <Td key={key}>
                                                    {rowObject.rowData[key]
                                                        ?.value
                                                        ? rowObject.rowData[key]
                                                              ?.value
                                                        : rowObject.rowData[
                                                              key
                                                          ]?.renderComponent?.()}
                                                </Td>
                                            )
                                        )}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </ChakraTable>
                )}
            </VStack>
        </TableContainer>
    );
};

export default Table;

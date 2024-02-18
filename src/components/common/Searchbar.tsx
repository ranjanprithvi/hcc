import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
    setSearch: (search: string) => void;
    [key: string]: any;
    placeholder?: string;
}

const Searchbar = ({ setSearch, placeholder, ...rest }: Props) => {
    return (
        <InputGroup borderRadius={5} size="sm" {...rest}>
            <InputLeftElement
                pointerEvents="none"
                children={<BsSearch color="gray.600" />}
            />
            <Input
                type="text"
                placeholder={placeholder}
                border="1px solid #949494"
                onChange={_.debounce((e) => setSearch(e.target.value), 500)}
            />
        </InputGroup>
    );
};

export default Searchbar;

import { Box, Menu, MenuItem } from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ColourPaletteContext } from "../../contexts/colourPaletteContext";

interface Props {
    items: { name: string; path: string; icon: JSX.Element }[];
}

const SideBar = ({ items }: Props) => {
    const { primaryColour } = useContext(ColourPaletteContext);
    return (
        <Menu>
            {items.map((item) => (
                <MenuItem
                    icon={item.icon}
                    key={item.name}
                    as={NavLink}
                    to={item.path}
                    _activeLink={{
                        backgroundColor: "pink.100",
                        fontWeight: "bold",
                        color: primaryColour,
                    }}
                    borderRadius={5}
                >
                    {item.name}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default SideBar;

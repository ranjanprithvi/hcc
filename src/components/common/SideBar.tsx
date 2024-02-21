import { Menu, MenuItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import colourPalette from "../../utilities/colour-palette";

interface Props {
    items: { name: string; path: string; icon: JSX.Element }[];
}

const SideBar = ({ items }: Props) => {
    return (
        <Menu>
            {items.map((item) => (
                <MenuItem
                    icon={item.icon}
                    key={item.name}
                    as={NavLink}
                    to={item.path}
                    _activeLink={{
                        backgroundColor: colourPalette.primaryBg,
                        fontWeight: "bold",
                        color: colourPalette.primary,
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

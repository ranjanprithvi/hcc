import { createContext } from "react";

interface IColourPaletteContext {
    primaryColour: string;
    secondaryColour: string;
    secondaryBgColour: string;
}
export const ColourPaletteContext = createContext<IColourPaletteContext>(
    {} as IColourPaletteContext
);

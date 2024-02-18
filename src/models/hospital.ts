import { Doctor } from "./doctor";

export interface Hospital {
    _id: string;
    name: string;
    doctors?: Doctor[] | string[];
}

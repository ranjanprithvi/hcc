import { Hospital } from "./hospital";
import { Profile } from "./profile";

export interface Account {
    _id: string;
    email: string;
    accessLevel: number;
    hospital: Hospital | string;
    profiles: Profile[] | string[];
}

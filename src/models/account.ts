import { Hospital } from "./hospital";
import { Profile } from "./profile";

export interface Account {
    _id: string;
    email: string;
    accessLevel: number;
    sub: string;
    identityId: string;
    hospital: Hospital | string;
    profiles: Profile[] | string[];
}

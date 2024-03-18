import { Doctor } from "./doctor";
import { File } from "./file";
import { Profile } from "./profile";

export interface MedicalRecord {
    _id: string;
    profile: Profile | string;
    doctor: Doctor | string;
    dateOnDocument: Date;
    recordType: string;
    recordName: string;
}

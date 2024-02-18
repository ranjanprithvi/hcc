import { Doctor } from "./doctor";
import { File } from "./file";
import { Profile } from "./profile";

export interface MedicalRecord {
    _id: string;
    profile: Profile | string;
    doctor: Doctor | string;
    dateOnDocument: Date;
    recordName: string;
    recordType: string;
    folderPath: string; // s3 path + record name
    files: File[] | string[];
}

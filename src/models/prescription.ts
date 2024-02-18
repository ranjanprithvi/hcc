import { Doctor } from "./doctor";
import { File } from "./file";
import { Profile } from "./profile";
import { Specialization } from "./specialization";

export interface Prescription {
    _id: string;
    profile: Profile | string;
    doctor: Doctor | string;
    dateOnDocument: Date;
    content?: string;
    folderPath: string; // s3 path + record name
    files: File[] | string[];
}

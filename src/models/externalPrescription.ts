import { Doctor } from "./doctor";
import { File } from "./file";
import { Profile } from "./profile";
import { Specialization } from "./specialization";

export interface ExternalPrescription {
    _id: string;
    profile: Profile | string;
    doctor: string;
    hospital: string;
    specialization: Specialization;
    dateOnDocument: Date;
    folderPath: string; // s3 path + record name
    files: File[] | string[];
}

import { Appointment } from "./appointment";
import { Hospital } from "./hospital";
import { Specialization } from "./specialization";

export type Doctor = {
    _id: string;
    name: string;
    hospital: Hospital | string;
    specialization: Specialization;
    qualifications: String;
    practicingSince: Date;
    appointments?: Appointment[] | string[];
};

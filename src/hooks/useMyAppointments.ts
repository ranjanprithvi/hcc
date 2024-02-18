import { Appointment, MyAppointmentsQuery } from "../models/appointment";
import useData from "./generic/useData";

const useMyAppointments = (query?: MyAppointmentsQuery, deps?: any[]) => {
    const {
        data: appointments,
        setData: setAppointments,
        error,
        setError,
        isLoading,
    } = useData<Appointment>("/appointments/my", query, deps);
    return { appointments, setAppointments, error, setError, isLoading };
};

export default useMyAppointments;

import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import LoginForm from "./components/Account/LoginForm";
import Home from "./components/Landing/Home";
import Facilities from "./components/Landing/Facilities";
import UserAppointments from "./components/Portal/Appointments/Appointments";
import Profiles from "./components/Portal/Profiles/Profiles";
import Prescriptions from "./components/Portal/Prescriptions/Prescriptions";
import AllProfiles from "./components/Portal/Profiles/AllProfiles";
import { AppointmentsDashboard } from "./components/Portal/Appointments/AppointmentsDashboard";
import { Landing } from "./components/Landing/Landing";
import { PortalLanding } from "./components/Portal/PortalLanding";
import Records from "./components/Portal/Medical Records/MedicalRecords";
import CreateSlots from "./components/Portal/Appointments/CreateSlots";
import UserBookAppointment from "./components/Portal/Appointments/BookAppointment";
import ProfileForm from "./components/Portal/Profiles/ProfileForm";
import { ProfileOverview } from "./components/Portal/Profiles/ProfileOverview";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MedicalRecordForm from "./components/Portal/Medical Records/MedicalRecordForm";

const Routes = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<Landing />}>
                <Route path="/" element={<Home />} />
                <Route path="/facilities" element={<Facilities />} />
            </Route>
            <Route
                path="/portal"
                element={<ProtectedRoute user={<PortalLanding />} />}
            >
                <Route path="profiles/:id" element={<ProfileForm />} />
                <Route
                    path="profileOverview/:id"
                    element={<ProfileOverview />}
                />

                <Route
                    path="appointments"
                    element={
                        <ProtectedRoute
                            hospital={<AppointmentsDashboard />}
                            user={<UserAppointments />}
                        ></ProtectedRoute>
                    }
                />
                <Route
                    path="appointments/book"
                    element={
                        <ProtectedRoute
                            user={<UserBookAppointment />}
                        ></ProtectedRoute>
                    }
                />
                <Route
                    path="records"
                    element={<ProtectedRoute user={<Records />} />}
                />
                <Route
                    path="medicalRecords/:id"
                    element={<ProtectedRoute user={<MedicalRecordForm />} />}
                />
                <Route
                    path="profiles"
                    element={
                        <ProtectedRoute
                            user={<Profiles />}
                            hospital={<AllProfiles />}
                        />
                    }
                />
                <Route
                    path="prescriptions"
                    element={<ProtectedRoute user={<Prescriptions />} />}
                />
                <Route
                    path="appointments/create"
                    element={
                        <ProtectedRoute
                            hospital={<CreateSlots />}
                        ></ProtectedRoute>
                    }
                />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
        </ReactRoutes>
    );
};

export default Routes;

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
import BookAppointmentSlot from "./components/Portal/Appointments/BookAppointmentSlot";
import ProfileForm from "./components/Portal/Profiles/ProfileForm";
import { ProfileOverview } from "./components/Portal/Profiles/ProfileOverview";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MedicalRecordForm from "./components/Portal/Medical Records/MedicalRecordForm";
import ExternalRecordForm from "./components/Portal/Medical Records/ExternalRecordForm";
import ExternalPrescriptionForm from "./components/Portal/Prescriptions/ExternalPrescriptionForm";
import PrescriptionForm from "./components/Portal/Prescriptions/PrescriptionForm";
import AssignProfileToSlot from "./components/Portal/Appointments/ChooseProfileForm";
import LinkAccountForm from "./components/Portal/Profiles/LinkAccountForm";

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
                    path="appointments/book/:profileId?"
                    element={
                        <ProtectedRoute
                            user={<BookAppointmentSlot />}
                        ></ProtectedRoute>
                    }
                />
                <Route
                    path="appointments/reschedule/:oldId?"
                    element={
                        <ProtectedRoute
                            user={<BookAppointmentSlot />}
                        ></ProtectedRoute>
                    }
                />
                <Route
                    path="appointments/assignToProfile/:id?"
                    element={
                        <ProtectedRoute
                            user={<AssignProfileToSlot />}
                        ></ProtectedRoute>
                    }
                />
                <Route
                    path="appointments/create"
                    element={
                        <ProtectedRoute
                            hospital={<CreateSlots />}
                        ></ProtectedRoute>
                    }
                />

                <Route
                    path="records"
                    element={<ProtectedRoute user={<Records />} />}
                />
                <Route
                    path="medicalRecords/:id/:profileId?"
                    element={<ProtectedRoute user={<MedicalRecordForm />} />}
                />
                <Route
                    path="externalRecords/:id"
                    element={<ProtectedRoute user={<ExternalRecordForm />} />}
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
                <Route path="profiles/:id" element={<ProfileForm />} />
                <Route path="profiles/link/:id" element={<LinkAccountForm />} />
                <Route
                    path="profileOverview/:id"
                    element={<ProfileOverview />}
                />

                <Route
                    path="prescriptions"
                    element={<ProtectedRoute user={<Prescriptions />} />}
                />
                <Route
                    path="prescriptions/:id/:profileId?"
                    element={<ProtectedRoute user={<PrescriptionForm />} />}
                />
                <Route
                    path="externalPrescriptions/:id"
                    element={
                        <ProtectedRoute user={<ExternalPrescriptionForm />} />
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

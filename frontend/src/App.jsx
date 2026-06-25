import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { getMe } from "./redux/slices/authSlice";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./components/client/CreateProject";
import EditProject from "./pages/client/EditProject";
import Certificates from "./pages/Certificates";
import Settings from "./pages/Settings";
import Payments from "./pages/Payments";
import VerifyCertificate from "./pages/VerifyCertificate";
import PublicProfile from "./pages/PublicProfile";
import HowItWorks from "./pages/HowItWorks";
import FooterPayments from "./pages/FooterPayments";
import FooterCertificates from "./pages/FooterCertificates";
import FooterBuildProfile from "./pages/FooterBuildProfile";
import FooterTrackEarnings from "./pages/FooterTrackEarnings";
import FooterPostProject from "./pages/FooterPostProject";
import FooterHireTalent from "./pages/FooterHireTalent";
import FooterPricing from "./pages/FooterPricing";
import FooterSuccessStories from "./pages/FooterSuccessStories";
import FooterTerms from "./pages/FooterTerms";
import FooterPrivacyPolicy from "./pages/FooterPrivacyPolicy";
import FooterCookies from "./pages/FooterCookies";
import FooterBrowseProjects from "./pages/FooterBrowseProjects";
import FooterDashboard from "./pages/FooterDashboard";
import FooterMessages from "./pages/FooterMessages";
import FooterAboutUs from "./pages/FooterAboutUs";
import FooterContact from "./pages/FooterContact";
import Messages from "./pages/Messages";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) dispatch(getMe());
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route
            path="/verify-certificate/:certificateId"
            element={<VerifyCertificate />}
          />
          <Route path="/profile/:userId" element={<PublicProfile />} />
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/create"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id/edit"
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <Certificates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/footer-payments" element={<FooterPayments />} />
          <Route path="/footer-certificates" element={<FooterCertificates />} />
          <Route path="/footer-profile" element={<FooterBuildProfile />} />
          <Route path="/footer-earnings" element={<FooterTrackEarnings />} />
          <Route path="/footer-post-project" element={<FooterPostProject />} />
          <Route path="/footer-hire" element={<FooterHireTalent />} />
          <Route path="/footer-pricing" element={<FooterPricing />} />
          <Route
            path="/footer-success-stories"
            element={<FooterSuccessStories />}
          />
          <Route path="/footer-terms" element={<FooterTerms />} />
          <Route path="/footer-privacy" element={<FooterPrivacyPolicy />} />
          <Route path="/footer-cookies" element={<FooterCookies />} />
          <Route
            path="/footer-browse-projects"
            element={<FooterBrowseProjects />}
          />
          <Route path="/footer-dashboard" element={<FooterDashboard />} />
          <Route path="/footer-messages" element={<FooterMessages />} />
          <Route path="/about" element={<FooterAboutUs />} />
          <Route path="/contact" element={<FooterContact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#111827",
            color: "#fff",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#6366f1", secondary: "#fff" } },
        }}
      />
    </div>
  );
};

export default App;

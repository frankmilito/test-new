import { ProtectedRoute } from "../components/Protected-route";
import Dashboard from "../pages/dashboard";
import Survey from "../pages/survey";
import SurveyDetails from "../pages/survey/SurveyDetails";
import UserOnboarding from "../pages/userOnboarding";
import { Layout } from "./Layout";

export default function privateRoutes() {
  return {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/onboarding",
        element: <UserOnboarding />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/survey",
        element: <Survey />,
      },
      {
        path: "/survey/:id",
        element: <SurveyDetails />,
      },
    ],
  };
}

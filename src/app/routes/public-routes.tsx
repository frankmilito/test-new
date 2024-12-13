import { AuthRoute } from "../components/Protected-route";

import { Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import Login from "../pages/login";
import Register from "../pages/register";
import RegistrationSuccess from "../components/success/RegistrationSuccess";
import LoginSuccess from "../components/success/LoginSuccess";

export default function routes() {
  return {
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-email",
        element: <RegistrationSuccess />,
      },
      {
        path: "/login-link",
        element: <LoginSuccess />,
      },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  };
}

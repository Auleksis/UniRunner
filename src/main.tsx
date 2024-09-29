import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import s from "./App.module.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";
import AboutPage from "./pages/AboutPage/AboutPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import RatingsPage from "./pages/RatingPage/RatingPage.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: (
      <h2>Ooops. It seems this page is still in develepment {":)"}</h2>
    ),
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <AboutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/ratings",
        element: <RatingsPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

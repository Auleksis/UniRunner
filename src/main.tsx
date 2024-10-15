import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";
import AboutPage from "./pages/AboutPage/AboutPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import RatingsPage from "./pages/RatingPage/RatingPage.tsx";
import { Provider } from "react-redux";
import store from "../store.tsx";

const router = createBrowserRouter([
  {
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
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
        element: <AboutPage />,
      },
      {
        path: "/ratings",
        element: <RatingsPage />,
      },
      {
        path: "/profile/*",
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

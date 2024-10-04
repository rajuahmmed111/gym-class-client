import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/SignUp/Registration";
import TrainerClasses from "../pages/trainer/classes";
import Admin from "../pages/Admin/admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "trainerClasses",
        element: <TrainerClasses />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
    ],
  },
]);

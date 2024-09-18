import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./Context/Context";
import * as ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Default from "./pages/404";
import Layout from "./Utilities/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/auth/Register";
import Protected from "./Utilities/Protected";
import Contact from "./pages/Contact";
import Favourite from "./pages/Favourite";
import Single from "./pages/Single";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/posts",
          element: <Protected roles={["user", "admin"]} element={<Posts />} />,
        },
        {
          path: "/post/:id",
          element: <Protected roles={["user", "admin"]} element={<Single />} />,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/favourite",
          element: <Protected roles={["user"]} element={<Favourite />} />,
        },
        {
          path: "/admin",
          element: <Protected roles={["admin"]} element={<Home />} />,
        },
      ],
    },
    {
      path: "*",
      element: <Default />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

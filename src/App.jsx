import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import ErrorElement from "./ui/ErrorElement";
import User from "./pages/User";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <AppLayout props={<ErrorPage />}/>,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/user/:id",
        element:<User />,
        errorElement: <ErrorElement />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

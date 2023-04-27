import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";
import LayoutAuth from "./components/LayoutAuth";
import LoginForm from "./components/inputForms/LoginForm";
import RegisterForm from "./components/inputForms/RegisterForm";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PrivateRoutes />}>
          <Route element={<Dashboard />} index />
        </Route>
        <Route
          element={
            <LayoutAuth>
              <RegisterForm />
            </LayoutAuth>
          }
          path="/register"
        />
        <Route
          element={
            <LayoutAuth>
              <LoginForm />
            </LayoutAuth>
          }
          path="/login"
        />
      </>
    )
  );
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import LayoutAuth from "./components/LayoutAuth";
import RegisterForm from "./components/inputForms/RegisterForm";
import LoginForm from "./components/inputForms/LoginForm";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PrivateRoutes />}>
          <Route element={<Dashboard />} index />
        </Route>
        <Route path="auth/*" element={<LayoutAuth />}>
          <Route index path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route />
        </Route>
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

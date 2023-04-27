import { toast } from "react-hot-toast";
import { useLogoutMutation } from "../api/user/userApi";
import { removeAuth } from "../store/features/authSlice";
import { removeUser } from "../store/features/userSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { email, name, phoneNo, img } = useAppSelector(state => state.user);
  const [logout] = useLogoutMutation();
  async function logoutHandler() {
    try {
      await logout();
      dispatch(removeUser());
      dispatch(removeAuth());
    } catch (err) {
      toast.error("internal server error");
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <nav className="fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <button className="flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJWPthCXOJJwD1oXzgj45swyuFjj8kSA_dr3PTugh8r7P99MtVapEpmzgFeVFmSwTIJiQ&usqp=CAU"
              className="h-8 mr-3"
              alt="User management system"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Dashboard
            </span>
          </button>
          <div className="flex md:order-2">
            <button
              type="button"
              className="px-4 py-2 mr-3 text-sm font-medium text-center text-white rounded-lg bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div>
        <div className="w-64 max-w-sm py-12 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-24 h-24 mb-3 rounded-full shadow-lg"
              src={img}
              alt="user image"
            />
            <h4 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {name}
            </h4>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {email}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {phoneNo}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

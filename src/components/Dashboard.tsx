import { removeAuth } from "../store/features/authSlice";
import { removeUser } from "../store/features/userSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { email, name, phoneNo } = useAppSelector(state => state.user);
  function logoutHandler() {
    dispatch(removeUser());
    dispatch(removeAuth());
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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
              className="text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div>
        <div className="w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg py-12">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
              src="https://img.favpng.com/12/15/21/computer-icons-avatar-user-profile-recommender-system-png-favpng-HaMDUPFH1etkLCdiFjgTKHzAs.jpg"
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

import { removeAuth } from "../store/features/authSlice";
import { removeUser } from "../store/features/userSlice";
import { useAppDispatch } from "../store/store";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  function logoutHanlder() {
    dispatch(removeUser());
    dispatch(removeAuth());
  }
  return (
    <>
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
              onClick={logoutHanlder}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Dashboard;

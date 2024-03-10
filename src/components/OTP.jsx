import {Link, useNavigate} from "react-router-dom";
import {verifyOtp} from "../api/userData.js";
import {toast, Toaster} from "react-hot-toast";
import {useUserStore} from "../store/User.js";

export const OTP = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp(user.email, e.target.otp.value);
      if (res.status === "success") {
        navigate("/login");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (e) {
        toast.error("Something went wrong");
    }

  };

  return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div><Toaster/></div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Check your email for OTP
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your OTP
                  </label>
                  <input
                      type="text"
                      name="otp"
                      id="otp"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="123456"
                  />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Verify OTP
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Go back?{" "}
                  <Link
                      to="/create-account"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};
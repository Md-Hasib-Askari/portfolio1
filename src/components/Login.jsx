import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {authenticate, login} from "../api/userData.js";
import {toast, Toaster} from "react-hot-toast";
import {useUserStore} from "../store/User.js";

export const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      try {
        const data = await login(values);
        if (data.token) {
          document.cookie = `token=${data.token}; SameSite=Strict; Secure; path=/; max-age=3600;`;
          const res = await authenticate();
          if (res.status === "success") {
            setUser({
                status: 'active',
            });
            navigate('/products');
          }
        } else {
          toast.error('Invalid email or password');
        }
      } catch (e) {
        toast.error('Something went wrong');
      }
    }
  });

  return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div><Toaster/></div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                  <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      {...formik.getFieldProps('email')}
                  />
                  {
                    formik.touched.email && formik.errors.email ? (
                      <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
                    ) : null
                  }
                </div>
                <div>
                  <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...formik.getFieldProps('password')}
                  />
                  {
                    formik.touched.password && formik.errors.password ? (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
                    ) : null
                  }
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
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
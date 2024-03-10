import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {generateOtp, register} from "../api/userData.js";
import {useUserStore} from "../store/User.js";
import {toast, Toaster} from "react-hot-toast";

export const Signup = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        terms: false
    },
    validationSchema: Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phone: Yup.string()
            .required('Required')
            .min(11, 'Mobile number must be at least 11 digits')
            .matches(/^(?:\+?88)?01[3-9]\d{8}$/, 'Provide a valid phone number')
      ,
        password: Yup.string().required('Required')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Must contain at least one letter and one number')
            .min(6, 'Must be at least 6 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
    }),
    onSubmit: async (values) => {
      const {name, email, phone, password} = values;
      const res = await register({name, email, phone, password});
      setUser({name, email, phone, password});
      if (res.data) {
        toast.success('Please check your email for the OTP');
        await generateOtp(email);
        navigate(`/otp`);
      } else {
        navigate('/login');
      }
    }
  })


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div><Toaster/></div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (

                    <div className="text-sm text-red-500 mt-1">{formik.errors.name}</div>

                ) : null}
              </div>
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
                {formik.touched.email && formik.errors.email ? (

                    <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>

                ) : null}
              </div>
              <div>
                <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your phone
                </label>
                <input
                    type="text"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="(+880) 1234567890"
                    {...formik.getFieldProps('phone')}
                />
                {formik.touched.phone && formik.errors.phone ? (

                    <div className="text-sm text-red-500 mt-1">{formik.errors.phone}</div>

                ) : null}
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
                {formik.touched.password && formik.errors.password ? (

                    <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>

                ) : null}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps('confirmPassword')}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (

                    <div className="text-sm text-red-500 mt-1">{formik.errors.confirmPassword}</div>

                ) : null}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    {...formik.getFieldProps('terms')}
                  />

                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>

                </div>
              </div>
              {formik.touched.terms && formik.errors.terms ? (

                  <div className="text-sm text-red-500">{formik.errors.terms}</div>

              ) : null}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

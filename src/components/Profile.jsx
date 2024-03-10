import {Dropzone} from "./Dropzone.jsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getUser, updateUser} from "../api/userData.js";
import {useEffect, useState} from "react";
import {useUserStore} from "../store/User.js";
import {toast, Toaster} from "react-hot-toast";

export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useUserStore((state) => ({user: state.user, setUser: state.setUser}));
  const [userForm, setUserForm] = useState({
    profileImg: null,
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    document.title = "Profile | Awesome App";
    (async () => {
        const res = await getUser();
        if (res.status === 'success') {
          setUserForm(res.data);
        }
    })();
  }, []);

  useEffect(() => {
    const profileImg = userForm.profileImg ? userForm.profileImg : user.profileImg;
    setUser({...user, profileImg});
    formik.setValues({
      profileImg: user.profileImg,
      name: userForm.name,
      email: userForm.email,
      phone: userForm.phone,
    })
    setLoading(false);
  }, [userForm]);

  const formik = useFormik({
    initialValues: {
      profileImg: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
        profileImg: Yup.string(),
        name: Yup.string(),
        email: Yup.string().email('Invalid email address'),
        phone: Yup.string().matches(/^[0-9]+$/, 'Invalid phone number'),
        password: Yup.string().min(6, 'Must be at least 6 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Must contain at least one letter and one number'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      const {confirmPassword, ...rest} = values;
      try {
        const res = await updateUser({...rest, profileImg: user.profileImg});
        if (res.status === 'success') {
          toast.success('Profile updated successfully');
        } else {
          toast.error('Failed to update profile');
        }
      } catch (e) {
        toast.error('Failed to update profile');
      }
    },
  });

  return loading ? (
          <div>Loading...</div>
      ) :  (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div><Toaster/></div>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Profile
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                  <Dropzone image={userForm.profileImg === undefined ? userForm.profileImg : null}/>
                  <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="your name"
                        {...formik.getFieldProps('name')}
                    />
                    {
                        formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
                        ) : null
                    }
                  </div>
                  <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        disabled
                        className="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="*************"
                        {...formik.getFieldProps('email')}
                    />
                    {
                      formik.touched.email && formik.errors.email ? (
                          <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                      ) : null
                    }
                  </div>
                  <div>
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="*************"
                        {...formik.getFieldProps('phone')}
                    />
                    {
                      formik.touched.phone && formik.errors.phone ? (
                          <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="*************"
                        {...formik.getFieldProps('password')}
                    />
                    {
                      formik.touched.password && formik.errors.password ? (
                          <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                      ) : null
                    }
                  </div>
                  <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="*************"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {
                      formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                          <div className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</div>
                      ) : null
                    }
                  </div>

                  <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )
};
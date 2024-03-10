import React from "react";
import hamburgerIcon from "../assets/icons/hamburger_menu.svg";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useUserStore} from "../store/User.js";

const clearAllCookies = () => {
  const cookies = document.cookie.split(';');

  // Iterate over each cookie and set its expiry time to a past date
  cookies.forEach(cookie => {
    const cookieParts = cookie.split('=');
    const cookieName = cookieParts[0].trim();
    const time = new Date(0).toString();
    document.cookie = `${cookieName}=; expires=${time};`;
  });
};

export default function Navbar() {
  const {user, logout} = useUserStore((state) => ({user: state.user, logout: state.logout}));
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearAllCookies();
    navigate('/');
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
            to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Awesome App
          </span>
        </Link>
        <div className="flex gap-3 items-center justify-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          {
            user.status !== 'active' ? (
                <>
                  <Link
                      to="/login"
                      className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    Login
                  </Link>
                  <Link
                      to="/create-account"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                  >
                    Create Account
                  </Link>
                </>

            ) : (
                <>
                  <Link
                      to="/profile"
                      className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      id="user-menu-button"
                      aria-expanded="false"
                      data-dropdown-toggle="user-dropdown"
                      data-dropdown-placement="bottom"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="w-8 h-8 rounded-full"
                        src={user.profileImg ? user.profileImg : "https://i.pravatar.cc/300"}
                        alt="user photo"
                    />
                  </Link>
                  <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </>
            )

          }

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <img src={hamburgerIcon} alt="Hamburger Menu" />
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
              {
                user.status === 'active' && <li>
                 <NavLink
                      to="/products"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Products
                  </NavLink>
                </li>
              }
          </ul>
        </div>
      </div>
    </nav>
  );
}

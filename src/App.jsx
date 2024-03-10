import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home-page.jsx";
import Navbar from "./components/Navbar.jsx";
import {Footer} from "./components/Footer.jsx";
import {Login} from "./components/Login.jsx";
import {Signup} from "./components/Signup.jsx";
import {OTP} from "./components/OTP.jsx";
import {Profile} from "./components/Profile.jsx";
import {Products} from "./pages/Products.jsx";
import {PrivateRoute, PublicRoute} from "./components/PrivateRoute.jsx";
import {NotFound} from "./components/NotFound.jsx";
import {useUserStore} from "./store/User.js";
import {useEffect, useState} from "react";
import axios from "axios";
const App = () => {
    const setUser = useUserStore((state) => state.setUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='));
            if (token) {
                const response = await axios.get('https://hsb-ecom-backend.vercel.app/api/user', {
                    withCredentials: true,
                    headers: {
                        'Authorization': token.split('=')[1]
                    }
                });
                if (response.data.status === 'success') {
                    setUser({
                        profileImg: response.data.data.profileImg,
                        status: 'active',
                    });
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        })();

    }, [])

    return (
        <>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="" element={<PrivateRoute/>}>
                                <Route path="products" element={<Products/>}/>
                                <Route path="profile" element={<Profile/>}/>
                            </Route>
                            <Route path="" element={<PublicRoute/>}>
                                <Route path="login" element={<Login/>}/>
                                <Route path="create-account" element={<Signup/>}/>
                                <Route path="otp" element={<OTP/>}/>
                            </Route>
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                )
            }
        </>
    );
};

export default App;
import axios from "axios";

axios.defaults.baseURL = "https://hsb-ecom-backend.vercel.app/api";
axios.AxiosHeaders = {
    "Content-Type": "application/json",
    "Cookie": `token=${document.cookie}`,
}
export const register = async (data) => {
    const {name, email, phone, password} = data;
    try {
        const response = await axios.post("/register", {
            name,
            email,
            phone,
            password
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post("/login", data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const generateOtp = async (email) => {
    try {
        const response = await axios.get(`/otp/${email}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const verifyOtp = async (email, otp) => {
    try {
        const response = await axios.get(`/verify/${email}/${otp}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const authenticate = async () => {
    try {
        const response = await axios.get("/authenticate",
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Cookie": document.cookie,
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const updateUser = async (data) => {
    try {
        const response = await axios.post("/update-user", data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Cookie": document.cookie,
            }


        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get("/user", {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Cookie": document.cookie,
            }

        });
        return response.data;
    } catch (error) {
        return error;
    }
}

/*
* router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/otp/:email', UserController.generateOtp);
router.get('/verify/:email/:otp', UserController.verifyOtp);
router.get('/user', Auth, UserController.getUser);

router.get('/products', Auth, ProductController.getProducts);
router.get('/products/:id', Auth, ProductController.getProduct);
router.post('/add-product', Auth, ProductController.createProduct);
router.post('/update-product/:id', Auth, ProductController.updateProduct);
router.get('/delete-product/:id', Auth, ProductController.deleteProduct);
* */
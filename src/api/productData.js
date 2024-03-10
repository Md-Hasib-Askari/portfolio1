import axios from "axios";

axios.defaults.url = "https://hsb-ecom-backend.vercel.app/api";
export const getProducts = async () => {
    try {
        return await axios.get(`/products`, {
            withCredentials: true,
            headers: {
                "Cookie": document.cookie,
            }
        });
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const createProduct = async (product, id = null) => {
    try {
        if (id) {
            return await axios.post(`/update-product/${id}`, product, {
                withCredentials: true,
                headers: {
                    "Cookie": document.cookie,
                }
            });
        }
        return await axios.post(`/add-product`, product, {
            withCredentials: true,
            headers: {
                "Cookie": document.cookie,
            }
        });
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const deleteProduct = async (id) => {
    try {
        return await axios.get(`/delete-product/${id}`, {
            withCredentials: true,
            headers: {
                "Cookie": document.cookie,
            }
        });
    } catch (e) {
        console.log(e);
        return null;
    }

}

/*
    router.get('/products', Auth, ProductController.getProducts);
    router.get('/products/:id', Auth, ProductController.getProduct);
    router.post('/add-product', Auth, ProductController.createProduct);
    router.post('/update-product/:id', Auth, ProductController.updateProduct);
    router.get('/delete-product/:id', Auth, ProductController.deleteProduct);
*/
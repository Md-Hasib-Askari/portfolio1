import {useEffect} from "react";
import {ProductDropzone} from "../ProductDropzone.jsx";
import {useFormik} from "formik";
import {toast, Toaster} from "react-hot-toast";
import {createProduct} from "../../api/productData.js";
import {useProductStore} from "../../store/Product.js";

export const AddProductModal = () => {
  const {formData, openForm, setOpenForm, products, setProducts} = useProductStore((state) => ({
    formData: state.formData,
    setFormData: state.setFormData,
    openForm: state.openForm,
    setOpenForm: state.setOpenForm,
    products: state.products,
    setProducts: state.setProducts,
  }));

  useEffect(() => {
    for (let formDataKey in formData) {
      if (formData[formDataKey] !== "") {
        formik.setFieldValue(formDataKey, formData[formDataKey]);
      }
    }
  }, [formData]);

  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      brand: "",
      category: "",
      description: "",
      image: null
    },
    onSubmit: async (values) => {
      let res;
      try {
        if (formData._id) {
          res = await createProduct({
            name: values.name,
            brand: values.brand,
            category: values.category,
            description: values.description,
            image: values.image
          }, formData._id);
        } else {
          res = await createProduct({
            name: values.name,
            brand: values.brand,
            category: values.category,
            description: values.description,
            image: values.image
          });
        }
        if (res.status === 200) {
          toast.success(`Product ${formData._id ? "updated" : "created"} successfully`);
          if (formData._id) {
            const index = products.findIndex((product) => product._id === formData._id);
            const newProducts = [...products];
            newProducts[index] = values;
            setProducts(newProducts);
          } else {
            setProducts([...products, res.data.data]);
          }
          formik.resetForm();
          setOpenForm(!openForm);
        } else {
            toast.error(`Failed to ${formData._id ? "updated" : "created"} product`);
        }
      } catch (e) {
        toast.error("Failed to fetch product");
      }
    }
  });

  return (
    <>
      <div><Toaster/></div>
      <div
        className={`${openForm ? "backdrop-blur-md" : "hidden"} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative rounded-lg shadow bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
              <h3 className="text-lg font-semibold text-white">
                {name ? "Update Product" : "Create New Product"}
              </h3>
              <button
                type="button"
                className="text-white bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => setOpenForm(!openForm)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={formik.handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Type product name"
                    {...formik.getFieldProps("name")}
                  />
                </div>
                <div className="col-span-2">
                  <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-white"
                  >
                    Brand
                  </label>
                  <input
                      type="text"
                      id="brand"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Type Brand name"
                      {...formik.getFieldProps("brand")}
                  />
                </div>
                <div className="col-span-2">
                  <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-white"
                  >
                    Category
                  </label>
                  <input
                      type="text"
                      id="category"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Type category"
                      {...formik.getFieldProps("category")}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm  rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write product description here"
                    {...formik.getFieldProps("description")}
                  ></textarea>
                </div>
              </div>
              <ProductDropzone />
              <button
                type="submit"
                className="mt-3 text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {
                    formData.name ? "Update" : "Create"
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

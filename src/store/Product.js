import {create} from "zustand";

export const useProductStore = create((set) => ({
    openForm: false,
    formData: {
        name: "",
        description: "",
        category: "",
        brand: "",
        image: ""
    },
    products: [{
        _id: "",
        name: "",
        description: "",
        category: "",
        brand: "",
        image: ""
    }],
    setOpenForm: (open) => set({openForm: open}),
    setFormData: (data) => set({formData: data}),
    setProducts: (products) => set({products}),
}));
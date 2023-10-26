import { internshipTransport } from "../../config/http/transport";

const product = {
    getListProduct: (data) => {
        let url = '';
        if (data[0] != undefined && data[1] != undefined) {
            if (data[2] != undefined && data[3] != undefined) {

                url = `/api/products?name=${data[2]}&type_id=${data[3]}&no=${data[0]}&limit=${data[1]}`;
            } else if (data[2] == undefined && data[3] == undefined) {
                url = `/api/products?name=&type_id=&no=${data[0]}&limit=${data[1]}`;
            } else if (data[2] == undefined) {
                data[2] = '';
                url = `/api/products?name=&type_id=${data[3]}&no=${data[0]}&limit=${data[1]}`;
            } else if (data[3] == undefined) {
                data[3] = '';
                url = `/api/products?name=${data[2]}&type_id=&no=${data[0]}&limit=${data[1]}`;
            }
        }
        return internshipTransport.get(url);
    },
    getProductById: (id) => {
        const url = `/api/products/${id}`;
        return internshipTransport.get(url);
    },
    getProductsForImport: (id) => {
        const url = `/api/products/import`;
        return internshipTransport.get(url);
    },
    getProductByItemId: (id) => {
        const url = `/api/products/items/${id}`;
        return internshipTransport.get(url);
    },
    createProduct: (data) => {
        const url = `/api/products`;
        return internshipTransport.post(url, data);
    },
    createImport: (data) => {
        const url = `/api/products/import`;
        return internshipTransport.post(url, data);
    },
    getCart: () => {
        const url = `/api/carts`;
        return internshipTransport.get(url);
    },
    createItem: (data) => {
        const url = `/api/items`;
        return internshipTransport.post(url, data);
    },
    updateItem: (data) => {
        const url = `/api/items/${data[0]}`;
        return internshipTransport.put(url, data[1]);
    },
    deleteItem: (id) => {
        const url = `/api/items/${id}`;
        return internshipTransport.post(url);
    },
    updateSize: (data) => {
        const url = `/api/products/size/${data[0]}`;
        return internshipTransport.put(url, data[1]);
    },
    updatePrice: (data) => {
        console.log(data)
        const url = `/api/products/price/${data[0]}`;
        return internshipTransport.put(url, data[1]);
    },
    getDiscounts: () => {
        const url = `/api/products/discount`;
        return internshipTransport.get(url);
    },
    createDiscount: (data) => {
        const url = `/api/products/discount`;
        return internshipTransport.post(url, data);
    },
    updateDiscount: (data) => {
        const url = `/api/products/discount/${data[0]}`;
        return internshipTransport.put(url, data[1]);
    },

};

export default product;
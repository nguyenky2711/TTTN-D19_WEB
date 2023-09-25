import { internshipTransport } from "../../config/http/transport";

const cart = {
    getCart: (data) => {
        let url = '';
        if (data[0] != undefined && data[1] != undefined) {

            url = `/api/carts?no=${data[0]}&limit=${data[1]}`;
        } else {
            url = `/api/carts`;
        }
        return internshipTransport.get(url);
    },
    addProductToCart: (data) => {
        const url = `/api/carts`;
        return internshipTransport.post(url, data);
    },
    deleteProductFromCart: (id) => {
        const url = `/api/carts?product_id=${id}`;
        return internshipTransport.delete(url);
    },
    updateQuantity: (data) => {
        const url = `/api/carts`;
        return internshipTransport.put(url, data);
    },


};

export default cart;
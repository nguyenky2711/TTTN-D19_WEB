import { internshipTransport } from "../../config/http/transport";

const order = {
    getPayments: () => {
        const url = `/api/orders/payment`;
        return internshipTransport.get(url);
    },
    getPaymentByID: (id) => {
        const url = `/api/orders/payment/${id}`;
        return internshipTransport.get(url);
    },
    getDiscounts: () => {
        const url = `/api/orders/discount`;
        return internshipTransport.get(url);
    },
    getDiscountByID: (id) => {
        const url = `/api/orders/discount/${id}`;
        return internshipTransport.get(url);
    },
    getOrders: (data) => {
        let url = ''
        if (data[0] != undefined && data[1] != undefined) {
            url = `/api/orders?status_id=&no=${data[0]}&limit=${data[1]}`;
        } else {
            url = `/api/orders?status_id=`;
        }
        // const url = `/ api / orders ? status_id = ${ data[2] } `;
        return internshipTransport.get(url);
    },
    // getOrdersByUser: (data) => {
    //     if (data[1] == undefined) {
    //         data[1] = ''
    //     }
    //     const url = `/ api / orders /? status_id = ${ data[1] } `;
    //     return internshipTransport.get(url);
    // },
    getOrderDetail: (data) => {
        let url = '';
        if (data[0] != undefined && data[1] != undefined && data[0] != undefined) {

            url = `/api/orders/${data[0]}?no=${data[1]}&limit=${data[2]}`;
        }
        return internshipTransport.get(url);
    },
    creatOrder: (data) => {
        const url = `/api/orders`;
        return internshipTransport.post(url, data);
    },
    changeStatusOrder: (data) => {
        const url = `api/orders/${data.orderId}?status_id=${data.statusId}`;
        return internshipTransport.put(url);
    }

};

export default order;
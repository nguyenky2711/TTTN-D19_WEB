import { internshipTransport } from "../../config/http/transport";
const manage = {
    getUsers: (data) => {
        let url = ''
        if (data[0] != undefined && data[1] != undefined) {
            url = `/api/users?no=${data[0]}&limit=${data[1]}`;
        } else {
            url = `/api/users`;
        }
        return internshipTransport.get(url);
    },
    changeStatusAccount: (data) => {
        const url = `/api/users`;
        return internshipTransport.put(url, data);
    },
    getOrders: (id) => {
        if (id == undefined) {
            id = ''
        }
        const url = `/api/orders?status_id=${id}`;
        return internshipTransport.get(url);
    },
    getOrderDetail: (orderId) => {
        const url = `/api/orders/${orderId}`;
        return internshipTransport.get(url);
    },
    creatOrder: (data) => {
        const url = `/api/orders`;
        return internshipTransport.post(url, data);
    },
    changeStatusOrder: (data) => {
        const url = `api/orders/${data.orderId}?status_id=${data.statusId}`;
        return internshipTransport.put(url);
    },
    getDiscounts: (data) => {
        let url = ''
        if (data[0] != undefined && data[1] != undefined) {
            url = `/api/orders/discount?no=${data[0]}&limit=${data[1]}`;
        } else {
            url = `/api/orders/discount`;
        }
        return internshipTransport.get(url);
    },
    getDiscountById: (id) => {
        const url = `/api/orders/discount/${id}`;
        return internshipTransport.get(url);
    },
    creatDiscount: (data) => {
        const url = `/api/orders/discount`;
        return internshipTransport.post(url, data);
    },
    updateDiscount: (data) => {
        const url = `/api/orders/discount/${data[0]}`;
        return internshipTransport.put(url, data[1]);
    },
    getSizes: () => {
        const url = `/api/sizes`;
        return internshipTransport.get(url);
    },
    statisticTotalByDate: (date) => {
        const url = `api/orders/statistic?date=${date}`;
        return internshipTransport.get(url);
    },
    statisticItemByDate: (data) => {
        const url = `api/orders/statistic/${data[0]}?date=${data[1]}`;
        return internshipTransport.get(url);
    },
    statisticTotalByMonth: (month) => {
        const url = `api/orders/statistic?month=${month}`;
        return internshipTransport.get(url);
    },
    statisticItemByMonth: (data) => {
        const url = `api/orders/statistic/${data[0]}?month=${data[1]}`;

        return internshipTransport.get(url);
    },

};

export default manage;
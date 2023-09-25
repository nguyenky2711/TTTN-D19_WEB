import { internshipTransport } from "../../config/http/transport";

const auth = {
    resetPassword: (data) => {
        const url = `/api/resetPassword/reset`;

        return internshipTransport.post(url, data);
    },
    // send token from server to your email
    verifyEmail: (data) => {
        const url = `/api/resetPassword/request`;

        return internshipTransport.post(url, data);
    },
    // active account by send verified token from client to server
    activeAccount: (data) => {
        const url = `/api/confirm/${data.activeToken}`;

        return internshipTransport.get(url);
    },
    // user change account password
    changePassword: (data) => {
        console.log(data)
        const url = `/api/changePassword`;

        return internshipTransport.put(url, data);
    },
    register: (data) => {
        const url = `/api/register`;

        return internshipTransport.post(
            url,
            data
        );
    },
    login: (data) => {
        const url = `/api/login`;

        return internshipTransport.post(
            url,
            data
        );
    },
    changeInfor: (data) => {
        console.log(data)
        const url = `/api/users/${data[0]}`;

        return internshipTransport.put(url, data[1]);
    },
    getUserById: (id) => {
        const url = `/api/users/${id}`;

        return internshipTransport.get(
            url
        );
    },
};

export default auth;
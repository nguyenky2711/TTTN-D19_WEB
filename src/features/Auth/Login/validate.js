import * as yup from 'yup';

export const schema = yup
    .object({
        email: yup
            .string()
            .required('* Vui lòng nhập địa chỉ email')
            .min(6, '* Vui lòng nhập tối thiểu 6 ký tự')
            .max(256, '* Vui lòng nhập tối đa 256 ký tự')
            .matches(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                '* Địa chỉ email không đúng'
            )
            .matches(
                /^[^\s]+$/,
                '* Địa chỉ email không được chứa dấu cách'
            )
            .matches(
                /^[\S]+$/,
                '* Địa chỉ email không được chứa dấu cách ở đầu hoặc cuối'
            )
        ,

        password: yup
            .string()
            .required('* Vui lòng nhập mật khẩu')
            .matches(/^[^\W_]/, '* Yêu cầu một chữ cái không dấu hoặc số đứng đầu')
            .matches(
                /^(?!.*?[._]{2})/,
                '* Không được phép lặp lại 2 lần ký tự đặc biệt'
            )
            .min(6, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
            .matches(/^\S+$/, '* Vui lòng không được nhập khoảng trắng')
            // .matches(/[A-Z]/, '* Vui lòng nhập ít nhất 1 chữ in hoa')
            .matches(/[0-9]/, '* Vui lòng nhập ít nhất 1 số')
            .max(32, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự'),

    })
    .required();

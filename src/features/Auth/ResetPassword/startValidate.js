import * as yup from 'yup';

export const schema1 = yup
    .object({
        email: yup
            .string()
            .required('* Vui lòng nhập địa chỉ email')
            .min(6, '* Vui lòng nhập tối thiểu 6 ký tự')
            .max(256, '* Vui lòng nhập tối đa 256 ký tự')
            .matches(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                '* Địa chỉ email không đúng'
            ),


    })
    .required();

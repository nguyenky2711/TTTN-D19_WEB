import * as yup from 'yup';
const PHONE_REGEX2 = /^\+?(?:[0-9] ?){6,14}[0-9]$/;
const uni = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

const regexName = (str) => {
    if (!str) return '';
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
};
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
            ),
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
        confirmPassword: yup
            .string()
            .required('* Vui lòng xác nhận lại mật khẩu')
            .oneOf([yup.ref('password'), null], ' * Mật khẩu chưa khớp'),
        phone: yup
            .string()
            .required('* Vui lòng nhập số điện thoại')
            .matches(/^[^\s]+$/, '* Bạn đã nhập số điện thoại không đúng')
            .test(
                'phone-length',
                ' * Số điện thoại phải có độ dài từ 8 đến 12 ký tự',
                (value) => value.replace(/\s/g, '').length >= 8 && value.replace(/\s/g, '').length <= 12
            )
            .test('phone-format', '* Bạn đã nhập số điện thoại không đúng', (value) =>
                PHONE_REGEX2.test(value.replace(/\s/g, ''))
            ),
        name: yup
            .string()
            .required('* Vui lòng nhập tên')
            .test(
                '* Validate Tên',
                '* Vui lòng không kết thúc bằng dấu cách',
                (value) => {
                    return !(value.split('').pop() === ' ');
                }
            )
            .test('* Validate Tên', '* Vui lòng nhập tên đúng định dạng', (value) => {
                return uni.test(regexName(value));
            }),
        address: yup.string().required(' * Vui lòng nhập địa chỉ'),
    })
    .required();

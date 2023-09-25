import * as yup from 'yup';

export const schema = yup
    .object({
        new_price: yup
            .string()
            .transform((value) => (value ? value.replace(/\D/g, '') : undefined))
            .test('minValue', '* Giá sản phẩm phải lớn hơn 0', (value) => {
                if (!value) return false;
                return Number(value) > 0;
            })
            .required('* Vui lòng nhập giá sản phẩm'),

    })
    .required();

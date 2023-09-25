import * as yup from 'yup';

export const schema = yup
    .object({
        condition: yup
            .string()
            .transform((value) => (value ? value.replace(/\D/g, '') : undefined))
            .test('minValue', '* Mức điều kiện tối thiểu phải lớn hơn 0', (value) => {
                if (!value) return false;
                return Number(value) > 0;
            })
            .required('* Vui lòng nhập điều kiện tối thiểu'),
        maxGet: yup
            .string()
            .transform((value) => (value ? value.replace(/\D/g, '') : undefined))
            .test('minValue', '* Mức giảm tối đa lớn hơn 0', (value) => {
                if (!value) return false;
                return Number(value) > 0;
            })
            .test('maxPercentage', '* Không được lớn hơn 20% điều kiện', function (value) {
                const maxGet = Number(value);
                const condition = Number(this.parent.condition);
                if (isNaN(maxGet) || isNaN(condition)) return false;
                return maxGet <= condition * 0.2;
            })
            .required('* Vui lòng nhập mức giảm tối đa'),
    })
    .required();

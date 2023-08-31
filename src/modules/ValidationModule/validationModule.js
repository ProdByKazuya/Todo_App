import * as yup from "yup";

export const titleValidationSchema = yup.object().shape({
    title: yup
        .string()
        .required('Title is required')
        .min(3, 'Minimum title length is 3 characters')
        .max(20, 'Maximum title length is 20 characters')
        .matches(/^(?!\s)[\s\S]+$/
            , 'Title can only contain letters, numbers, and spaces'),
    text: yup
        .string()
        .required('Text is required')
        .min(3, 'Minimum title length is 3 characters')
        .max(100, 'Maximum title length is 100 characters')
        .matches(/^(?!\s)[\s\S]+$/
            , 'Title can only contain letters, numbers, and spaces'),
})
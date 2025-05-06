// src/components/FeedbackForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';

const FeedbackForm = ({ initialValues, onSubmit, submitButtonText = 'Отправить' }) => {
    // Схема валидации
    const validationSchema = Yup.object({
        name: Yup.string().required('Имя обязательно'),
        message: Yup.string()
            .required('Сообщение обязательно')
            .min(10, 'Сообщение должно содержать минимум 10 символов'),
        rating: Yup.number()
            .min(1, 'Минимальная оценка - 1')
            .max(5, 'Максимальная оценка - 5')
            .required('Оценка обязательна'),
    });

    // Использование Formik
    const formik = useFormik({
        initialValues: initialValues || {
            name: '',
            message: '',
            rating: 5,
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values);
            resetForm();
        },
        enableReinitialize: true,
    });

    const inputStyle = {
        margin: '0.5rem',
        padding: '0.5rem',
        width: 'calc(100% - 1rem)',
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '100px',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '0.8rem',
        marginLeft: '0.5rem',
    };

    return (
        <form onSubmit={formik.handleSubmit} style={{ textAlign: 'left' }}>
            <div>
                <label htmlFor="name">Имя:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    style={inputStyle}
                />
                {formik.touched.name && formik.errors.name && (
                    <div style={errorStyle}>{formik.errors.name}</div>
                )}
            </div>

            <div>
                <label htmlFor="message">Сообщение:</label>
                <textarea
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    style={textareaStyle}
                />
                {formik.touched.message && formik.errors.message && (
                    <div style={errorStyle}>{formik.errors.message}</div>
                )}
            </div>

            <div>
                <label htmlFor="rating">Оценка (1-5):</label>
                <input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rating}
                    style={{ ...inputStyle, width: '100px' }}
                />
                {formik.touched.rating && formik.errors.rating && (
                    <div style={errorStyle}>{formik.errors.rating}</div>
                )}
            </div>

            <Button type="submit">{submitButtonText}</Button>
        </form>
    );
};

export default FeedbackForm;
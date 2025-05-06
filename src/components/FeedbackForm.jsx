// src/components/FeedbackForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

const FeedbackForm = ({ initialValues, onSubmit, isLoading, isEditing = false }) => {
    // Схема валидации для отзыва
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
        onSubmit: (values) => {
            onSubmit(values);
        },
        enableReinitialize: true,
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ textAlign: 'left', margin: '1rem' }}>
            <div>
                <label htmlFor="name">Имя:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    style={{ margin: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)' }}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div style={{ color: 'red' }}>{formik.errors.name}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="message">Сообщение:</label>
                <textarea
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    style={{ margin: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)', minHeight: '100px' }}
                />
                {formik.touched.message && formik.errors.message ? (
                    <div style={{ color: 'red' }}>{formik.errors.message}</div>
                ) : null}
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
                    style={{ margin: '0.5rem', padding: '0.5rem', width: '100px' }}
                />
                {formik.touched.rating && formik.errors.rating ? (
                    <div style={{ color: 'red' }}>{formik.errors.rating}</div>
                ) : null}
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="small" /> : isEditing ? 'Обновить отзыв' : 'Отправить отзыв'}
            </Button>
        </form>
    );
};

export default FeedbackForm;
// src/components/ProfileForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

const ProfileForm = ({ initialValues, onSubmit, isLoading }) => {
    // Схема валидации для профиля
    const validationSchema = Yup.object({
        name: Yup.string().required('Имя обязательно'),
        email: Yup.string().email('Некорректный email').required('Email обязателен'),
        bio: Yup.string().max(200, 'Биография не должна превышать 200 символов'),
    });

    // Использование Formik
    const formik = useFormik({
        initialValues: initialValues || {
            name: '',
            email: '',
            bio: '',
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
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    style={{ margin: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)' }}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: 'red' }}>{formik.errors.email}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="bio">О себе:</label>
                <textarea
                    id="bio"
                    name="bio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bio}
                    style={{ margin: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)', minHeight: '100px' }}
                />
                {formik.touched.bio && formik.errors.bio ? (
                    <div style={{ color: 'red' }}>{formik.errors.bio}</div>
                ) : null}
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="small" /> : 'Сохранить изменения'}
            </Button>
        </form>
    );
};

export default ProfileForm;
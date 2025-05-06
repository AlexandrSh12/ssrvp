// src/components/ProfileForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';

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
        enable
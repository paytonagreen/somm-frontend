import React, { useState, useEffect, FormEvent, FormEventHandler } from 'react';

const useForm = <T extends Record<keyof T, any> = {}>(callback?: () => void, initValues?: Partial<T>) => {
  const [values, setValues] = useState(initValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSubmitting) {
      callback();
    }
  }, [callback, isSubmitting]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.persist();
    const { name, value } = e.target;
    setValues((v) => ({
      ...v,
      [name]: value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
  };
};

export default useForm;

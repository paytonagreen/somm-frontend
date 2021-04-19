import { useState, useEffect } from "react";

const useForm = (callback, initValues = {}) => {
  const [values, setValues] = useState(initValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSubmitting) {
      callback();
    }
  }, [callback, isSubmitting]);

  const handleSubmit = e => {
    e.preventDefault();
      e.stopPropagation();
      setIsSubmitting(true);
  }
  
  const handleChange = e => {
      e.persist();
      const { name, value, type } = e.target;
      setValues(v => ({
          ...v, [name]: value
      }))
  };

  return {
      handleChange,
      handleSubmit,
      values,
      setValues,
      errors
  }
};

export default useForm;

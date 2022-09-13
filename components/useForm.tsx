import { useState } from "react";

export const useForm = <T extends Object>(initialState: T) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (value: string, field: keyof T) => {
    setValues({
      ...values,
      [field]: value,
    });
  };
  const setEditValues = (editValues: T) => {
    setValues(editValues);
  };

  return { values, handleInputChange, reset, setEditValues };
};

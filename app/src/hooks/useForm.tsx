import React,{useState} from 'react'

function useForm(initialValues: any) {
    const [formData, setFormData] = useState(initialValues);

    const resetForm = () => {
        setFormData(initialValues);
    }

    const updateFormData = (key:string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [key]: value,
        }))
    }
  return {formData, updateFormData, resetForm}
}

export default useForm
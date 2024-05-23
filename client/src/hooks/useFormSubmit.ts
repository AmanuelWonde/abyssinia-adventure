import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import baseUrl from "../services/base-url";

export interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone: string;
  profile_image: string;
  gender: string;
}

const useFormSubmit = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (formData === null) return;

    const handleSubmit =  (data: FormData) => {
      setLoading(true);
    
       axios.post(`${baseUrl}/signup.php`, data)
       .then(res =>{ setResponse(res.data)

        console.log("User created:", res.data);

       }).catch( (error: AxiosError) => {
        console.log('Error creating user:', error);
        console.log(error.message)
      }).finally(() =>  {
        setLoading(false);
      })
    };

    handleSubmit(formData);
  }, [formData]);

  return { setFormData, loading, error, response };
};

export default useFormSubmit;

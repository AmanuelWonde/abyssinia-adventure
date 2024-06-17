import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone: string;
  password: string;
  profile_image: string;
  gender: string;
  remember_me: true;
}

const useFormSubmit = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (formData === null) return;

    const handleSubmit = async (data: FormData) => {
      setLoading(true);
      try {
        const res = await axios.post(
          `http://localhost/abyssinia-adventure/server/auth/signup.php`,
          data
        );
        if (res.data.success) {
          // setFormData(null);
          console.log("you are logged")
          navigate("/auth/login");
        } else {
          console.log("you are not logged")
          alert(res.data.errors);
        }
      } catch (error) {
        console.log(error);
        alert("Failed to create user please try again");
      }
    };

    handleSubmit(formData);
  }, [formData]);

  return { setFormData, loading, error, response, formData };
};

export default useFormSubmit;

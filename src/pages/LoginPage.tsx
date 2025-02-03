import { Button } from "react-bootstrap";
import { Input } from "../component/Input";
import { useState } from "react";
import { ILoginData, ILoginResponse } from "../utils/types";
import { executeLoginService } from "../api/LoginApi";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const navigate=useNavigate()

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    try {
        const response: ILoginResponse | null = await executeLoginService(loginData);
        
        if (response && response.success) {
            //console.log("Login Successful:", response);
            // Handle login success (store token, redirect, etc.)
            localStorage.setItem("loginDetails", JSON.stringify(response.data));
            //localStorage.setItem("token", response.data.token);
            navigate('/welcome', { replace: true });
        } else {
            console.error("Login Failed:", response?.message);
        }
    } catch (error) {
        console.error("API Error:", error);
    }
};


  return (
    <div className="container m-lg-5">
      <h2 className="mb-4">Login Here</h2>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your email!!"
          type="email"
          label="Email"
          name="email" // Pass name attribute
          value={loginData.email}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Enter your password"
          type="password"
          label="Password"
          name="password" // Pass name attribute
          value={loginData.password}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="primary" className="mt-3">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;

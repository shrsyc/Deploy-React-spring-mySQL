import Navbar from "../Navbar/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import loginBg from "../assets/login-bg.avif"
const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSignin = () => {
    if (username != null && password != null) {
      if (username == "admin" && password === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/userDashboard");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar dashboard="notReq" cart="notReq"></Navbar>
        <div className="pt-32 flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${loginBg})`}}>
          <div className="mx-auto  w-[400px] px-5 py-5 border-2 border-slate-200 rounded-lg bg-white bg-opacity-90">
            <p className="text-xl font-bold text-lime-500">Login</p>
            <p className="text-sm mt-2">
              Enter your username below to login to your account
            </p>
            <p className="text-bold mt-3">Username</p>
            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
            ></Input>
            <p className="text-bold mt-3">Password</p>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            ></Input>
            <Button className="mt-5 w-full bg-lime-700 hover:bg-lime-500" onClick={() => handleSignin()}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

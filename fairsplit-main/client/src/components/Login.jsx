import { URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../utils/userContext";
import DashBoard from "./DashBoard";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useContext(UserContext);
  const handleLogin = async () => {
    // console.log(credentials)
    const jsonData = await fetch(URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (jsonData.status === 200) {
      // window.location.href="/"
      console.log("good");
      const data = await jsonData.json();
      console.log(data.user);
      login(data.user); // sending currLoggedin user to userContext to store in cookies
      // window.location.href = "/dashboard"; i removed this here and added it under login function in index.js
    } else {
      const data = await jsonData.json();
      alert(data.msg);
    }
    // console.log("Valid user");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-white to-green-100">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-sm">
        {user ? (
          (window.location.href = "/dashboard")
        ) : (
          // <DashBoard />
          <div>
            <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
              Welcome to Splitwise
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Manage your expenses and settle up effortlessly.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              {/* <label htmlFor="username">username : </label> */}

              {/* <label htmlFor="username">email : </label> */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  // name="email"
                />
              </div>
              {/* <label htmlFor="username">password : </label> */}
              <div className="mb-6">
                <label
                  htmlFor="Password"
                  className=" block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none "
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  // name="password"
                />
              </div>
              <button
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                New user?{" "}
                <Link
                  to={"/register"}
                  className="text-green-500 font-medium hover:underline"
                >
                  SignUp
                </Link>{" "}
              </p>
            </div>
          </div>

          // by using form

          // <div className="flex justify-center items-center h-full ">
          //   <div className="flex flex-col bg-slate-100  w-10/12  p-14 shadow-lg ">
          //     {/* <form
          //       className="w-[300px]"
          //       onSubmit={(e) => {
          //         e.preventDefault();
          //         const formData = new FormData(e.target);
          //         const credentials = {
          //           email: formData.get("email"),
          //           password: formData.get("password"),
          //         };
          //         handleLogin(credentials);

          //         console.log(e);
          //       }}
          //     >
          //       <input
          //         className="border w-full p-1 border-black m-2"
          //         type="email"
          //         name="email"
          //         placeholder="email"
          //       />
          //       <br />
          //       <input
          //         className="border w-full p-1 border-black m-2"
          //         type="password"
          //         name="password"
          //         placeholder="password"
          //       />
          //       <br />
          //       <button
          //         className="bg-green-600 px-4 py-1 text-md text-white m-2"
          //         type="submit"
          //       >
          //         Login
          //       </button>
          //     </form> */}

          //   </div>
          // </div>
        )}
      </div>
    </div>
  );
};

export default Login;

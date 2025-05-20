import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../utils/constants";
import Cookies from "js-cookie";
import { UserContext } from "../utils/userContext";
import { useLocation } from "react-router-dom"; // Access URL parameters
import { useParams } from "react-router-dom"; // Assuming you're using React Router

const Register = () => {
  const [username, setUsername] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const invitationToken = searchParams.get("invitation");
  console.log("invitationToken there ? ", invitationToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invitedBy, setInvitedBy] = useState("");
  const { login, user } = useContext(UserContext);
  // const [email, setEmail] = useState("");
  console.log("frnd email : ", email);

  const checkInvitation = async (invitationToken) => {
    const jsonData = await fetch(
      URL + `/invite/register?invitationToken=${invitationToken}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({invitationToken})
      }
    ).then((res) => res.json());
    console.log(jsonData);
    if (jsonData.msg) {
      alert(jsonData.msg);
      window.location.href = "/register";
    } else {
      setInvitedBy(jsonData.sender);
      setEmail(jsonData.recipientEmail);
    }
  };

  useEffect(() => {
    console.log("check invite only when location changes");
    if (invitationToken) checkInvitation(invitationToken);
  }, [location]);
  // useEffect(() => {
  //   // const searchParams = new URLSearchParams(location.search); // Parse URL parameters
  //   // console.log(searchParams);
  //   // const prefilledEmail = searchParams.get("prefilledEmail");
  //   if (prefilledEmail) {
  //     setEmail(prefilledEmail);
  //   }
  // }, [prefilledEmail]);

  // Submit the form to register
  const handleRegister = async () => {
    if (Cookies.get("user") !== undefined) {
      alert("You are already logged in.");
      window.location.href = "/dashboard";
    }
    console.log("handle register");
    const jsonData = await fetch(URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, invitedBy }),
    }).then((res) => res.json());
    if (jsonData.msg) {
      alert(jsonData.msg);
    } else {
      login(jsonData);
      setUsername("");
      setEmail("");
      setPassword("");
    }
    // alert("sdkfkjf")
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-white to-green-100">
      <div className="bg-white shadow-2xl  rounded-lg p-8 w-full max-w-sm">
        {Cookies.get("user") !== undefined ? (
          (window.location.href = "/dashboard")
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
              Welcome to Splitwise
            </h1>{" "}
            {/* <label htmlFor="username">username : </label> */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Username
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                  type="text"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  name="username"
                  placeholder="enter username"
                  required
                />
              </div>
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
                className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                type="submit"
              >
                SignUp
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-700 ">
                Already a member?{" "}
                <Link to={"/login"} className="text-green-500">
                  Login
                </Link>{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;

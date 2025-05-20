import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, login, logout } = useContext(UserContext);
  return (
    <div
      className={`  text-white ${
        user ? " bg-green-400 mb-2" : "p-6 bg-green-100"
      }`}
    >
      <div>
        {user ? (
          <div className="flex items-center justify-between ">
            <div className="ml-4">Splitwise</div>
            <div className="flex items-center justify-center">
              <p> {user.username}</p>
              <button
                className="bg-orange-600 px-4 py-1 text-md text-white m-2"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
            {/* <Link to={"/all"}>
              <div className="bg-slate-400 w-[100px] p-1 m-1" >All Expenses</div>
            </Link> */}
            {/* <Link to={"/dashboard"}>
              <div className="bg-slate-400 w-[100px] p-1 m-1" >Dashboard</div>
            </Link> */}
            {/* <AllExpenses/> */}
            {/* <AddFriend /> */}
            {/* <AddTransaction friendId={null} /> */}
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="ml-4 text-xl text-green-00 underline">Splitwise</div>
            <div className="text-end">
              <Link
                to={"/login"}
                style={{
                  color: "#1CC29F",
                  fontSize: "16 px",
                }}
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="ml-8 mr-20"
                style={{
                  color: "white",
                  background: "#1CC29F",
                  padding: "10px 14px",
                  fontSize: "16px",
                  borderRadius: "6px",
                  transition: "background-color 1s ease",
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
          // <Login/>
          // <p>Logged in as guest</p>
          //   <Login />

          // <button
          //   onClick={() =>
          //     login({
          //       _id: "65f98c61498e837c73c99c1b",
          //     })
          //   }
          // >
          //   Login
          // </button>
        )}
      </div>
    </div>
  );
};

export default Header;

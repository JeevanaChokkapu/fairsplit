import { useContext, useEffect, useState } from "react";
import handleTransaction from "./handleTransaction";
import { UserContext } from "../userContext";
import MyFriends from "../getMyFriends";
import Loading from "../Loading";
import SuccessPopup from "../SuccessPopUp";
const AddExpense = ({
  id,
  user,
  login,
  setPopSettled,
  setPopUpActive,
  PopUpActive,
  setShowTransAfterSubmit,
  ShowTransAfterSubmit,
  setShowSuccessPopup,
}) => {
  const [Friends, setFriends] = useState([]);
  const [state, setstate] = useState({
    query: "",
    listOfFriends: [],
  });
  const [consider, setConsider] = useState([]);

  const [description, setDescription] = useState(""); // State for description
  const [amount, setAmount] = useState(0); // State for amount
  const [Load, setLoad] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const Transaction = {
      description,
      amount,
      date: new Date().toISOString().slice(0, 10),
      type: "expense",
      userId: user._id,
      Friends: consider, // Assuming this is correct (might need clarification)
    };
    addTransaction(Transaction, id); // Call the provided function to save data
    setDescription(""); // Clear description after submission (optional)
    setAmount(0); // Clear amount after submission (optional)
  };

  console.log("consider", consider);
  useEffect(() => {
    MyFriends(setFriends, user);
  }, [PopUpActive]);
  //   const { user, login } = useContext(UserContext);
  const addTransaction = async (Transaction, id) => {
    if (consider.length === 0) alert("You must add  a friend to consider");
    else {
      await handleTransaction(
        Transaction,
        user,
        login,
        setPopUpActive,
        setPopSettled,
        setShowTransAfterSubmit,
        ShowTransAfterSubmit,
        setLoad,
        setShowSuccessPopup
      );
    }
  };
  const handleQuery = (e) => {
    const result = Friends.filter((frnd) => {
      return frnd.userID.username
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setstate({
      query: e.target.value,
      listOfFriends: result,
    });
  };
  const addMe = (frnd) => {
    // setConsider.push(frnd);
    // setTodos([...todos, data]);
    let check = 0;
    const res = consider.map(
      (friend) => (check += friend.userID._id === frnd.userID._id ? 1 : 0)
    );
    console.log(res);
    if (check > 0) alert("Already Considered!");
    else {
      setConsider([...consider, frnd]);
      setstate({
        query: "",
        listOfFriends: [],
      });
    }
    console.log("good boy", frnd, consider);
  };

  const removeConsider = (frnd) => {
    // console.log(frnd)
    const result = consider.filter(
      (friend) => friend.userID._id !== frnd.userID._id
    );
    setConsider(result);
  };

  if (Load == true) {
    return <Loading />;
  }
  return (
    <div>
      
      <div className="popup w-[300px] rounded-md border-black bg-gray-300 ">
        <div className="head bg-green-600 p-2 flex justify-between text-white font-semiboldbold ">
          <div>Add an Expense</div>
          <div
            className="closePopup text-white fontw rounded-lg w-6 text-center cursor-pointer"
            onClick={() => setPopUpActive(false)}
          >
            X
          </div>
        </div>

        <div>
          <div className="m-1">
            with you and :
            {consider.map((frnd) => (
              <span key={frnd._id} className="bg-red-200 ml-1">
                {frnd.userID.username} &nbsp;{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => removeConsider(frnd)}
                >
                  x
                </span>{" "}
              </span>
            ))}
          </div>
          <form>
            <input
              className="border border-black"
              type="search"
              placeholder="Search for friends..."
              value={state.query}
              onChange={handleQuery}
            />
          </form>
          <div>
            <ul>
              {state.query === ""
                ? ""
                : state.listOfFriends.map((frnd) => (
                    <li
                      className="bg-blue-200 w-20 mb-1 cursor-pointer"
                      key={frnd._id}
                      onClick={() => addMe(frnd)}
                    >
                      {frnd.userID.username}
                    </li>
                  ))}
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <div className="flex items-center">
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              name="description"
              id="description"
              placeholder="Enter a clear description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="number"
              name="amount"
              id="amount"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setPopUpActive(false)}
              className="bg-gray-300 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;

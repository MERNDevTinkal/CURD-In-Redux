import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, deleteUser } from "../features/curdSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };
  
  
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const handleAddBtnClick = () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and Email are required!");
      return;
    }
  
    if (!isValidName(name)) {
      toast.error("Name must contain only alphabets!");
      return;
    }
  
    if (!isValidEmail(email)) {
      toast.error("Invalid email format!");
      return;
    }
  
    dispatch(addUser({ id: Date.now(), name, email }));
    toast.success("User added successfully!");
    setName("");
    setEmail("");
  };
  
  

  const handleEdit = (user) => {
    setEditMode(true);
    setEditUserId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdateBtnClick = () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and Email are required!");
      return;
    }
  
    if (!isValidName(name)) {
      toast.error("Name must contain only alphabets!");
      return;
    }
  
    if (!isValidEmail(email)) {
      toast.error("Invalid email format!");
      return;
    }
  
    dispatch(updateUser({ id: editUserId, name, email }));
    toast.success("User updated successfully!");
    setName("");
    setEmail("");
    setEditUserId(null);
    setEditMode(false);
  };
  
  
  const handleDeleteBtnClick = (id) => {
    dispatch(deleteUser(id));
    toast.info("User deleted!");
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      {/* input section */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 mb-8 space-y-4">
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="pt-4">
          {editMode ? (
            <button
              onClick={handleUpdateBtnClick}
              className="bg-yellow-600 text-white py-2 w-full rounded-xl cursor-pointer  "
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddBtnClick}
              className="bg-blue-600 text-white py-2 w-full rounded-xl cursor-pointer"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Display Section */}
      <div className="w-full max-w-7xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users added yet.</p>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-2 text-center mb-4">
                <h1 className="text-xl font-bold text-gray-800">
                  {user.name}
                </h1>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  className="bg-yellow-500 text-white cursor-pointer px-4 py-1 rounded-xl hover:bg-yellow-600 transition-all duration-300"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>

                <button className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-xl hover:bg-red-600 transition-all duration-300"
                onClick={() => handleDeleteBtnClick(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

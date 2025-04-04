import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (users) => {
    try {
        localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
        console.error("LocalStorage Save Error:", error);
    }
};

const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem("users");
        if (data === null) return [];
        return JSON.parse(data);
    } catch (error) {
        console.error("LocalStorage Load Error:", error);
        return [];
    }
};

const initialState = {
    users: loadFromLocalStorage(),
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = action.payload;
            state.users.push(newUser);
            saveToLocalStorage(state.users);
            console.log("user Added:", newUser);
            console.log("users:", state.users);
        },

        updateUser: (state, action) => {
            const { id, name, email } = action.payload;
            const index = state.users.findIndex(user => user.id === id);
            if (index !== -1) {
                state.users[index].name = name;
                state.users[index].email = email;
                saveToLocalStorage(state.users);
            }
        },

        deleteUser: (state, action) => {
            const deleteID = action.payload;
            const index = state.users.findIndex(user => user.id === deleteID);
            if (index !== -1) {
                state.users.splice(index, 1);
                saveToLocalStorage(state.users);
              }
        }
    },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;

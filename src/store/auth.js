import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

// Slice 



const initialState = {
    userId: "",
    userName: "",
    token: "",
    expiryDate: 0,
    loading: false
};



const authSlice = createSlice({
    name: 'auth',
    initialState: initialState, // can remove the name of key and name are the same
    reducers: {
        apiRequested: (state, action) => {
            state.errorMessage = action.payload.error;
            state.loading = true;
        },
        apiRequestSuccesss: (state, action) => {
            state.errorMessage = "";
            state.loading = false;
        },
        apiRequestFailed: (state, action) => {
            state.errorMessage = action.payload.error;
            state.loading = false;
        },
        signup: (state, action) => {
            // if replace the initial state we have to return 
            state.loading = false;
        },
        login: (state, action) => {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.token = action.payload.token;
            state.expiryDate = action.payload.expiryDate;
            state.loading = false;
        }
        // getHotelsByRating: (state, action) => {
        //     state.hotelsByRating = action.payload.hotels;
        //     state.loading = false;
        // },
        // getHotelsBySearchKey: (state, action) => {
        //     state.hotelsBySearchKey = action.payload.hotels;
        //     state.loading = false;
        // }

        // },
        // updateTask: (state, action) => {
        //     const index = state.hotels.findIndex(task => task.id === action.payload.id);
        //     console.log(index);
        //     state.hotels[index].task = action.payload.updatedTask;
        // },
        // removeTask: (state, action) => {
        //     const index = state.hotels.findIndex(task => task.id === action.payload.id);
        //     state.hotels.splice(index, 1);
        // },
        // completeTask: (state, action) => {
        //     const index = state.hotels.findIndex(task => task.id === action.payload.id);
        //     state.hotels[index].completed = action.payload.completed;
        // }
    },
    // extraReducers: {
    //     [fetchTasks.pending]: (state, action) => {
    //         state.loading = true;
    //     },
    //     [fetchTasks.fulfilled]: (state, action) => {
    //         state.tasks = action.payload.tasks;
    //         state.loading = false;
    //     },
    //     [fetchTasks.rejected]: (state, action) => {
    //         state.error = action.payload.error;
    //         state.loading = false;
    //     }
    // }
});

export const { apiRequested, apiRequestFailed, apiRequestSuccess, signup, login } = authSlice.actions;
export default authSlice.reducer;


//Action Creators
const url = '/auth';

export const putSignup = (signupData) => apiCallBegan({
    url: url + '/signup',
    method: "PUT",
    data: signupData,
    onStart: apiRequested.type,
    onSuccess: signup.type,
    onError: apiRequestFailed.type
});
export const postLogin = (loginData) => apiCallBegan({
    url: url + '/login',
    method: "POST",
    data: loginData,
    onStart: apiRequested.type,
    onSuccess: login.type,
    onError: apiRequestFailed.type
});
// export const loadHotelsByRating = () => apiCallBegan({
//     url: url + '/byrating',
//     method: "GET",
//     onStart: apiRequested.type,
//     onSuccess: getHotelsByRating.type,
//     onError: apiRequestFailed.type
// });
// export const loadHotelsBySearchKey = (keyword) => apiCallBegan({
//     url: url + `/search?destination=${keyword}`,
//     method: "GET",
//     onStart: apiRequested.type,
//     onSuccess: getHotelsBySearchKey.type,
//     onError: apiRequestFailed.type
// });
// export const addHotels = (task) => apiCallBegan({
//     url: url,
//     method: "POST",
//     data: task,
//     onSuccess: addTask.type,
//     onError: apiRequestFailed.type
// });
// export const finishHotels = (task) => apiCallBegan({
//     url: url + `/${task.id}`,
//     method: "PATCH",
//     data: task,
//     onSuccess: completeTask.type,
//     onError: apiRequestFailed.type
// });
// export const deleteHotels = (task) => apiCallBegan({
//     url: url + `/${task.id}`,
//     method: "DELETE",
//     onSuccess: removeTask.type,
//     onError: apiRequestFailed.type
// });
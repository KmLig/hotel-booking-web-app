import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

// Slice 


const initialState = {
    hotels: [],
    hotelsByRating: [],
    hotelsBySearchKey: [],
    loading: false,
    error: null
};

const hotelSlice = createSlice({
    name: 'hotels',
    initialState: initialState, // can remove the name of key and name are the same
    reducers: {
        apiRequested: (state, action) => {
            state.loading = true;
        },
        apiRequestFailed: (state, action) => {
            state.loading = false;
        },
        getHotels: (state, action) => {
            state.hotels = action.payload.hotels;// if replace the initial state we have to return
            state.loading = false;
        },
        getHotelsByRating: (state, action) => {
            state.hotelsByRating = action.payload.hotels;
            state.loading = false;
        },
        getHotelsBySearchKey: (state, action) => {
            state.hotelsBySearchKey = action.payload.hotels;
            state.loading = false;
        }

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

export const { apiRequested, apiRequestFailed, getHotels, getHotelsByRating, getHotelsBySearchKey } = hotelSlice.actions;
export default hotelSlice.reducer;


//Action Creators
const url = '/hotel';

export const loadHotels = () => apiCallBegan({
    url: url + '/hotels',
    method: "GET",
    onStart: apiRequested.type,
    onSuccess: getHotels.type,
    onError: apiRequestFailed.type
});
export const loadHotelsByRating = () => apiCallBegan({
    url: url + '/byrating',
    method: "GET",
    onStart: apiRequested.type,
    onSuccess: getHotelsByRating.type,
    onError: apiRequestFailed.type
});
export const loadHotelsBySearchKey = (keyword) => apiCallBegan({
    url: url + `/search?destination=${keyword}`,
    method: "GET",
    onStart: apiRequested.type,
    onSuccess: getHotelsBySearchKey.type,
    onError: apiRequestFailed.type
});
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
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	list: [],
};

export const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		createRoom: (state, action) => {
			state.list.push(action.payload);
		},
		updateRoom: (state, action) => {
			const roomIndex = state.list.findIndex((room) => room.id == action.payload.id);

			if (roomIndex > -1) {
				state.list.splice(roomIndex, 1, action.payload);
			}
		},
		deleteRoom: (state, action) => {
			const roomIndex = state.list.findIndex((room) => {
				if (typeof action.payload == 'object') {
					return room.id == action.payload.id;
				}

				return room.id == action.payload;
			});

			if (roomIndex > -1) {
				state.list.splice(roomIndex, 1);
			}
		},
	},
});

export const {
	createRoom,
	updateRoom,
	deleteRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;
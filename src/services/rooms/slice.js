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
			state.list = state.list.map((room, index) => ({ ...room, index }));
		},
		updateRoom: (state, action) => {
			const roomIndex = state.list.findIndex((room) => room.id == action.payload.id);

			if (roomIndex > -1) {
				state.list.splice(roomIndex, 1, action.payload);
				state.list = state.list.map((room, index) => ({ ...room, index }));
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
				state.list = state.list.map((room, index) => ({ ...room, index }));
			}
		},
		moveRoom: (state, action) => {
			const element = state.list[action.payload.from];
			state.list.splice(action.payload.from, 1);
			state.list.splice(action.payload.to, 0, element);
			state.list = state.list.map((room, index) => ({ ...room, index }));

			setTimeout(() => {
				const roomsChange = new Event('roomschange');
				window.dispatchEvent(roomsChange);
			}, 1000)
		},
	},
});

export const {
	createRoom,
	updateRoom,
	deleteRoom,
	moveRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;
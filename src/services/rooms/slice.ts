import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from '../../types/index';

interface RoomsState {
	list: IRoom[];
};

const initialState: RoomsState = {
	list: [],
};

export const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		createRoom: (state, action: { payload: IRoom }) => {
			state.list.push(action.payload);
			state.list = state.list.map((room, index) => ({ ...room, index }));
		},
		updateRoom: (state, action: { payload: IRoom }) => {
			const roomIndex = state.list.findIndex((room) => room.id == action.payload.id);

			if (roomIndex > -1) {
				state.list.splice(roomIndex, 1, action.payload);
				state.list = state.list.map((room, index) => ({ ...room, index }));
			}
		},
		deleteRoom: (state, action: { payload: IRoom }) => {
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
		moveRoom: (state, action: { payload: { from: number, to: number } }) => {
			const element = state.list[action.payload.from];
			state.list.splice(action.payload.from, 1);
			state.list.splice(action.payload.to, 0, element);
			state.list = state.list.map((room, index) => ({ ...room, index }));

			setTimeout(() => {
				const roomsChange = new Event('roomschange');
				window.dispatchEvent(roomsChange);
			}, 1000)
		},
		setEntityRoom: (state, action: { payload: { roomId: string, entityId: string } }) => {
			state.list = state.list.map((room) => {
				room.entities = room.entities?.filter((entity_id) => entity_id != action.payload.entityId);
				return room;
			});

			state.list = state.list.map((room) => {
				if (room.entities == null) {
					room.entities = [];
				}

				if (room.id == action.payload.roomId) {
					room.entities.push(action.payload.entityId);
				}

				return room;
			});
		},
	},
});

export const {
	createRoom,
	updateRoom,
	deleteRoom,
	moveRoom,
	setEntityRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;
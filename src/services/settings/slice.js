import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	entities: [],
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setEntitySettings: (state, action) => {
			const entityIndex = state.entities.findIndex((entitiy) =>
				entitiy.entity_id == action.payload.entity_id
			);

			if (entityIndex > -1) {
				state.entities.splice(entityIndex, 1, action.payload);
			} else {
				state.entities.push(action.payload);
			}
		},
	},
});

export const {
	setEntitySettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	entities: [],
};

export const entitiesSlice = createSlice({
	name: 'entities',
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
} = entitiesSlice.actions;

export default entitiesSlice.reducer;
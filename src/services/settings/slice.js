import { createSlice } from "@reduxjs/toolkit";
import { getBaseURI } from "lib/config";
import { resolveMedia } from 'services/mediabrowser/slice';

const initialState = {
	entities: [],
	favorites: [],
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
		favoriteEntity: (state, action) => {
			if (state.favorites == null) {
				state.favorites = [];
			}

			if (state.favorites.includes(action.payload)) {
				state.favorites = state.favorites.filter((entity_id) =>
					entity_id != action.payload
				);
			} else {
				state.favorites.push(action.payload);
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(resolveMedia.fulfilled, (state, action) => {
			const { media } = action.payload;

			state.entities = state.entities.map((entity) => {
				if (entity.backgroundImageId == media.media_content_id) {
					entity['backgroundUrl'] = getBaseURI() + media.url;
				}

				return entity;
			});
		});
	}
});

export const {
	setEntitySettings,
	favoriteEntity,
} = settingsSlice.actions;

export default settingsSlice.reducer;
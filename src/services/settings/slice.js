import { createSlice } from "@reduxjs/toolkit";
import { getBaseURI } from "lib/config";
import { resolveMedia } from 'services/mediabrowser/slice';

const initialState = {
	entities: [],
	favorites: [],
	groups: [],
	vacuums: [],
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
		addGroup: (state, action) => {
			if (state.groups == null) {
				state.groups = [];
			}

			state.groups.push(action.payload);
		},
		updateGroup: (state, action) => {
			const { payload: group } = action;
			const groupIndex = state.groups.findIndex((g) =>
				g.id == group.id
			);

			if (groupIndex > -1) {
				state.groups.splice(groupIndex, 1, group);
			}
		},
		deleteGroup: (state, action) => {
			const groupIndex = state.groups.findIndex((group) => {
				if (typeof action.payload == 'object') {
					return group.id == action.payload.id;
				}

				return group.id == action.payload;
			});

			if (groupIndex > -1) {
				state.groups.splice(groupIndex, 1);
			}
		},
		addVacuum: (state, action) => {
			if (state.vacuums == null) {
				state.vacuums = [];
			}

			state.vacuums.push(action.payload);
		},
		updateVacuum: (state, action) => {
			const { payload: vacuum } = action;
			const vacuumIndex = state.vacuums.findIndex((v) =>
				v.id == vacuum.id
			);

			if (vacuumIndex > -1) {
				state.vacuums.splice(vacuumIndex, 1, vacuum);
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
	},
});

export const {
	setEntitySettings,
	favoriteEntity,
	addGroup,
	updateGroup,
	deleteGroup,
	addVacuum,
	updateVacuum,
} = settingsSlice.actions;

export default settingsSlice.reducer;
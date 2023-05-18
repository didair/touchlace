import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHassConnection } from "lib/hass";
import { statesApi } from 'services/states/api';

const indexedMediaClasses = [
	'app',
	'directory',
	'playlist'
];

const initialState = {
	breadcrumbs: [],
	currentDirectory: null,
	directories: [],
	currentlyNavigatedDirectory: null,
	currentlyPlayingDirectory: null,
};

async function fetchData(entity, child = null) {
	const connection = await getHassConnection();

	if (connection == null) {
		console.error('MEDIABROWSER: COULD NOT FETCH HASS CONNECTION');
		return;
	}

	let message = {
		type: 'media_player/browse_media',
		entity_id: entity.entity_id,
	};

	if (child != null && child.media_content_id != '') {
		message.media_content_id = child.media_content_id;
		message.media_content_type = child.media_content_type;
	}

	const result = await connection.sendMessagePromise(message);

	if (result != null) {
		return result;
	}
};

export const navigateDirectory = createAsyncThunk('mediaBrowser/fetchDirectory',
	async ({ child, entity }, thunkAPI) => {
		let response = null;
		const stateDirectories = thunkAPI.getState().mediaBrowser.directories;
		if (child != null && indexedMediaClasses.indexOf(child.media_class) > -1) {
			response = stateDirectories.find((dir) =>
				dir.childId == child?.media_content_id
			);
		}

		if (child == null) {
			response = stateDirectories.find((dir) =>
				dir.media_content_type == 'root'
			);
		}

		if (response == null) {
			// Not cached, fetch the data
			response = await fetchData(entity, child);
			console.log('response', response);
		}

		return {
			child,
			entity,
			directory: response,
		};
	}
);

export const mediaBrowserSlice = createSlice({
	name: 'mediaBrowser',
	initialState,
	reducers: {
		playChild: (state, action) => {
			const { entity, child } = action.payload;

			console.log('play this child', child);

			statesApi.endpoints.callEntityService.initiate({
				entity_id: entity.entity_id,
				domain: 'media_player',
				service: 'play_media',
				fields: {
					media_content_id: child.media_content_id,
					media_content_type: child.media_content_type,
				},
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(navigateDirectory.fulfilled, (state, action) => {
			const { child, entity, directory } = action.payload;

			state.currentlyNavigatedDirectory = child?.media_content_id;
			state.currentDirectory = directory;

			if (child != null && indexedMediaClasses.indexOf(child.media_class) > -1) {
				const foundInState = state.directories.find((dir) =>
					dir.childId == child.media_content_id
				);

				if (foundInState == null) {
					state.directories.push({
						...directory,
						childId: child.media_content_id,
					});
				}
			}

			if (child == null && directory.media_content_type == 'root') {
				const foundInState = state.directories.find((dir) =>
					dir.media_content_id == 'root'
				);

				if (foundInState == null) {
					state.directories.push(directory);
				}
			}
		});
	},
});

export const {
	playChild,
} = mediaBrowserSlice.actions;

export default mediaBrowserSlice.reducer;
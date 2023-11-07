import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHassConnection } from "lib/hass";

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

async function fetchData(entity, child = null, type = null) {
	const connection = await getHassConnection();

	if (connection == null) {
		console.error('MEDIABROWSER: COULD NOT FETCH HASS CONNECTION');
		return;
	}

	let message = {
		type: type ?? 'media_player/browse_media',
		entity_id: entity?.entity_id,
	};

	if (child != null && child.media_content_id != '') {
		message.media_content_id = child.media_content_id;
	}
	
	if (child != null && child.media_content_type != '') {
		message.media_content_type = child.media_content_type;
	}

	const result = await connection.sendMessagePromise(message);

	if (result != null) {
		return result;
	}
};

export const playChild = createAsyncThunk('mediaBrowser/playChild',
	async ({ child, entity }) => {
		const connection = await getHassConnection();

		if (connection == null) {
			console.error('MEDIABROWSER: COULD NOT FETCH HASS CONNECTION');
			return;
		}

		if (child == null || child.media_content_id == '' || child.media_content_type == '') {
			console.error('MEDIABROWSER: PLAY_MEDIA - CHILD NOT PROVIDED');
			return;
		}

		let message = {
			type: 'call_service',
			domain: 'media_player',
			service: 'play_media',
			service_data: {
				entity_id: entity.entity_id,
				media_content_id: child.media_content_id,
				media_content_type: child.media_content_type,
			}
		};

		const result = await connection.sendMessagePromise(message);

		if (result != null) {
			return result;
		}
	}
);

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
		}

		return {
			child,
			entity,
			directory: response,
		};
	}
);

export const browseMedia = createAsyncThunk('mediaBrowser/browseMedia',
	async (action, thunkAPI) => {
		let response = null;

		response = await fetchData(null,
			{ media_content_id: 'media-source://media_source' },
			'media_source/browse_media'
		);

		if (response.children != null && response.children.length > 0) {
			response.children.forEach((child) => {
				thunkAPI.dispatch(resolveMedia(child));
			});
		}

		return {
			directory: response,
		};
	}
);

export const resolveMedia = createAsyncThunk('mediaBrowser/resolveMedia',
	async (child, thunkAPI) => {
		let response = null;

		response = await fetchData(null,
			{ media_content_id: child.media_content_id },
			'media_source/resolve_media'
		);

		return {
			media: {
				...response,
				media_content_id: child.media_content_id
			},
		};
	}
);

export const mediaBrowserSlice = createSlice({
	name: 'mediaBrowser',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(navigateDirectory.fulfilled, (state, action) => {
			const { child, directory } = action.payload;

			if (state.currentDirectory != null) {
				// History mgmt
				const isChildrenOfPrevious = state.currentDirectory.children.find((c) => {
					return c.media_content_type == child?.media_content_type && child?.media_content_id.indexOf(c.media_content_id) > -1
				});

				if (isChildrenOfPrevious != null) {
					state.breadcrumbs.push(state.currentDirectory);
				} else {
					if (directory.media_content_type == 'root') {
						state.breadcrumbs = [];
					} else {
						state.breadcrumbs.pop();
					}
				}
			}

			state.currentlyNavigatedDirectory = child?.media_content_id;
			state.currentDirectory = directory;

			if (child != null && child.media_content_id != '' && indexedMediaClasses.indexOf(child.media_class) > -1) {
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

		builder.addCase(browseMedia.fulfilled, (state, action) => {
			const { directory } = action.payload;
			state.currentDirectory = directory;
		});

		builder.addCase(resolveMedia.fulfilled, (state, action) => {
			const { media } = action.payload;

			if (state.currentDirectory != null) {
				state.currentDirectory.children = state.currentDirectory.children?.map((child) => {
					if (child.media_content_id == media.media_content_id) {
						child.url = media.url;
						child.mime_type = media.mime_type;
					}

					return child;
				});
			}
		});
	},
});

export default mediaBrowserSlice.reducer;
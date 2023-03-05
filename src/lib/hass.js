import {
	getAuth,
	createConnection,
} from "home-assistant-js-websocket";
import { getBaseURI } from "./config";

export const getHassAuth = async () => {
	let auth;
	const authOptions = {
		hassUrl: getBaseURI(),
		async loadTokens() {
			try {
				return JSON.parse(localStorage.hassTokens);
			} catch (err) {
				return undefined;
			}
		},
		saveTokens: (tokens) => {
			localStorage.hassTokens = JSON.stringify(tokens);
		},
	};

	try {
		auth = await getAuth(authOptions);
	} catch (err) {
		alert(`Could not get hass auth error code: ${err}`);
		return null;
	}

	return auth;
};

export const getHassConnection = async () => {
	const auth = await getHassAuth();
	if (auth != null) {
		const connection = await createConnection({ auth });
		return connection;
	}

	return null;
};
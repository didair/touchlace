import {
	getAuth,
	createConnection,
} from "home-assistant-js-websocket";
import { getBaseURI } from "./config";

export const getHassAuth = async () => {
	let auth;
	const authOptions = {
		hassUrl: getBaseURI(),
		redirectUrl: window.location.origin + '/setup',
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

var hass_session_connection = null;
export const getHassConnection = async () => {
	const auth = await getHassAuth();
	if (auth != null) {
		if (hass_session_connection != null) {
			return hass_session_connection;
		}

		hass_session_connection = await createConnection({ auth });
		return hass_session_connection;
	}

	return null;
};
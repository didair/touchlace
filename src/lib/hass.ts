import {
	getAuth,
	createConnection,
	Auth,
	Connection,
} from "home-assistant-js-websocket";
import { getBaseURI } from "./config";

export const getHassAuth = async () => {
	let auth: Auth;
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

var connectionCache: Connection;
export const getHassConnection = async (skipCache = false) => {
	const auth = await getHassAuth();
	if (auth != null) {
		if (connectionCache != null && !skipCache && connectionCache.connected) {
			return connectionCache;
		}

		connectionCache = await createConnection({ auth });
		return connectionCache;
	}

	return null;
};
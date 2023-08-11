import { getHassAuth } from 'lib/hass';

export const getBaseURI = () => {
	return localStorage.getItem('touchlace-base-uri') ?? '';
};

export const prepareHeaders = async (headers: Headers) => {
	const auth = await getHassAuth();
	if (auth != null) {
		if (auth.expired) {
			console.log('token expired, trying to fetch a new token from server');
			await auth.refreshAccessToken();
		}

		headers.set('Authorization', `Bearer ${auth.data.access_token}`);
	}

	return headers;
};

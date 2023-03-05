import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURI } from 'lib/config';
import { getHassAuth } from 'lib/hass';

export const configApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: getBaseURI() + '/api/',
		prepareHeaders: async (headers) => {
			const auth = await getHassAuth();
			if (auth != null) {
				headers.set('Authorization', `Bearer ${auth.data.access_token}`);
			}

			return headers;
		},
	}),
	reducerPath: 'configApi',
	tagTypes: ['Config'],
	endpoints: (build) => ({
		getConfig: build.query({
			query: () => ({
				url: `${getBaseURI()}/api/config`,
			}),
			providesTags: ['Config'],
		}),
	}),
});

export const {
	useGetConfigQuery,
} = configApi;
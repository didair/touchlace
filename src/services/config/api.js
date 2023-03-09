import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURI, prepareHeaders } from 'lib/config';

export const configApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: getBaseURI() + '/api/',
		prepareHeaders: prepareHeaders,
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
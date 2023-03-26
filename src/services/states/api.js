import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getHassConnection } from 'lib/hass';
import { getBaseURI, prepareHeaders } from 'lib/config';
import { subscribeEntities } from 'home-assistant-js-websocket';

const deepCompare = (a, b) => {
	return JSON.stringify(a) === JSON.stringify(b);
};

export const statesApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: getBaseURI() + '/api/',
		prepareHeaders: prepareHeaders,
	}),
	reducerPath: 'states',
	tagTypes: ['Entities'],
	endpoints: (build) => ({
		getServices: build.query({
			query: () => ({
				url: `services`,
			}),
		}),
		getStates: build.query({
			query: () => ({
				url: `states`
			}),
			providesTags: ['Entities'],
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				await cacheDataLoaded;
				const connection = await getHassConnection();

				if (connection == null) {
					console.log('COULD NOT FETCH HASS CONNECTION');
					return;
				}

				subscribeEntities(connection, (entities) => {
					updateCachedData((state) => {
						return state.map((entity) => {
							const foundInSubscription = entities[entity.entity_id];
							if (foundInSubscription != null && !deepCompare(foundInSubscription, entity)) {
								return foundInSubscription;
							}

							return entity;
						});
					});
				});
			},
		}),
		updateEntityState: build.mutation({
			query(data) {
				return {
					url: `services/${data.domain}/turn_${data.state}`,
					method: 'POST',
					body: {
						entity_id: data.entity_id,
						...data.fields
					},
				};
			},
		}),
		callEntityService: build.mutation({
			query(data) {
				return {
					url: `services/${data.domain}/${data.service}`,
					method: 'POST',
					body: {
						entity_id: data.entity_id,
						...data.fields
					},
				};
			},
		}),
	}),
});

export const {
	useGetServicesQuery,
	useGetStatesQuery,
	useUpdateEntityStateMutation,
	useCallEntityServiceMutation,
} = statesApi;
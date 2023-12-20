import { IEntity, IEntitySettings } from "types";
import { store } from "./store";

export const getEntityType = (entity: IEntity): 'light' | 'sensor' | 'binary_sensor' | 'switch' | 'cover' | 'media_player' | 'camera' | 'vacuum' => {
	const entity_type: string = entity.entity_id.split('.')[0];
	return entity_type;
};

export const getEntitySettings = (entity_id: string): IEntitySettings => {
	const state = store.getState();
	return state.settings.entities.find((entity: IEntity) =>
		entity.entity_id == entity_id
	);
};

export const getEntityRoom = (entity_id: string): string => {
	const state = store.getState();
	return state.rooms.list.find((room) => room.entities?.find((e_id) =>
		entity_id == e_id
	));
};
import { Entity as EntityInterface } from "types";
import { store } from "./store";

export const getEntityType = (entity: EntityInterface): 'light' | 'sensor' | 'binary_sensor' | 'switch' | 'cover' | 'media_player' => {
	const entity_type: string = entity.entity_id.split('.')[0];
	return entity_type;
};

export const getEntitySettings = (entity_id: string) => {
	const state = store.getState();
	return state.settings.entities.find((entity: EntityInterface) =>
		entity.entity_id == entity_id
	);
};
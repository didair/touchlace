import { Entity as EntityInterface } from "types";
export const getEntityType = (entity: EntityInterface) => {
	const entity_type: string = entity.entity_id.split('.')[0];
	return entity_type;
};
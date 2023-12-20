import { useState } from "react";
import { useGetStatesQuery } from "services/states/api";
import { IEntity } from "types";

const useVacuumEntityMap = () => {
	const { data: entities }: { data: [IEntity] } = useGetStatesQuery();
	const [isLoading] = useState(false);

	const find = (search: string, entities: [IEntity]) => {
		return entities.find((e) => e.entity_id == search)?.entity_id;
	};

	const mapVacuumEntities = (vacuum: IEntity) => {
		const id = vacuum.entity_id.split('.')[1];
		const relatedEntities = entities.filter((entity) => entity.entity_id.indexOf(id) > -1);
		const results = {
			'id': vacuum.entity_id,
			'name': vacuum.attributes.friendly_name,
			'map': find(`camera.${id}_map`, relatedEntities),
		};

		console.log('map vacuum', id, results);
		return results;
	};

	return [mapVacuumEntities, isLoading];
};

export default useVacuumEntityMap;
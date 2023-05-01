import { useGetStatesQuery } from "services/states/api";
import Entity from "components/Entity";

const Entities = (props) => {
	const { data: entities } = useGetStatesQuery();

	if (entities == null || props.entities == null) {
		return null;
	}

	return props.entities.map((entity_id) => {
		const entity = entities.find((entity) => entity.entity_id == entity_id);

		if (entity == null) {
			return null;
		}

		return (
			<Entity
				key={entity.entity_id}
				entity={entity}
			/>
		);
	});
};

Entities.defaultProps = {
	entities: [],
};

export default Entities;
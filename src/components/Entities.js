import { useSelector } from "react-redux";
import { useGetStatesQuery } from "services/states/api";
import Entity from "components/Entity";
import Group from "./Group";

const Entities = (props) => {
	const { data: entities } = useGetStatesQuery();
	const groups = useSelector((state) => state.settings.groups);

	if (entities == null || props.entities == null) {
		return null;
	}

	return props.entities.map((entity_id) => {
		const entity = entities.find((entity) => entity.entity_id == entity_id);

		if (entity == null) {
			const group = groups.find((group) => group.id == entity_id);

			if (group != null) {
				return (
					<Group
						key={group.id}
						group={group}
					/>
				);
			}

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
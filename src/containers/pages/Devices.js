import { useGetStatesQuery } from "services/states/api";
import Entity from "components/Entity";
import { useGetConfigQuery } from "services/config/api";

const Devices = () => {
	const { data: config } = useGetConfigQuery();
	const { data: entities } = useGetStatesQuery();

	if (entities == null) {
		return null;
	}

	return (
		<div>
			{config != null ?
				<h1 className="text-5xl">{config.location_name}</h1>
			: null}

			<h3 className="text-xl mt-1 mb-4">Got states from {entities.length} devices</h3>

			<div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-3">
				{entities.map((entity) => {
					return <Entity
						key={entity.entity_id}
						entity={entity}
					/>;
				})}
			</div>
		</div>
	);
}

export default Devices;
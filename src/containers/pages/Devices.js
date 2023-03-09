import Entity from "components/Entity";
import { useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useGetConfigQuery } from "services/config/api";
import { useGetStatesQuery } from "services/states/api";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Devices = () => {
	const { data: config } = useGetConfigQuery();
	const { data: entities } = useGetStatesQuery();

	const layout = useMemo(() => {
		if (entities == null) {
			return [];
		}

		let row = 0;
		let column = 0;
		let result = [];

		entities.map((entity, index) => {
			const entity_type = entity.entity_id.split('.')[0];
			if (entity_type == 'light' || entity_type == 'switch') {
				result.push({
					i: entity.entity_id,
					x: column,
					y: 0,
					w: 1,
					h: 1,
				});

				if (column == 8) {
					row++;
					column = 0;
				} else {
					column++;
				}
			}
		});

		return result;
	}, [entities]);

	if (entities == null) {
		return null;
	}

	console.log('layout', layout)

	return (
		<div>
			{config != null ?
				<h1 className="text-5xl">{config.location_name}</h1>
			: null}

			<h3 className="text-xl mt-1 mb-4">Got states from {entities.length} devices</h3>

			{/* <div className="flex flex-wrap gap-3">
				{entities.map((entity) => {
					return <Entity
						key={entity.entity_id}
						entity={entity}
					/>;
				})}
			</div> */}

			<ResponsiveGridLayout
				layouts={{ lg: layout, sm: layout }}
				rowHeight={128}
				breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				cols={{ lg: 8, md: 8, sm: 6, xs: 4, xxs: 2 }}
				// cols={12}
				className="relative"
				isDraggable={false}
				isResizable={false}
			>
				{entities.map((entity, index) => {
					const entity_type = entity.entity_id.split('.')[0];
					if (entity_type == 'light' || entity_type == 'switch') {
						return (
							<div key={entity.entity_id}>
								<Entity
									entity={entity}
								/>
							</div>
						);
					}

					return null;
				})}
			</ResponsiveGridLayout>
		</div>
	);
}

export default Devices;
import { IEntity, IEntityGroup } from "types";

import { useGetStatesQuery, useUpdateEntityStateMutation } from "services/states/api";
import { useMemo } from "react";

import Card from "./Card";
import RangeSlider from "./Inputs/RangeSlider";
import Icon from "./Icon";

const Group = ({ group }: {
	group: IEntityGroup
}) => {
	const { data: entities } = useGetStatesQuery();
	const [updateState] = useUpdateEntityStateMutation();

	const findEntity = (entity_id) : IEntity => {
		return entities.find((entity) => entity.entity_id == entity_id);
	};

	const defaultValue = useMemo(() => {
		let highest = 0;

		group.entities.forEach((entity_id) => {
			let entity = findEntity(entity_id);
			if (entity.attributes.brightness != null && highest < entity.attributes.brightness) {
				highest = entity.attributes.brightness;
			}
		});

		return highest;
	}, [group, entities]);

	const hasLights = useMemo(() => {
		if (group != null && group.entities != null) {
			return group.entities.find((entity_id) =>
				entity_id.indexOf('light') > -1
			) != null;
		}
		return false;
	}, [group]);

	const hasSwitches = useMemo(() => {
		if (group != null && group.entities != null) {
			return group.entities.find((entity_id) =>
				entity_id.indexOf('switch') > -1
			) != null;
		}
		return false;
	}, [group]);

	const lightsOnCount = useMemo(() => {
		let result = 0;
		group.entities.forEach((entity_id) => {
			const entity = findEntity(entity_id);
			if (entity.state == 'on') {
				result += 1;
			}
		});
		return result;
	}, [group, entities]);

	const turnOnLights = (brightness) => {
		group.entities.forEach((entity_id) => {
			if (entity_id.indexOf('switch') > -1) {
				updateState({
					entity_id: entity_id,
					domain: 'switch',
					state: 'on',
				});
			} else {
				updateState({
					entity_id: entity_id,
					domain: 'light',
					state: 'on',
					fields: {
						brightness: brightness,
					}
				});
			}
		});
	};

	const turnOffLights = () => {
		group.entities.forEach((entity_id) => {
			if (entity_id.indexOf('switch') > -1) {
				updateState({
					entity_id: entity_id,
					domain: 'switch',
					state: 'off',
				});
			} else {
				updateState({
					entity_id: entity_id,
					domain: 'light',
					state: 'off',
				});
			}
		});
	};

	const onSliderChange = (value) => {
		if (value > 0) {
			turnOnLights(value);
		} else {
			turnOffLights();
		}
	};

	const onToggleAll = (event) => {
		event.preventDefault();
		if (lightsOnCount > 0) {
			turnOffLights();
		} else {
			turnOnLights();
		}
	};

	return (
		<>
			<Card
				state={'dark'}
				type="group"
				className="row-span-2 square-h-half"
				disableClickEvents
			>
				<div className="absolute top-0 left-0 w-full h-full flex flex-col">
					<div className="flex-1">
						<RangeSlider
							value={defaultValue}
							min={0}
							max={255}
							onChange={onSliderChange}
							showLabel={false}
						/>
					</div>

					<div className="flex items-center px-4 py-2 mt-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }} onClick={onToggleAll}>
						<Icon name="BulbGroup" className="mr-1" />
						{lightsOnCount > 0 ?
							"Turn off all lights"
						:
							"Turn on all lights"
						}
					</div>
				</div>

				<div className="relative z-10 text-sm">
					<div className="font-semibold text-base truncate text-ellipsis">
						{group.name}
					</div>

					<div>
						{lightsOnCount > 0 ?
							lightsOnCount + " On"
						:
							"All off"
						}

						{hasLights && lightsOnCount > 0 && defaultValue > 0 ?
							' • ' + Math.round((defaultValue / 255) * 100) + '%'
						: null}
					</div>
				</div>
			</Card>
		</>
	);

};

export default Group;
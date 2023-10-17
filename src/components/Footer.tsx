import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Entity as IEntity } from "types";
import { getEntityType, getEntitySettings } from "lib/entity";
import { useGetStatesQuery } from "services/states/api";
import cx from 'classnames';

import Badge from "./Badge";
import Modal from "./Modal";
import Entities from "./Entities";

const badgeTypes = [
	{
		id: 'active_media',
		labelFunc: (matchingEntities: [IEntity]) => 'Active Media',
		statusFunc: (matchingEntities: [IEntity]) => {
			return `${matchingEntities.length} Playing`;
		},
		iconFunc: (matchingEntities: [IEntity]) => 'speaker',
		matchFunc: (entity: IEntity) => {
			return getEntityType(entity) == 'media_player' && entity.state == 'playing';
		},
	},
	{
		id: 'open_doors',
		labelFunc: (matchingEntities: [IEntity]) => `Doors`,
		statusFunc: (matchingEntities: [IEntity]) => {
			return `${matchingEntities.length} open doors`;
		},
		iconFunc: (matchingEntities: [IEntity]) => 'door-open',
		matchFunc: (entity: IEntity) => {
			return getEntityType(entity) == 'binary_sensor' &&
				entity.state == 'on' &&
				getEntitySettings(entity.entity_id)?.sensorType == 'door'
		},
	},
	{
		id: 'open_doors',
		labelFunc: (matchingEntities: [IEntity]) => `Doors`,
		statusFunc: (matchingEntities: [IEntity]) => {
			return `All doors closed`;
		},
		iconFunc: (matchingEntities: [IEntity]) => 'door-closed',
		matchFunc: (entity: IEntity) => {
			return getEntityType(entity) == 'binary_sensor' &&
				entity.state == 'off' &&
				getEntitySettings(entity.entity_id)?.sensorType == 'door'
		},
	},
	{
		id: 'temperature',
		labelFunc: (matchingEntities: [IEntity]) => `Temperature`,
		statusFunc: (matchingEntities: [IEntity]) => {
			if (matchingEntities.length == 1) {
				return `${matchingEntities[0].state}${matchingEntities[0].attributes.unit_of_measurement}`;
			}

			const min = matchingEntities.reduce((prev, current) => {
				if (prev == null || parseFloat(current.state) < prev)
					return parseFloat(current.state);

				return prev;
			}, null);

			const max = matchingEntities.reduce((prev, current) => {
				if (prev == null || parseFloat(current.state) > prev)
					return parseFloat(current.state);

				return prev;
			}, null);

			return `Between ${min}-${max}${matchingEntities[0].attributes.unit_of_measurement}`;
		},
		iconFunc: (matchingEntities: [IEntity]) => 'temperature-three-quarters',
		matchFunc: (entity: IEntity) => {
			return getEntityType(entity) == 'sensor' &&
				getEntitySettings(entity.entity_id)?.sensorType == 'temperature'
		},
	},
	{
		id: 'lights',
		labelFunc: (matchingEntities: [IEntity]) => `Lights`,
		statusFunc: (matchingEntities: [IEntity]) => {
			return `${matchingEntities.length} on`;
		},
		iconFunc: (matchingEntities: [IEntity]) => 'lightbulb',
		matchFunc: (entity: IEntity) => {
			return getEntityType(entity) == 'light' &&
				entity.state == 'on'
		},
	},
	{
		id: 'lights',
		labelFunc: (matchingEntities: [IEntity]) => `Lights`,
		statusFunc: (matchingEntities: [IEntity]) => {
			return `All off`;
		},
		iconFunc: (matchingEntities: [IEntity]) => 'lightbulb',
		matchFunc: (entity: IEntity) => {
			return getEntityType(entity) == 'light' &&
				entity.state == 'off'
		},
	},
];

const Footer = () => {
	const { data: entities } = useGetStatesQuery();
	const [selected, setSelected] = useState(null);

	const calculatedBadges = useMemo(() => {
		let result = [];
		let added_ids = [];

		if (entities == null) return result;

		badgeTypes.forEach((badge) => {
			if (added_ids.includes(badge.id)) {
				return false;
			}

			const matchingEntities: [IEntity] = entities.filter(badge.matchFunc);

			if (matchingEntities.length > 0) {
				let entry = {
					id: badge.id,
					icon: badge.iconFunc(matchingEntities),
					label: badge.labelFunc(matchingEntities),
					status: badge.statusFunc(matchingEntities),
					entities: matchingEntities.map((entity) => entity.entity_id),
				};

				added_ids.push(badge.id);
				result.push(entry);
			}
		});

		return result;
	}, [entities]);

	return (
		<div
			className={cx(
				"w-full h-16",
				"border-t border-gray",
				"flex items-center",
				"gap-x-2 px-8",
				"bg-gray/20 backdrop-blur-sm",
				"overflow-y-hidden overflow-x-scroll"
			)}
		>
			<Modal open={selected != null} title={selected?.label} onClose={() => setSelected(null)}>
				<div className="grid grid-cols-3 gap-5 relative cards-grid">
					{selected != null ?
						<Entities entities={selected.entities} />
						: null}
				</div>
			</Modal>

			<AnimatePresence>
				{calculatedBadges.map((badge) => {
					return (
						<Badge
							icon={badge.icon}
							meta={badge.label}
							key={badge.id}
							onClick={() => setSelected(badge)}
						>
							{badge.status}
						</Badge>
					);
				})}
			</AnimatePresence>

			<Badge to="/settings" icon="gear" meta="Settings" />
		</div>
	);

};

export default Footer;

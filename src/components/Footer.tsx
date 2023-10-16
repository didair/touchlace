import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { Entity as EntityInterface } from "types";
import { getEntityType, getEntitySettings } from "lib/entity";
import { useGetStatesQuery } from "services/states/api";
import cx from 'classnames';

import Badge from "./Badge";

const badgeTypes = [
	{
		id: 'active_media',
		labelFunc: (matchingEntities: [EntityInterface]) => 'Active Media',
		statusFunc: (matchingEntities: [EntityInterface]) => {
			return `${matchingEntities.length} Playing`;
		},
		iconFunc: (matchingEntities: [EntityInterface]) => 'speaker',
		matchFunc: (entity: EntityInterface) => {
			return getEntityType(entity) == 'media_player' && entity.state == 'playing';
		},
	},
	{
		id: 'open_doors',
		labelFunc: (matchingEntities: [EntityInterface]) => `Doors`,
		statusFunc: (matchingEntities: [EntityInterface]) => {
			return `${matchingEntities.length} open doors`;
		},
		iconFunc: (matchingEntities: [EntityInterface]) => 'door-open',
		matchFunc: (entity: EntityInterface) => {
			return getEntityType(entity) == 'binary_sensor' &&
			entity.state == 'on' &&
			getEntitySettings(entity.entity_id)?.sensorType == 'door'
		},
	},
	{
		id: 'open_doors',
		labelFunc: (matchingEntities: [EntityInterface]) => `Doors`,
		statusFunc: (matchingEntities: [EntityInterface]) => {
			return `All doors closed`;
		},
		iconFunc: (matchingEntities: [EntityInterface]) => 'door-closed',
		matchFunc: (entity: EntityInterface) => {
			return getEntityType(entity) == 'binary_sensor' &&
			entity.state == 'off' &&
			getEntitySettings(entity.entity_id)?.sensorType == 'door'
		},
	},
	{
		id: 'temperature',
		labelFunc: (matchingEntities: [EntityInterface]) => `Temperature`,
		statusFunc: (matchingEntities: [EntityInterface]) => {
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
		iconFunc: (matchingEntities: [EntityInterface]) => 'temperature-three-quarters',
		matchFunc: (entity: EntityInterface) => {
			return getEntityType(entity) == 'sensor' &&
			getEntitySettings(entity.entity_id)?.sensorType == 'temperature'
		},
	},

];

const Footer = () => {
	const { data: entities } = useGetStatesQuery();

	const calculatedBadges = useMemo(() => {
		let result = [];
		let added_ids = [];

		if (entities == null) return result;

		badgeTypes.forEach((badge) => {
			if (added_ids.includes(badge.id)) {
				return false;
			}

			const matchingEntities = entities.filter(badge.matchFunc);

			if (matchingEntities.length > 0) {
				let entry = {
					id: badge.id,
					icon: badge.iconFunc(matchingEntities),
					label: badge.labelFunc(matchingEntities),
					status: badge.statusFunc(matchingEntities),
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
			<AnimatePresence>
				{calculatedBadges.map((badge) => {
					return (
						<Badge to="/" icon={badge.icon} meta={badge.label} key={badge.id}>
							{badge.status}
						</Badge>
					);
				})}
			</AnimatePresence>

			<Badge to="/settings" icon="gear" meta="Settings" />
		</div>
	);

}

export default Footer;

import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Entity as EntityInterface } from "types";
import { getEntityType } from "lib/entity";
import { useGetStatesQuery } from "services/states/api";
import cx from 'classnames';

import Badge from "./Badge";
import Entities from "./Entities";

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
];

const Footer = () => {
	const { data: entities } = useGetStatesQuery();
	const topBarEntities: [EntityInterface] = useSelector((state) => state.settings.topEntities);

	const calculatedBadges = useMemo(() => {
		let result = [];

		if (entities == null) return result;

		badgeTypes.forEach((badge) => {
			const matchingEntities = entities.filter(badge.matchFunc);

			if (matchingEntities.length > 0) {
				let entry = {
					id: badge.id,
					icon: badge.iconFunc(matchingEntities),
					label: badge.labelFunc(matchingEntities),
					status: badge.statusFunc(matchingEntities),
				};

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

			{topBarEntities?.length > 0 ?
				<Entities
					entities={topBarEntities.filter((entity_id) =>
						entity_id.indexOf('sensor') > -1
					)}
				/>
			: null}

			<Badge to="/settings" icon="gear" meta="Settings" />
		</div>
	);

}

export default Footer;

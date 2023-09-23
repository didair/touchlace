import { useMemo } from "react";
import { useGetStatesQuery } from "services/states/api";
import { useSelector } from "react-redux";

import Entities from "components/Entities";
import FoldersContainer from "components/FoldersContainer";
import FolderContainer from "components/FolderContainer";

const Home = () => {
	const { data: entities } = useGetStatesQuery();
	const rooms = useSelector((state) => state.rooms.list);
	const favorites = useSelector((state) => state.settings.favorites);

	const sections = useMemo(() => {
		let sections = [];
		if (entities == null) return sections;

		if (favorites != null && favorites.length > 0) {
			sections.push({
				title: 'Favorites',
				entities: favorites,
			});
		}

		const media_players = entities.filter((entity) => entity.entity_id.includes('media_player.'));

		if (media_players != null && media_players.length > 0) {
			sections.push({
				title: 'Media',
				entities: media_players
					.filter((entity) => entity.state != 'unavailable' && entity.state != 'idle' && entity.state != 'off')
					.map((entity) => entity.entity_id),
			});
		}

		return sections;
	}, [entities, favorites]);

	return (
		<FoldersContainer>
			{sections.map((section) =>
				<FolderContainer title={section.title} key={section.title}>
					<Entities entities={section.entities} />
				</FolderContainer>
			)}

			{/* {topBarEntities?.length > 0 ?
				<div className="mb-6">
					<div className="flex gap-2">
						<Entities
							entities={topBarEntities.filter((entity_id) =>
								entity_id.indexOf('sensor') > -1
							)}
						/>
					</div>
				</div>
			: null} */}

		</FoldersContainer>
	);
}

export default Home;
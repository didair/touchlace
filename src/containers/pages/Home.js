import { useMemo } from "react";
import { useGetStatesQuery } from "services/states/api";
import { useSelector } from "react-redux";

import Entities from "components/Entities";
import FoldersContainer from "components/FoldersContainer";
import FolderContainer from "components/FolderContainer";

const Home = () => {
	const { data: entities } = useGetStatesQuery();
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

		const media_players = entities
			.filter((entity) => entity.entity_id.includes('media_player.'))
			.filter((entity) =>
				entity.state != 'unavailable' &&
				entity.state != 'idle' &&
				entity.state != 'off' &&
				entity.attributes.entity_picture != null
			);

		if (media_players != null && media_players.length > 0) {
			sections.push({
				title: 'Media',
				entities: media_players.map((entity) => entity.entity_id),
			});
		}

		const scenes = entities?.filter((entity) => entity.entity_id.includes('scene.'));
		if (scenes != null && scenes.length > 0) {
			sections.push({
				title: 'Automations',
				entities: scenes.map((entity) => entity.entity_id),
			});
		}

		return sections;
	}, [entities, favorites]);

	if (sections.length == 0) {
		return null;
	}

	return (
		<FoldersContainer>
			{sections.map((section) =>
				<FolderContainer title={section.title} key={section.title}>
					<Entities entities={section.entities} />
				</FolderContainer>
			)}
		</FoldersContainer>
	);
}

export default Home;
import { useMemo } from "react";
import { useGetStatesQuery } from "services/states/api";

import Entities from "components/Entities";
import FoldersContainer from "components/FoldersContainer";
import FolderContainer from "components/FolderContainer";

const Media = () => {
	const { data: entities } = useGetStatesQuery();

	const sections = useMemo(() => {
		let sections = [];
		if (entities == null) return sections;

		const media_players = entities.filter((entity) => entity.entity_id.includes('media_player.'));

		if (media_players != null && media_players.length > 0) {
			sections.push({
				title: 'Media',
				entities: media_players
					.filter((entity) => entity.state != 'unavailable')
					.map((entity) => entity.entity_id),
			});
		}

		return sections;
	}, [entities]);

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

export default Media;
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Entities from "components/Entities";
import FolderContainer from "components/FolderContainer";
import FoldersContainer from "components/FoldersContainer";

const Room = (props) => {
	const { id } = useParams();
	const rooms = useSelector((state) => state.rooms.list);
	const room = useMemo(() => {
		return rooms.find((room) => room.id == id);
	}, [rooms, id]);

	const devices = useMemo(() => {
		if (room == null) return null;

		return room.entities.filter((entity_id) => {
			return entity_id.includes('light.') || entity_id.includes('switch.');
		});
	}, [room]);

	const climate = useMemo(() => {
		if (room == null) return null;

		return room.entities.filter((entity_id) => {
			return entity_id.includes('cover.');
		});
	}, [room]);

	const media = useMemo(() => {
		if (room == null) return null;

		return room.entities.filter((entity_id) => {
			return entity_id.includes('media_player.');
		});
	}, [room]);

	if (room == null) {
		return null;
	}

	return (
		<FoldersContainer>
			{climate != null && climate.length > 0 ?
				<FolderContainer title="Climate">
					<Entities entities={climate} />
				</FolderContainer>
			: null}

			{devices != null && devices.length > 0 ?
				<FolderContainer title="Devices">
					<Entities entities={devices} />
				</FolderContainer>
			: null}

			{media != null && media.length > 0 ?
				<FolderContainer title="Media">
					<Entities entities={media} />
				</FolderContainer>
			: null}
		</FoldersContainer>
	);

};

export default Room;
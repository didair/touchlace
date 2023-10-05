import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Entities from "components/Entities";
import FolderContainer from "components/FolderContainer";
import FoldersContainer from "components/FoldersContainer";

const Room = (props) => {
	const { id } = useParams();
	const [currentRoom, setCurrentRoom] = useState(null);
	const rooms = useSelector((state) => state.rooms.list);
	const room = useMemo(() => {
		return rooms.find((room) => room.id == currentRoom);
	}, [rooms, currentRoom]);

	useEffect(() => {
		if (id != currentRoom) {
			setCurrentRoom(null);
			setTimeout(() => { // Animation timing
				setCurrentRoom(id);
			}, 50);
		}
	}, [id]);

	const lights = useMemo(() => {
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

	if (currentRoom == null) {
		return null;
	}

	return (
		<FoldersContainer>
			{climate != null && climate.length > 0 ?
				<FolderContainer title="Climate" key="climate">
					<Entities entities={climate} />
				</FolderContainer>
			: null}

			{lights != null && lights.length > 0 ?
				<FolderContainer title="Lights" key="lights">
					<Entities entities={lights} />
				</FolderContainer>
			: null}

			{media != null && media.length > 0 ?
				<FolderContainer title="Media" key="media">
					<Entities entities={media} />
				</FolderContainer>
			: null}
		</FoldersContainer>
	);

};

export default Room;
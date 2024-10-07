import { useGetStatesQuery } from "services/states/api";
import { useSelector } from "react-redux";
import { IEntity, IRoom } from "types";
import { useMemo } from "react";

import FoldersContainer from "components/FoldersContainer";
import FolderContainer from "components/FolderContainer";
import Entity from "components/Entity";

const Cleaning = () => {
	const { data: entities }: { data?: IEntity[] } = useGetStatesQuery();
	const rooms: IRoom[] = useSelector((state) => state.rooms.list);

	const roomsWithVacuums = useMemo(() => {
		const found = rooms.filter((room) => {
			return room.entities?.find((entity_id) => {
				return entity_id.includes('vacuum.');
			});
		});

		return found.map((room) => {
			return {
				...room,
				entities: room.entities?.map((entity_id) => {
					return entities?.find((entity) => entity.entity_id == entity_id);
				}),
			};
		});
	}, [rooms, entities]);

	return (
		<FoldersContainer>
			{roomsWithVacuums?.map((room) => {
				return (
					<FolderContainer title={room.name} key={room.id}>
						{room.entities?.map((entity) => {
							if (entity == null) return null;
							return (
								<Entity entity={entity} key={entity.entity_id} />
							);
						})}
					</FolderContainer>
				);
			})}
		</FoldersContainer>
	);

};

export default Cleaning;

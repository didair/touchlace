import { useGetStatesQuery } from "services/states/api";
import { useSelector } from "react-redux";

import Entities from "components/Entities";
import FoldersContainer from "components/FoldersContainer";
import FolderContainer from "components/FolderContainer";

const Devices = () => {
	const { data: entities } = useGetStatesQuery();
	const rooms = useSelector((state) => state.rooms.list);

	if (entities == null) {
		return null;
	}

	return (
		<FoldersContainer>
			<FolderContainer title="Favorites">
				<Entities entities={rooms[2].entities} />
			</FolderContainer>

			<FolderContainer title="Favorites">
				<Entities entities={rooms[2].entities} />
			</FolderContainer>

			<FolderContainer title="Favorites">
				<Entities entities={rooms[2].entities} />
			</FolderContainer>

			<FolderContainer title="Favorites">
				<Entities entities={rooms[2].entities} />
			</FolderContainer>

			<FolderContainer title="Favorites">
				<Entities entities={rooms[2].entities} />
			</FolderContainer>

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

			{/* <Grid>
				{rooms.map((room) => {
					return (
						<Room
							key={room.id}
							{...room}
						/>
					);
				})}
			</Grid> */}
		</FoldersContainer>
	);
}

export default Devices;
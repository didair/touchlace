import { useGetConfigQuery } from "services/config/api";
import { useGetStatesQuery } from "services/states/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Room from 'components/Room';
import Masonry from "components/Masonry";
import Icon from "components/Icon";

const Devices = () => {
	const { data: config } = useGetConfigQuery();
	const { data: entities } = useGetStatesQuery();
	const rooms = useSelector((state) => state.rooms.list);

	if (entities == null) {
		return null;
	}

	return (
		<div>
			{config != null ?
				<h1 className="text-5xl">{config.location_name}</h1>
			: null}

			<h3 className="text-xl mt-1 mb-4">Got states from {entities.length} devices</h3>

			{rooms.length == 0 ?
				<div className="my-40 flex items-center justify-center text-xl">
					<span className="mr-2 text-xl">
						<Icon name="circle-plus" />
					</span>
					Get started by adding a room in <Link to="/settings" className="font-bold ml-1 underline decoration-green">settings</Link>
				</div>
			: null}

			<Masonry>
				{rooms.map((room) => {
					return (
						<Room
							key={room.id}
							{...room}
						/>
					);
				})}
			</Masonry>
		</div>
	);
}

export default Devices;
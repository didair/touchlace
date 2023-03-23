import { useGetConfigQuery } from "services/config/api";
import { useGetStatesQuery } from "services/states/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Room from 'components/Room';
import Grid from "components/Grid";
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
				<h1 className="text-5xl mb-6">{config.location_name}</h1>
			: null}

			{rooms.length == 0 ?
				<div className="my-40 flex items-center justify-center text-xl">
					<span className="mr-2 text-xl">
						<Icon name="circle-plus" />
					</span>

					Get started by adding a room in <Link to="/settings" className="font-bold ml-1 underline decoration-green">settings</Link>
				</div>
			: null}

			<Grid>
				{rooms.map((room) => {
					return (
						<Room
							key={room.id}
							{...room}
						/>
					);
				})}
			</Grid>

			<div className="mt-6">
				<Link to="/settings" className="p-2 px-4 border border-light-gray rounded-md">
					<Icon name="gear" className="mr-2" />
					Settings
				</Link>
			</div>
		</div>
	);
}

export default Devices;
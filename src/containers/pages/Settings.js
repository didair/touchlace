import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, deleteRoom, updateRoom } from "services/rooms/slice";
import { v4 as uuidv4 } from 'uuid';

import Masonry from "components/Masonry";
import Room from "components/Room";
import Icon from "components/Icon";
import Modal from "components/Modal";
import RoomForm from "components/Forms/RoomForm";

const Settings = () => {
	const dispatch = useDispatch();
	const [room, setSelectedRoom] = useState(null);
	const rooms = useSelector((state) => state.rooms.list);

	const onRoomSubmit = (values) => new Promise((resolve) => {
		if (values.id == null || values.id == 'new') {
			values.id = uuidv4();
			dispatch(createRoom(values));
		} else {
			dispatch(updateRoom(values));
		}

		setSelectedRoom(null);
		resolve(1);
	});

	const onRoomDelete = (room) => {
		const confirm = window.confirm('Are you sure?');
		if (confirm) {
			dispatch(deleteRoom(room));
		}
	};

	return (
		<div>
			<Modal open={room != null} onClose={() => setSelectedRoom(null)}>
				<div className="mb-4">
					{room != null ?
						<h3 className="text-2xl">
							{room.id == 'new' ? 'Create room' : room.name}
						</h3>
					: null}
				</div>

				<RoomForm initialValues={room} onSubmit={onRoomSubmit} />
			</Modal>

			<h1 className="text-5xl">Settings</h1>

			<div>
				<h2 className="text-2xl flex items-center mb-4">
					Rooms
					<span className="ml-2 cursor-pointer" onClick={() => setSelectedRoom({
						id: 'new',
					})}>
						<Icon name="circle-plus" />
					</span>
				</h2>

				<Masonry>
					{rooms.map((room) => {
						return (
							<Room
								key={room.id}
								onEdit={() => setSelectedRoom(room)}
								onDelete={() => onRoomDelete(room)}
								showSettings={true}
								{...room}
							/>
						);
					})}
				</Masonry>
			</div>
		</div>
	);

};

export default Settings;
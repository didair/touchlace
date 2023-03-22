import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, deleteRoom, updateRoom, moveRoom } from "services/rooms/slice";
import { useGetStatesQuery } from "services/states/api";
import { v4 as uuidv4 } from 'uuid';

import Grid from "components/Grid";
import Room from "components/Room";
import Icon from "components/Icon";
import Modal from "components/Modal";
import RoomForm from "components/Forms/RoomForm";

const Settings = () => {
	const dispatch = useDispatch();
	const { data: entities } = useGetStatesQuery();
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

	const onMoveRoom = (room, direction = 'left') => {
		const currentIndex = rooms.findIndex((_r) => _r.id === room.id);
		const newIndex = direction == 'left' ? currentIndex - 1 : currentIndex + 1;

		if (newIndex >= 0 && newIndex <= rooms.length) {
			dispatch(moveRoom({
				from: currentIndex,
				to: newIndex,
			}));
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
			{entities != null ?
				<h3 className="text-xl mt-1 mb-4">Got states from {entities.length} devices</h3>
			: null}

			<div>
				<h2 className="text-2xl flex items-center mb-4">
					Rooms
					<span className="ml-2 cursor-pointer" onClick={() => setSelectedRoom({
						id: 'new',
					})}>
						<Icon name="circle-plus" />
					</span>
				</h2>

				<Grid>
					{rooms.map((room, index) => {
						return (
							<Room
								key={room.id}
								onEdit={() => setSelectedRoom(room)}
								onDelete={() => onRoomDelete(room)}
								moveLeft={() => onMoveRoom(room)}
								moveRight={() => onMoveRoom(room, 'right')}
								showSettings={true}
								index={index}
								{...room}
							/>
						);
					})}
				</Grid>
			</div>
		</div>
	);

};

export default Settings;
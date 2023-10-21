import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, deleteRoom, updateRoom, moveRoom } from "services/rooms/slice";
import { useGetStatesQuery } from "services/states/api";
import { v4 as uuidv4 } from 'uuid';

import Icon from "components/Icon";
import Modal from "components/Modal";
import RoomForm from "components/Forms/RoomForm";

const Settings = () => {
	const dispatch = useDispatch();
	const { data: entities } = useGetStatesQuery();
	const [room, setSelectedRoom] = useState(null);
	const rooms = useSelector((state) => state.rooms.list);
	const unavailable = entities != null ? entities.filter((ent) => ent.state === 'unavailable').length : 0;

	const onRoomSubmit = (values) => new Promise((resolve) => {
		if (values.id == null || values.id == 'new') {
			values.id = uuidv4();
			if (values.entities == null) {
				values.entities = [];
			}

			dispatch(createRoom(values));
		} else {
			// Clear out entities not found in entities data
			values.entities = values.entities.filter((entity_id) => {
				return entities.find((entity) => entity.entity_id == entity_id) != null;
			});

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
		<div className="px-8 h-full overflow-y-scroll">
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

			<h1 className="text-5xl mb-6">
				Settings
			</h1>

			{entities != null ?
				<h3 className="text-lg mt-1 mb-4">
					<Icon name="circle-info" className="mr-2" />
					Got states from {entities.length} devices

					{unavailable > 0 ?
						<span className="ml-4">
							<Icon name="triangle-exclamation" className="mr-2" />
							{unavailable} unavailable devices
						</span>
					: null}
				</h3>
			: null}

			<div className="mt-8">
				<h2 className="text-3xl flex items-center mb-4">
					Rooms

					<span className="ml-2 cursor-pointer text-xl" onClick={() => setSelectedRoom({
						id: 'new',
					})}>
						<Icon name="circle-plus" />
					</span>
				</h2>

				{rooms.map((room, index) => {
					return (
						<div className="flex items-center justify-between mb-2 pb-2 border-b border-b-gray/60">
							<div className="flex items-center gap-x-4">
								<h3 className="text-2xl font-semibold">
									{room.name}
								</h3>

								<div className="bg-green text-dark py-1 px-2 text-sm rounded-full">
									{room.entities.length} entities
								</div>
							</div>

							<div className="text-2xl flex items-center gap-x-5">
								<span className="cursor-pointer" onClick={() => onMoveRoom(room)}>
									<Icon name="arrow-up" />
								</span>

								<span className="cursor-pointer" onClick={() => onMoveRoom(room, 'right')}>
									<Icon name="arrow-down" />
								</span>

								<span className="cursor-pointer" onClick={() => setSelectedRoom(room)}>
									<Icon name="pen" />
								</span>

								<span className="cursor-pointer" onClick={() => onRoomDelete(room)}>
									<Icon name="trash-can" />
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);

};

export default Settings;
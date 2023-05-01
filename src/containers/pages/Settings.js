import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTopEntities } from "services/settings/slice";
import { createRoom, deleteRoom, updateRoom, moveRoom } from "services/rooms/slice";
import { useGetStatesQuery } from "services/states/api";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import Entities from "components/Entities";
import Grid from "components/Grid";
import Room from "components/Room";
import Icon from "components/Icon";
import Modal from "components/Modal";
import RoomForm from "components/Forms/RoomForm";
import TopBarForm from "components/Forms/TopBarForm";

const Settings = () => {
	const dispatch = useDispatch();
	const { data: entities } = useGetStatesQuery();
	const [room, setSelectedRoom] = useState(null);
	const [editTopBar, setEditTopBar] = useState(false);
	const rooms = useSelector((state) => state.rooms.list);
	const topBarEntities = useSelector((state) => state.settings.topEntities);
	const unavailable = entities != null ? entities.filter((ent) => ent.state === 'unavailable').length : 0;

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

	const onTopBarSubmit = (values) => new Promise((resolve) => {
		dispatch(setTopEntities(values.entities));
		setEditTopBar(false);
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

			<Modal open={editTopBar} onClose={() => setEditTopBar(false)}>
				<div className="mb-4">
					<h3 className="text-2xl">Devices</h3>
				</div>

				<TopBarForm
					onSubmit={onTopBarSubmit}
					initialValues={{
						entities: topBarEntities
					}}
				/>
			</Modal>

			<Link to="/" className="flex items-center text-3xl mb-6">
				<span style={{ position: 'relative', top: 2 }}>
					<Icon name="arrow-left" />
				</span>

				<h1 className="text-5xl ml-2">
					Settings
				</h1>
			</Link>

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

			<div>
				<h2 className="text-3xl flex items-center mb-4">
					Devices

					<span className="ml-2 cursor-pointer text-xl" onClick={() => setEditTopBar(true)}>
						<Icon name="pen" />
					</span>
				</h2>

				<div className="flex gap-2 mb-6">
					<Entities
						entities={topBarEntities?.filter((entity_id) =>
							entity_id.indexOf('sensor') > -1
						)}
					/>
				</div>
			</div>

			<div className="mt-8">
				<h2 className="text-3xl flex items-center mb-4">
					Rooms

					<span className="ml-2 cursor-pointer text-xl" onClick={() => setSelectedRoom({
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
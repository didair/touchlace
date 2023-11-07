import { IDropdownItem } from "components/Dropdown";
import { createPortal } from "react-dom";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, deleteRoom, updateRoom, moveRoom } from "services/rooms/slice";
import { addGroup, updateGroup, deleteGroup } from "services/settings/slice";
import { useGetStatesQuery } from "services/states/api";
import { v4 as uuidv4 } from 'uuid';

import Icon from "components/Icon";
import Modal from "components/Modal";
import RoomForm from "components/Forms/RoomForm";
import GroupForm from "components/Forms/GroupForm";
import Dropdown from "components/Dropdown";

const Settings = () => {
	const dispatch = useDispatch();
	const { data: entities } = useGetStatesQuery();
	const [room, setSelectedRoom] = useState(null);
	const [group, setSelectedGroup] = useState(null);
	const rooms = useSelector((state) => state.rooms.list);
	const groups = useSelector((state) => state.settings.groups);
	const unavailable = entities != null ? entities.filter((ent) => ent.state === 'unavailable').length : 0;

	const dropdownItems = useMemo<IDropdownItem[]>(() => {
		return [
			{
				label: 'Change HASS base url',
				icon: 'rotate',
				onClick: () => {
					const confirm = window.confirm('You will be taken to the setup screen but all settings will be kept. OK?');
					if (confirm) {
						localStorage.removeItem('touchlace-base-uri');
						localStorage.removeItem('hassTokens');

						// Replace this redirect l8er
						window.location = '/setup';
					}
				},
			},
			{
				label: 'Reset all settings',
				icon: 'triangle-exclamation',
				onClick: () => {
					const confirm = window.confirm('This will clear all settings made and redirect you to the setup screen! Proceed?');
					if (confirm) {
						localStorage.removeItem('touchlace-base-uri');
						localStorage.removeItem('hassTokens');
						localStorage.removeItem('persist:root');

						// Replace this redirect l8er
						window.location = '/setup';
					}
				},
			},
		];
	}, []);

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

	const onGroupSubmit = (values) => new Promise((resolve) => {
		if (values.id == null || values.id == 'new') {
			values.id = uuidv4();
			if (values.entities == null) {
				values.entities = [];
			}

			dispatch(addGroup(values));
		} else {
			// Clear out entities not found in entities data
			values.entities = values.entities.filter((entity_id) => {
				return entities.find((entity) => entity.entity_id == entity_id) != null;
			});

			dispatch(updateGroup(values));
		}

		setSelectedGroup(null);
		resolve(1);
	});

	const onGroupDelete = (group) => {
		const confirm = window.confirm('Are you sure?');
		if (confirm) {
			dispatch(deleteGroup(group));
		}
	};

	return (
		<div className="px-8 h-full overflow-y-scroll">
			{createPortal((
				<Dropdown items={dropdownItems}>
					<div className="cursor-pointer flex items-center">
						<Icon name="wrench" className="mr-2" /> Tools
					</div>
				</Dropdown>
			), document.getElementById('header-right') ?? document.body)}

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

			<Modal open={group != null} onClose={() => setSelectedGroup(null)}>
				<div className="mb-4">
					{group != null ?
						<h3 className="text-2xl">
							{group.id == 'new' ? 'Create group' : group.name}
						</h3>
					: null}
				</div>

				<GroupForm initialValues={group} onSubmit={onGroupSubmit} />
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

				{rooms?.map((room, index) => {
					return (
						<div className="flex items-center justify-between mb-2 pb-2 border-b border-b-gray/60" key={room.id}>
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

			<div className="mt-8">
				<h2 className="text-3xl flex items-center mb-4">
					Groups

					<span className="ml-2 cursor-pointer text-xl" onClick={() => setSelectedGroup({
						id: 'new',
					})}>
						<Icon name="circle-plus" />
					</span>
				</h2>

				{groups?.map((group, index) => {
					return (
						<div className="flex items-center justify-between mb-2 pb-2 border-b border-b-gray/60" key={group.id}>
							<div className="flex items-center gap-x-4">
								<h3 className="text-2xl font-semibold">
									{group.name}
								</h3>

								<div className="bg-green text-dark py-1 px-2 text-sm rounded-full">
									{group.entities.length} entities
								</div>
							</div>

							<div className="text-2xl flex items-center gap-x-5">
								<span className="cursor-pointer" onClick={() => setSelectedGroup(group)}>
									<Icon name="pen" />
								</span>

								<span className="cursor-pointer" onClick={() => onGroupDelete(group)}>
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
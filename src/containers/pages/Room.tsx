import { IRoom } from "types";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setEntityRoom } from "services/rooms/slice";

import Entities from "components/Entities";
import FolderContainer from "components/FolderContainer";
import FoldersContainer from "components/FoldersContainer";
import Icon from "components/Icon";
import Dropdown, { IDropdownItem } from "components/Dropdown";
import Modal from "components/Modal";
import RoomAddEntityForm from "components/Forms/RoomAddEntityForm";

const Room = (props) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [currentRoom, setCurrentRoom] = useState(null);
	const [form, setForm] = useState(null);
	const [isOpen, setOpen] = useState(false);
	const rooms: [IRoom] = useSelector((state) => state.rooms.list);

	const room = useMemo(() => {
		return rooms.find((room) => room.id == currentRoom);
	}, [rooms, currentRoom]);

	console.log('room', room);

	useEffect(() => {
		if (id != currentRoom) {
			setCurrentRoom(null);
			setTimeout(() => { // Animation (FoldersContainer stagger) timing
				setCurrentRoom(id);
			}, 25);
		}
	}, [id]);

	const lights = useMemo(() => {
		if (room == null) return [];

		return room.entities.filter((entity_id) => {
			if (entity_id == null) {
				console.log('entity id  null', entity_id);
			}
			return entity_id.includes('light.') || entity_id.includes('switch.');
		});
	}, [room]);

	const climate = useMemo(() => {
		if (room == null) return [];

		return room.entities.filter((entity_id) => {
			return entity_id.includes('cover.') || entity_id.includes('sensor.');
		});
	}, [room]);

	const media = useMemo(() => {
		if (room == null) return [];

		return room.entities.filter((entity_id) => {
			return entity_id.includes('media_player.');
		});
	}, [room]);

	const scenes = useMemo(() => {
		if (room == null) return [];

		return room.entities.filter((entity_id) => {
			return entity_id.includes('scene.');
		});
	}, [room]);

	const cleaning = useMemo(() => {
		if (room == null) return [];

		return room.entities.filter((entity_id) => {
			return entity_id.includes('vacuum.');
		});
	}, [room]);

	const items = useMemo<IDropdownItem[]>(() => {
		return [
			{
				label: 'Light',
				icon: 'circle-plus',
				onClick: () => { setForm('light'); setOpen(true) },
			},
			{
				label: 'Media Player',
				icon: 'circle-plus',
				onClick: () => { setForm('media_player'); setOpen(true) },
			},
			{
				label: 'Sensor',
				icon: 'circle-plus',
				onClick: () => { setForm('sensor'); setOpen(true) },
			},
			{
				label: 'Cover',
				icon: 'circle-plus',
				onClick: () => { setForm('cover'); setOpen(true) },
			},
			{
				label: 'Vacuum',
				icon: 'circle-plus',
				onClick: () => { setForm('vacuum'); setOpen(true) },
			},
		];
	}, [room]);

	const onAddEntity = ({ entity }) => {
		dispatch(setEntityRoom({
			roomId: id,
			entityId: entity.entity_id,
		}));

		setOpen(false);
	};

	if (currentRoom == null) {
		return null;
	}

	return (
		<>
			{createPortal((
				<Dropdown items={items}>
					<Icon name="circle-plus" className="text-xl cursor-pointer" />
				</Dropdown>
			), document.getElementById('header-right'))}

			<FoldersContainer>
				{climate.length > 0 ?
					<FolderContainer title="Climate" key={room.id + "climate"}>
						<Entities entities={climate} />
					</FolderContainer>
				: null}

				{lights.length > 0 ?
					<FolderContainer title="Lights" key={room.id + "lights"}>
						<Entities entities={lights} />
					</FolderContainer>
				: null}

				{cleaning.length > 0 ?
					<FolderContainer title="Cleaning" key={room.id + "cleaning"}>
						<Entities entities={cleaning} />
					</FolderContainer>
				: null}

				{media.length > 0 ?
					<FolderContainer title="Media" key={room.id + "media"}>
						<Entities entities={media} />
					</FolderContainer>
				: null}

				{scenes.length > 0 ?
					<FolderContainer title="Scenes" key={room.id + "scenes"}>
						<Entities entities={scenes} />
					</FolderContainer>
				: null}
			</FoldersContainer>

			<Modal open={form != null && isOpen} onClose={() => setOpen(false)} type="small fromBottom" title={`Add ` + form?.replace('_', ' ')}>
				<RoomAddEntityForm
					onSubmit={onAddEntity}
					type={form}
				/>
			</Modal>
		</>
	);

};

export default Room;
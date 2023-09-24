import { Entity as EntityInterface, EntitySettings as EntitySettingsInterface } from 'types';
import { useSelector, useDispatch } from "react-redux";
import { setEntitySettings } from "services/settings/slice";
import { setEntityRoom } from "services/rooms/slice";
import Input from 'components/Inputs/Input';
import Select from 'components/Inputs/Select';
import IconSelect from "components/Inputs/IconSelect";
import React, { useMemo } from "react";
import { _clone } from 'lib/store';

const EntitySettings = ({ entity }: { entity: EntityInterface }) => {
	const dispatch = useDispatch();
	const setSettings = (value) => dispatch(setEntitySettings(value));
	const rooms = useSelector((state) => state.rooms.list);

	const entitySettings: EntitySettingsInterface = useSelector((state) => {
		return state.settings.entities.find((_ent) => _ent.entity_id == entity.entity_id)
	});

	const entityRoom = useMemo(() => {
		return rooms.find((room) => room.entities?.find((entity_id) =>
			entity_id == entity.entity_id
		));
	}, [entity, rooms]);

	const updateName = (event) => {
		setSettings({
			...entitySettings,
			entity_id: entity.entity_id,
			name: event.target.value,
		});
	};

	const updateNote = (event) => {
		setSettings({
			...entitySettings,
			entity_id: entity.entity_id,
			note: event.target.value,
		});
	};

	const updateIcon = (icon) => {
		setSettings({
			...entitySettings,
			entity_id: entity.entity_id,
			icon,
		});
	};

	const onRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setEntityRoom({
			roomId: event.target.value,
			entityId: entity.entity_id,
		}));
	};

	return (
		<div className="mt-4">
			<label htmlFor="name" className="block mb-2">Entity name</label>

			<Input
				id="name"
				value={entitySettings?.name ?? ''}
				placeholder="Light"
				onChange={updateName}
			/>

			<label htmlFor="note" className="block mb-2">Entity note</label>

			<Input
				id="note"
				value={entitySettings?.note ?? ''}
				placeholder="Hallway"
				onChange={updateNote}
			/>

			<IconSelect
				onSelect={updateIcon}
				entity={entity}
				value={entitySettings?.icon ?? null}
			/>

			<Select label="Room" onChange={onRoomChange} value={entityRoom?.id}>
				<option value="">Select room</option>
				{rooms.map((room) => {
					return <option key={room.id} value={room.id}>
						{room.name}
					</option>
				})}
			</Select>

			<label className="block mt-4 mb-2">Entity ID</label>
			<code className="block p-2 border border-gray/40 bg-gray/10 rounded-md">
				{entity.entity_id}
			</code>
		</div>
	);
};

export default EntitySettings;
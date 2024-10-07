import { IEntity, IEntitySettings } from 'types';
import { useSelector, useDispatch } from "react-redux";
import { setEntitySettings } from "services/settings/slice";
import { setEntityRoom } from "services/rooms/slice";
import Input from 'components/Inputs/Input';
import Select from 'components/Inputs/Select';
import IconSelect from "components/Inputs/IconSelect";
import React, { useMemo } from "react";
import ImageSelect from 'components/Inputs/ImageSelect';
import { getEntityType } from 'lib/entity';

const EntitySettings = ({ entity, hideRoomInput = false }: { entity: IEntity }) => {
	const dispatch = useDispatch();
	const setSettings = (value) => dispatch(setEntitySettings(value));
	const entity_type = getEntityType(entity);
	const rooms = useSelector((state) => state.rooms.list);

	const entitySettings: IEntitySettings = useSelector((state) => {
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

	const updateImage = (image) => {
		setSettings({
			...entitySettings,
			entity_id: entity.entity_id,
			backgroundImageId: image,
		});
	};

	const onRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setEntityRoom({
			roomId: event.target.value,
			entityId: entity.entity_id,
		}));
	};

	const onSensorTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSettings({
			...entitySettings,
			entityId: entity.entity_id,
			sensorType: event.target.value,
		}));
	};

	return (
		<div>
			<label htmlFor="name" className="block mb-2 font-bold">Entity name</label>

			<Input
				id="name"
				value={entitySettings?.name ?? ''}
				placeholder="Light"
				onChange={updateName}
			/>

			<label htmlFor="note" className="block mb-2 font-bold">Entity note</label>

			<Input
				id="note"
				value={entitySettings?.note ?? ''}
				placeholder="Hallway"
				onChange={updateNote}
			/>

			{entity_type != 'vacuum' ?
				<IconSelect
					onSelect={updateIcon}
					entity={entity}
					value={entitySettings?.icon ?? null}
				/>
			: null}

			{entity_type != 'vacuum' ?
				<ImageSelect
					onSelect={updateImage}
					settings={entitySettings}
				/>
			: null}

			{!hideRoomInput ?
				<Select label="Room" onChange={onRoomChange} value={entityRoom?.id}>
					<option value="">Select room</option>
					{rooms.map((room) => {
						return <option key={room.id} value={room.id}>
							{room.name}
						</option>
					})}
				</Select>
			: null}

			{entity_type == 'binary_sensor' ?
				<Select label="Sensor type" onChange={onSensorTypeChange} value={entitySettings?.sensorType}>
					<option value="">Select type</option>
					<option value="door">Door</option>
					<option value="lock">Lock</option>
					<option value="window">Window</option>
				</Select>
			: null}

			{entity_type == 'sensor' ?
				<Select label="Sensor type" onChange={onSensorTypeChange} value={entitySettings?.sensorType}>
					<option value="">Select type</option>
					<option value="temperature">Temperature</option>
					<option value="price">Price</option>
				</Select>
			: null}

			<label className="block mt-4 mb-2 font-bold">Entity ID</label>
			<code className="block p-2 border border-gray/40 bg-gray/10 rounded-md overflow-x-scroll whitespace-nowrap">
				{entity.entity_id}
			</code>
		</div>
	);
};

export default EntitySettings;
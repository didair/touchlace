import { IEntitySettings } from "types";
import { useSelector } from "react-redux";
import { getEntityType } from "lib/entity";

import EntityLight from "./Light";
import EntitySwitch from './Switch';
import EntityCover from "./Cover";
import EntityBinarySensor from "./BinarySensor";
import EntitySensor from './Sensor';
import MediaPlayerEntity from "./MediaPlayer";
import EntityScene from "./Scene";
import EntityVacuum from "./Vacuum";

const Entity = (props) => {
	const entity_type = getEntityType(props.entity);
	const entitySettings: IEntitySettings = useSelector((state) => {
		return state.settings.entities.find((entity) => entity.entity_id == props.entity.entity_id)
	});

	if (entity_type === 'media_player') {
		return <MediaPlayerEntity
			settings={entitySettings}
			{...props}
		/>
	}

	if (entity_type === 'binary_sensor') {
		return <EntityBinarySensor
			settings={entitySettings}
			{...props}
		/>
	}

	if (entity_type === 'sensor') {
		return <EntitySensor
			settings={entitySettings}
			{...props}
		/>
	}

	if (entity_type === 'cover') {
		return (
			<EntityCover
				settings={entitySettings}
				{...props}
			/>
		);
	}

	if (entity_type === 'light') {
		return (
			<EntityLight
				settings={entitySettings}
				{...props}
			/>
		);
	}

	if (entity_type === 'switch') {
		return (
			<EntitySwitch
				settings={entitySettings}
				{...props}
			/>
		);
	}

	if (entity_type === 'scene') {
		return (
			<EntityScene
				settings={entitySettings}
				{...props}
			/>
		);
	}

	if (entity_type === 'vacuum') {
		return (
			<EntityVacuum
				settings={entitySettings}
				{...props}
			/>
		);
	}

	return null;

};

export default Entity;
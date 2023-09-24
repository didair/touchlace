import { EntitySettings as EntitySettingsInterface } from "types";
import { useSelector } from "react-redux";

import EntityLight from "./Light";
import EntitySwitch from './Switch';
import EntityCover from "./Cover";
import EntitySensor from './Sensor';
import MediaPlayerEntity from "./MediaPlayer";
import EntityScene from "./Scene";

const Entity = (props) => {
	const entity_type: string = props.entity.entity_id.split('.')[0];
	const entitySettings: EntitySettingsInterface = useSelector((state) => {
		return state.settings.entities.find((entity) => entity.entity_id == props.entity.entity_id)
	});

	if (entity_type === 'media_player') {
		return <MediaPlayerEntity
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

	return null;

};

export default Entity;
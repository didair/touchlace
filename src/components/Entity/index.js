import { useSelector } from "react-redux";
import { useCallEntityServiceMutation, useUpdateEntityStateMutation } from "services/states/api";

import EntityLight from "./Light";
import EntitySwitch from './Switch';
import EntityCover from "./Cover";

const Entity = (props) => {
	const [updateState] = useUpdateEntityStateMutation();
	const [callService] = useCallEntityServiceMutation();
	const entity_type = props.entity.entity_id.split('.')[0];
	const entitySettings = useSelector((state) => {
		return state.entities.entities.find((entity) => entity.entity_id == props.entity.entity_id)
	});

	if (entity_type === 'cover') {
		return (
			<EntityCover
				settings={entitySettings}
				updateState={updateState}
				callService={callService}
				{...props}
			/>
		);
	}

	if (entity_type === 'light') {
		return (
			<EntityLight
				settings={entitySettings}
				updateState={updateState}
				callservice={callService}
				{...props}
			/>
		);
	}

	if (entity_type === 'switch') {
		return (
			<EntitySwitch
				settings={entitySettings}
				updateState={updateState}
				callservice={callService}
				{...props}
			/>
		);
	}

	return null;

};

export default Entity;
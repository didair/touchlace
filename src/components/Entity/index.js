import { useCallEntityServiceMutation, useUpdateEntityStateMutation } from "services/states/api";

import EntityLight from "./Light";
import EntitySwitch from './Switch';
import EntityCover from "./Cover";

const Entity = (props) => {
	const [updateState] = useUpdateEntityStateMutation();
	const [callService] = useCallEntityServiceMutation();
	const entity_type = props.entity.entity_id.split('.')[0];

	if (entity_type === 'cover') {
		return (
			<EntityCover
				updateState={updateState}
				callService={callService}
				{...props}
			/>
		);
	}

	if (entity_type === 'light') {
		return (
			<EntityLight
				updateState={updateState}
				callservice={callService}
				{...props}
			/>
		);
	}

	if (entity_type === 'switch') {
		return (
			<EntitySwitch
				updateState={updateState}
				callservice={callService}
				{...props}
			/>
		);
	}

	return null;

};

export default Entity;
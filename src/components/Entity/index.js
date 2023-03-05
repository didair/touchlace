import { useUpdateEntityStateMutation } from "services/states/api";

import EntityLight from "./Light";
import EntitySwitch from './Switch';

const Entity = (props) => {
	const [updateState] = useUpdateEntityStateMutation();
	const entity_type = props.entity.entity_id.split('.')[0];

	if (entity_type === 'light') {
		return (
			<EntityLight
				updateState={updateState}
				{...props}
			/>
		);
	}

	if (entity_type === 'switch') {
		return (
			<EntitySwitch
				updateState={updateState}
				{...props}
			/>
		);
	}

	return null;

};

export default Entity;
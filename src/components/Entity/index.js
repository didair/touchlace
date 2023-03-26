import { useSelector, useDispatch } from "react-redux";
import { setEntitySettings } from "services/entities/slice";
import { useCallEntityServiceMutation, useUpdateEntityStateMutation } from "services/states/api";

import EntityLight from "./Light";
import EntitySwitch from './Switch';
import EntityCover from "./Cover";

const Entity = (props) => {
	const dispatch = useDispatch();
	const [updateState] = useUpdateEntityStateMutation();
	const [callService] = useCallEntityServiceMutation();
	const entity_type = props.entity.entity_id.split('.')[0];
	const entitySettings = useSelector((state) => {
		return state.entities.entities.find((entity) => entity.entity_id == props.entity.entity_id)
	});

	const setSettings = (value) => {
		dispatch(setEntitySettings(value));
	};

	if (entity_type === 'cover') {
		return (
			<EntityCover
				settings={entitySettings}
				updateState={updateState}
				callService={callService}
				setSettings={setSettings}
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
				setSettings={setSettings}
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
				setSettings={setSettings}
				{...props}
			/>
		);
	}

	return null;

};

export default Entity;
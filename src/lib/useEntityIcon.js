import { useSelector } from "react-redux";
import { IconsList } from "constants/icons";

const useEntityIcon = (entity) => {
	const entity_type = entity.entity_id.split('.')[0];
	const entitySettings = useSelector((state) => {
		return state.settings.entities.find(({ entity_id }) => entity_id == entity.entity_id)
	});

	const getState = () => {
		if (entity_type === 'light' || entity_type === 'switch') {
			return entity.state === 'on';
		}

		if (entity_type === 'cover') {
			return entity.state === 'open';
		}
	};

	const getIconName = () => {
		if (entitySettings != null && entitySettings.icon != null) {
			return entitySettings.icon;
		}

		if (entity_type === 'light') {
			return 'lightbulb';
		}

		if (entity_type === 'switch') {
			return 'toggle';
		}

		if (entity_type === 'cover') {
			return 'arrow-up-down';
		}
	};

	const selectedIcon = IconsList.find((icon) => icon.name === getIconName());
	return selectedIcon[getState() ? 'on' : 'off'];
};

export default useEntityIcon;

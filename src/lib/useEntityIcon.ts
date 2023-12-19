import { useSelector } from "react-redux";
import { IconsList } from "constants/icons";
import { IEntity } from "types";

const useEntityIcon = (entity: IEntity) => {
	const entity_type = entity.entity_id.split('.')[0];
	const entitySettings = useSelector((state) => {
		return state.settings.entities.find(({ entity_id }) => entity_id == entity.entity_id)
	});

	const getState = () => {
		if (entity_type === 'light' || entity_type === 'switch' || entity_type === 'binary_sensor') {
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

		if (entity_type === 'binary_sensor') {
			return 'door';
		}

		if (entity_type === 'sensor') {
			return 'lightbulb';
		}

		if (entity_type === 'media_player') {
			return 'speaker';
		}

		if (entity_type === 'scene') {
			return 'RoutinesComingHome';
		}

		if (entity_type === 'vacuum') {
			return 'DevicesBridgesV2';
		}
	};

	const getCurrentRange = (icon) => {
		let closest = Object.keys(icon.range)[0];
		for (let key in icon.range) {
			if (Math.abs(entity.state - key) < Math.abs(entity.state - closest)) {
				closest = key;
			}
		}

		return icon.range[closest];
	};

	const selectedIcon = IconsList.find((icon) => icon.name === getIconName());

	if (selectedIcon.type === 'range') {
		return getCurrentRange(selectedIcon);
	}

	return selectedIcon[getState() ? 'on' : 'off'];
};

export default useEntityIcon;

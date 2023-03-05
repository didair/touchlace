import Card from 'components/Card';
import { capitalize } from 'lib/text';

const EntitySwitch = ({ entity, updateState }) => {

	const toggleOnOff = () => {
		updateState({
			entity_id: entity.entity_id,
			domain: 'switch',
			state: entity.state == 'on' ? 'off' : 'on',
		});
	};

	return (
		<Card onClick={toggleOnOff} state={entity.state == 'on' ? 'light' : 'dark'}>
			<div className="flex justify-between">
				<div className="flex items-center">
					Switch
				</div>
			</div>

			<div>
				<div className="font-semibold truncate text-ellipsis h-6">
					{entity.attributes.friendly_name}
				</div>

				<div className="font-semibold">
					{capitalize(entity.state)}
				</div>
			</div>
		</Card>
	);

};

export default EntitySwitch;
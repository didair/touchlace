import cx from 'classnames';
import Card from 'components/Card';
import Icon from 'components/Icon';
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
		<Card onClick={toggleOnOff} state={entity.state == 'on' ? 'light' : 'dark'} type="switch">
			<div className="flex justify-between">
				<div className={cx(
					"h-11",
					"flex",
					"items-center",
					"text-3xl",
					{ 'text-gray': entity.state != 'on' }
				)}>
					<Icon name={entity.state == 'on' ? 'toggle-on' : 'toggle-off'} />
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
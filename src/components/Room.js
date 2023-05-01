import cx from 'classnames';
import Icon from 'components/Icon';
import Entities from './Entities';

const Room = (props) => {
	const media_players = props.entities.filter((entity_id) =>
		entity_id.indexOf('media_player') > -1
	);

	const sensors = props.entities.filter((entity_id) =>
		entity_id.indexOf('sensor') > -1
	);

	const devices = props.entities.filter((entity_id) =>
		entity_id.indexOf('sensor') === -1 && entity_id.indexOf('media_player') === -1
	);

	return (
		<div
			className={cx(
				'grid-item',
				'flex',
				'flex-col',
				'mb-3',
				'rounded-lg',
				'text-md',
			)}
			data-index={props.index}
		>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-3xl font-semibold">
					{props.name}
				</h3>

				{props.showSettings ?
					<div>
						<span className="cursor-pointer" onClick={props.moveLeft}>
							<Icon name="arrow-left" />
						</span>

						<span className="ml-3 cursor-pointer" onClick={props.moveRight}>
							<Icon name="arrow-right" />
						</span>

						<span className="ml-3 cursor-pointer" onClick={props.onEdit}>
							<Icon name="pen" />
						</span>

						<span className="ml-3 cursor-pointer" onClick={props.onDelete}>
							<Icon name="trash-can" />
						</span>
					</div>
				: null}
			</div>

			{sensors.length > 0 ?
				<div className="grid grid-cols-2 gap-4 mb-4">
					<Entities entities={sensors} />
				</div>
			: null}

			{media_players.length > 0 ?
				<div className="grid grid-cols-2 gap-4 mb-4">
					<Entities entities={media_players} />
				</div>
			: null}

			<div className="grid grid-cols-2 gap-4">
				<Entities entities={devices} />
			</div>
		</div>
	);

};

Room.defaultProps = {
	entities: [],
	showSettings: false,
};

export default Room;
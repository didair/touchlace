import { Entity as EntityInterface } from "types";
import cx from 'classnames';
import Icon from 'components/Icon';
import Entities from './Entities';

const Room = ({
	entities = [],
	index = 0,
	showSettings = false,
	name,
	moveLeft,
	moveRight,
	onEdit,
	onDelete,
}: {
	entities: Array<EntityInterface>,
	name: string,
	index: number,
	showSettings: boolean,
	moveLeft: Function,
	moveRight: Function,
	onEdit: Function,
	onDelete: Function,
}) => {
	const media_players = entities.filter((entity_id) =>
		entity_id.indexOf('media_player') > -1
	);

	const sensors = entities.filter((entity_id) =>
		entity_id.indexOf('sensor') > -1
	);

	const devices = entities.filter((entity_id) =>
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
			data-index={index}
		>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-3xl font-semibold">
					{name}
				</h3>

				{showSettings ?
					<div>
						<span className="cursor-pointer" onClick={moveLeft}>
							<Icon name="arrow-left" />
						</span>

						<span className="ml-3 cursor-pointer" onClick={moveRight}>
							<Icon name="arrow-right" />
						</span>

						<span className="ml-3 cursor-pointer" onClick={onEdit}>
							<Icon name="pen" />
						</span>

						<span className="ml-3 cursor-pointer" onClick={onDelete}>
							<Icon name="trash-can" />
						</span>
					</div>
				: null}
			</div>

			{sensors?.length > 0 && !showSettings ?
				<div className="grid grid-cols-2 gap-4 mb-4">
					<Entities entities={sensors} />
				</div>
			: null}

			{media_players?.length > 0 && !showSettings ?
				<div className="grid grid-cols-2 gap-4 mb-4">
					<Entities entities={media_players} />
				</div>
			: null}

			{!showSettings ?
				<div className="grid grid-cols-2 gap-4">
					<Entities entities={devices} />
				</div>
			: null}
		</div>
	);

};

export default Room;
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
					<div className="text-2xl flex items-center gap-x-5">
						<span className="cursor-pointer" onClick={moveLeft}>
							<Icon name="arrow-up" />
						</span>

						<span className="cursor-pointer" onClick={moveRight}>
							<Icon name="arrow-down" />
						</span>

						<span className="cursor-pointer" onClick={onEdit}>
							<Icon name="pen" />
						</span>

						<span className="cursor-pointer" onClick={onDelete}>
							<Icon name="trash-can" />
						</span>
					</div>
				: null}
			</div>

			{showSettings && entities != null ?
				`${entities.length} entities`
			: null}

			{showSettings ?
				<div style={{ height: 1 }} className="w-full bg-light-gray mb-2" />
			: null}

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
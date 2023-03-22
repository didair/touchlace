import { useGetStatesQuery } from "services/states/api";
import cx from 'classnames';
import Icon from 'components/Icon';
import Entity from "components/Entity";

const Room = (props) => {
	const { data: entities } = useGetStatesQuery();

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

			<div className="grid grid-cols-2 gap-4">
				{entities != null && props.entities != null ?
					props.entities.map((entity_id) => {
						const entity = entities.find((entity) => entity.entity_id == entity_id);

						if (entity == null) {
							return null;
						}

						return <Entity
							key={entity.entity_id}
							entity={entity}
						/>;
					})
				: null}
			</div>
		</div>
	);
};

Room.defaultProps = {
	showSettings: false,
};

export default Room;
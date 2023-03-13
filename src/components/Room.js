import { useGetStatesQuery } from "services/states/api";
import cx from 'classnames';
import Icon from 'components/Icon';
import Masonry from 'components/Masonry';
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
				'w-[20.75rem]',
				'rounded-lg',
				'text-md',
			)}
		>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-3xl font-semibold">
					{props.name}
				</h3>

				{props.showSettings ?
					<div>
						<span className="cursor-pointer" onClick={props.onEdit}>
							<Icon name="pen" />
						</span>

						<span className="ml-3 cursor-pointer" onClick={props.onDelete}>
							<Icon name="trash-can" />
						</span>
					</div>
				: null}
			</div>

			<div className="relative">
				{entities != null ?
					<Masonry>
						{props.entities.map((entity_id) => {
							const entity = entities.find((entity) => entity.entity_id == entity_id);

							if (entity == null) {
								return null;
							}

							return <Entity
								key={entity.entity_id}
								entity={entity}
							/>;
						})}
					</Masonry>
				: null}
			</div>
		</div>
	);
};

Room.defaultProps = {
	showSettings: false,
};

export default Room;
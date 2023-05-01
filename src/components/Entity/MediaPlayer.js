import cx from 'classnames';
import Card from "components/Card";
import Icon from "components/Icon";

const MediaPlayerEntity = ({ entity, settings }) => {

	console.log('media player', entity);

	return (
		<Card type="media" className="col-span-2" state={entity.state == 'paused' ? 'dark' : 'light'}>
			<div className="flex items-center">
				<div className={cx(
					"h-11",
					"flex",
					"items-center",
					"text-3xl",
				)}>
					<Icon name="code" />
				</div>

				<div className="font-semibold truncate text-ellipsis text-xl ml-2">
					{settings != null && settings.name != null && settings.name != '' ?
						settings.name
					: entity.attributes.friendly_name}
				</div>
			</div>
			
			<div className="flex justify-between">
				<div>
					{entity.state}
				</div>

				{entity.attributes.group_members != null ?
					<div>
						<pre>
							{JSON.stringify(entity.attributes.group_members)}
						</pre>
					</div>
				: null}

				{entity.attributes.volume_level != null ?
					<div>
						Vol: {entity.attributes.volume_level * 100}%
					</div>
				: null}
			</div>
		</Card>
	);

};

export default MediaPlayerEntity;
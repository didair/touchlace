import { useState, useMemo, useEffect } from 'react';
import { useGetStatesQuery } from 'services/states/api';
import { getBaseURI } from 'lib/config';
import cx from 'classnames';

import Card from "components/Card";
import Icon from "components/Icon";
import Modal from 'components/Modal';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const MediaPlayerEntity = ({ entity, settings, callService }) => {
	const { data: entities } = useGetStatesQuery();
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const name = settings != null && settings.name != null && settings.name != '' ?
		settings.name
	: entity.attributes.friendly_name;

	const selected_group_members = useMemo(() => {
		if (entity.attributes == null || entity.attributes.group_members == null) {
			return null;
		}

		return entity.attributes.group_members.filter((member) => member != entity.entity_id);
	}, [entity]);

	const speakers = useMemo(() => {
		if (entities == null || entity.attributes.group_members == null) {
			return [];
		}

		return entities.filter((ent) => {
			const entity_type = ent.entity_id.split('.')[0];
			return ent.entity_id != entity.entity_id && entity_type == 'media_player' && ent.attributes.group_members != null;
		});
	}, [entities]);

	const mediaInfo = useMemo(() => {
		if (entity.attributes.media_content_id == null) {
			return null;
		}

		const filteredKeys = Object.keys(entity.attributes).filter(key =>
			key.indexOf('media_') !== -1 || key.indexOf('entity_picture') !== -1
		);

		return filteredKeys.reduce((acc, key) => {
			acc[key] = entity.attributes[key];
			return acc;
		}, {});
	});

	const togglePlayPause = () => {
		callService({
			entity_id: entity.entity_id,
			domain: 'media_player',
			service: entity.state == 'playing' ? 'media_pause' : 'media_play',
			fields: {
			},
		});
	};

	const updateGroupMember = (member) => {
		const inGroup = selected_group_members.indexOf(member.entity_id) > -1;

		if (inGroup) {
			callService({
				entity_id: member.entity_id,
				domain: 'media_player',
				service: 'unjoin',
			});
		} else {
			callService({
				entity_id: entity.entity_id,
				domain: 'media_player',
				service: 'join',
				fields: {
					group_members: member.entity_id,
				},
			});
		}
	};

	useEffect(() => {
		console.log('media player', entity, mediaInfo);
	}, []);

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}}>
				<div className="flex items-center justify-center flex-col">
					<h3 className="text-2xl">
						{name}
						{selected_group_members?.length > 0 ?
							' +' + selected_group_members.length
						: null}
					</h3>
				</div>

				<div className="mt-8">
					{speakers.map((speaker) => {
						return (
							<label className='block' key={speaker.entity_id}>
								<input
									type="checkbox"
									checked={selected_group_members?.indexOf(speaker.entity_id) > -1}
									onChange={() => updateGroupMember(speaker)}
								/>
								{speaker.attributes.friendly_name}
							</label>
						);
					})}
				</div>

				<div className="flex items-center justify-center mt-8">
					<span
						className={cx("ml-4 text-xl", { 'text-blue/90': showSettings })}
						onClick={() => setShowSettings(!showSettings)}
					>
						<Icon name="gear" />
					</span>
				</div>

				{showSettings ?
					<EntitySettings entity={entity} />
				: null}
			</Modal>

			<Card
				type="media"
				className="col-span-2 overflow-hidden"
				state={entity.state == 'playing' ? 'light' : 'dark'}
				// onClick={togglePlayPause}
				onLongPress={() => setOpen(true)}
			>
				{mediaInfo == null ?
					<div className="flex items-center">
						<div className={cx(
							"h-11",
							"flex",
							"items-center",
							"text-3xl",
						)}>
							<Icon name="speaker" />
						</div>

						<div className="font-semibold truncate text-ellipsis text-xl ml-2">
							{name}
							{selected_group_members?.length > 0 ?
								' +' + selected_group_members.length
							: null}
						</div>
					</div>
				: null}

				{mediaInfo != null ?
					<div className="flex my-2 gap-x-2">
						<div>
							<img
								className="w-16 h-16 rounded-md"
								src={getBaseURI() + mediaInfo.entity_picture}
							/>
						</div>

						<div style={{ width: 'calc(100% - 5rem)'}}>
							<div className="font-semibold truncate">
								{mediaInfo.media_title}
							</div>

							<div className="text-sm">
								{mediaInfo.media_artist}
							</div>
						</div>
					</div>
				: null}

				<div className="flex items-center justify-between">
					<div className={cx({
						'text-blue': entity.attributes.shuffle
					})}>
						<Icon name="shuffle" />
					</div>

					<div className="flex items-center justify-center gap-x-4">
						<div className="text-xl">
							<Icon name="backward-step" />
						</div>

						<div className="text-3xl w-6 text-center" onClick={togglePlayPause}>
							<Icon name={entity.state == 'playing' ? 'pause' : 'play'} />
						</div>

						<div className="text-xl">
							<Icon name="forward-step" />
						</div>
					</div>

					<div className={cx('relative', {
						'text-blue': entity.attributes.repeat != 'off'
					})}>
						<Icon name="repeat" />
						{entity.attributes.repeat == 'one' ?
							<span className="text-off-white bg-dark/60 rounded-full absolute text-sm -right-3 -top-2 w-5 h-5 text-center">1</span>
						: null}
					</div>
				</div>


				<div className="absolute bottom-0 left-0 w-full">
					<div
						className={cx(
							'transition-all',
							'duration-500',
							'h-1',
							'bg-blue',
							'translate-0',
							{
								'translate-y-1': entity.state != 'playing' || mediaInfo == null
							}
						)}
						style={ mediaInfo != null ?
							{ width: Math.round((mediaInfo.media_position)/mediaInfo.media_duration * 100) + '%' }
						: { width: '0%' }}
					/>
				</div>
			</Card>
		</>
	);

};

export default MediaPlayerEntity;
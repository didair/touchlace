import { useState, useMemo } from 'react';
import { Entity as EntityInterface, EntitySettings as EntitySettingsInterface } from 'types';
import { getBaseURI } from 'lib/config';
import cx from 'classnames';

import Card from "components/Card";
import Icon from "components/Icon";
import Modal from 'components/Modal';
import EntitySettings from 'components/Forms/EntitySettingsForm';
import MediaBrowser from 'components/MediaBrowser';
import SpeakerGroupMembers from 'components/SpeakerGroupMembers';
import SpeakerMediaControls from 'components/SpeakerMediaControls';

const MediaPlayerEntity = ({
	entity,
	settings,
}: {
	entity: EntityInterface,
	settings: EntitySettingsInterface,
}) => {
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

	const mediaInfo = useMemo(() => {
		if (entity.attributes.media_content_id == null || entity.attributes.media_title == null) {
			return null;
		}

		const filteredKeys = Object.keys(entity.attributes).filter(key =>
			key.indexOf('media_') !== -1 || key.indexOf('entity_picture') !== -1
		);

		return filteredKeys.reduce((acc, key) => {
			acc[key] = entity.attributes[key];
			return acc;
		}, {});
	}, [entity]);

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false) }} type="big">
				<div className="flex items-center justify-center flex-col">
					<h3 className="text-2xl">
						{name}
						{selected_group_members?.length > 0 ?
							' +' + selected_group_members.length
							: null}
					</h3>
				</div>

				<div className="flex my-8 gap-x-6">
					<div className="w-9/12">
						<MediaBrowser entity={entity} />
					</div>

					<div className="w-3/12">
						<SpeakerMediaControls entity={entity} showVolumeSlider showMediaInfo />

						<div className="mt-4">
							<SpeakerGroupMembers entity={entity} />
						</div>
					</div>
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
					<div className="flex items-center mb-2 text-light-gray/40">
						<Icon name="speaker" className="mr-1" />
						{name}
						{selected_group_members?.length > 0 ?
							' +' + selected_group_members.length
							: null}
					</div>
				: null}

				{mediaInfo != null ?
					<div className="flex mb-2 gap-x-3">
						<div>
							<img
								alt=""
								className="w-16 h-16 rounded-md"
								src={getBaseURI() + mediaInfo.entity_picture}
							/>
						</div>

						<div style={{ width: 'calc(100% - 5rem)' }}>
							<div className="font-semibold truncate">
								{mediaInfo.media_title}
							</div>

							<div className="text-sm">
								{mediaInfo.media_artist}
							</div>
						</div>
					</div>
					: null}

				<SpeakerMediaControls entity={entity} />

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
						style={mediaInfo != null ?
							{ width: Math.round((mediaInfo.media_position) / mediaInfo.media_duration * 100) + '%' }
							: { width: '0%' }}
					/>
				</div>
			</Card>
		</>
	);

};

export default MediaPlayerEntity;
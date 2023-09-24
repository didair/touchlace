import { useState, useMemo } from 'react';
import { Entity as EntityInterface, EntitySettings as EntitySettingsInterface } from 'types';
import { getBaseURI } from 'lib/config';
import { capitalize } from 'lib/text';
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
				state={entity.state == 'playing' ? 'light' : 'dark'}
				backgroundImage={mediaInfo != null ? getBaseURI() + mediaInfo.entity_picture : null}
				onClick={() => setOpen(true)}
			>
				<div className="text-sm z-10 text-light">
					<div className="font-semibold text-base truncate text-ellipsis">
						{name}
						{selected_group_members?.length > 0 ?
							' +' + selected_group_members.length
							: null}
					</div>

					<div className="">
						{capitalize(entity.state)}
						{entity.attributes.volume_level != null && entity.state == 'playing' ?
							' • ' + Math.round((entity.attributes.volume_level) * 100) + '%'
						: null}
					</div>
				</div>

				<div className={cx(
					"flex",
					"items-center",
					"text-2xl",
					"z-10",
					"text-light",
				)}>
					{entity.attributes.device_class == 'tv' ?
						<Icon name="tv" />
					: <Icon name="speaker" />}
				</div>
			</Card>
		</>
	);

};

export default MediaPlayerEntity;
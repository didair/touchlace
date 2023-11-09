import cx from 'classnames';
import { useMemo } from "react";
import { useCallEntityServiceMutation } from "services/states/api";
import { getBaseURI } from "lib/config";

import Icon from "components/Icon";
import HorizontalSlider from "./Inputs/HorizontalSlider";

const SpeakerMediaControls = ({ entity, showMediaInfo = false, showVolumeSlider = false }) => {
	const [callService] = useCallEntityServiceMutation();

	const togglePlayPause = () => {
		callService({
			entity_id: entity.entity_id,
			domain: 'media_player',
			service: entity.state == 'playing' ? 'media_pause' : 'media_play',
		});
	};

	const onPrev = () => {
		callService({
			entity_id: entity.entity_id,
			domain: 'media_player',
			service: 'media_previous_track',
		});
	};

	const onNext = () => {
		callService({
			entity_id: entity.entity_id,
			domain: 'media_player',
			service: 'media_next_track',
		});
	};

	const onVolumeChange = (value) => {
		let group_members = [entity.entity_id];

		if (entity.attributes.group_members != null) {
			group_members = entity.attributes.group_members;
		}

		group_members.forEach((entity_id) => {
			callService({
				entity_id: entity_id,
				domain: 'media_player',
				service: 'volume_set',
				fields: {
					volume_level: value/100,
				},
			});
		});
	};

	const toggleShuffle = () => {
		callService({
			entity_id: entity.entity_id,
			domain: 'media_player',
			service: 'shuffle_set',
			fields: {
				shuffle: !entity.attributes.shuffle
			},
		});
	};

	const nextRepeatMode = () => {
		let newVal = '';

		if (entity.attributes.repeat == 'off') {
			newVal = 'all';
		}

		if (entity.attributes.repeat == 'all') {
			newVal = 'one';
		}

		if (entity.attributes.repeat == 'one') {
			newVal = 'off';
		}

		callService({
			entity_id: entity.entity_id,
			domain: 'media_player',
			service: 'repeat_set',
			fields: {
				repeat: newVal
			},
		});
	};

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
			{mediaInfo != null && showMediaInfo ?
				<div className="flex flex-col mb-4 gap-y-3">
					<div>
						<img
							alt=""
							className="w-full aspect-square rounded-lg"
							src={getBaseURI() + mediaInfo.entity_picture}
						/>
					</div>

					<div>
						<div className="font-semibold truncate">
							{mediaInfo.media_title}
						</div>

						<div className="text-sm truncate">
							{mediaInfo.media_artist}
						</div>
					</div>
				</div>
			: null}

			<div className="flex items-center justify-between">
				<div onClick={() => toggleShuffle()} className={cx('text-xl cursor-pointer', {
					'text-blue': entity.attributes.shuffle
				})}>
					<Icon name="shuffle" />
				</div>

				<div className="flex items-center justify-center gap-x-4">
					<div className="text-2xl cursor-pointer" onClick={onPrev}>
						<Icon name="backward-step" />
					</div>

					<div className="text-4xl w-6 text-center cursor-pointer" onClick={togglePlayPause}>
						<Icon name={entity.state == 'playing' ? 'pause' : 'play'} />
					</div>

					<div className="text-2xl cursor-pointer" onClick={onNext}>
						<Icon name="forward-step" />
					</div>
				</div>

				<div onClick={() => nextRepeatMode()} className={cx('relative text-xl cursor-pointer', {
					'text-blue': entity.attributes.repeat != 'off'
				})}>
					<Icon name="repeat" />
					{entity.attributes.repeat == 'one' ?
						<span className="text-off-white bg-dark/60 rounded-full absolute text-sm -right-3 -top-2 w-5 h-5 text-center">1</span>
						: null}
				</div>
			</div>

			{showVolumeSlider ?
				<div className="relative mt-4">
					<HorizontalSlider
						value={entity.attributes.volume_level != null ?
							entity.attributes.volume_level * 100
						: 0}
						onChange={onVolumeChange}
					/>
				</div>
			: null}
		</>
	);

};

export default SpeakerMediaControls;
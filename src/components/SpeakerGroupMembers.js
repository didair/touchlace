import { useMemo } from 'react';
import { useGetStatesQuery, useCallEntityServiceMutation } from 'services/states/api';
import Checkbox from 'components/Inputs/Checkbox';

const SpeakerGroupMembers = ({ entity }) => {
	const { data: entities } = useGetStatesQuery();
	const [callService] = useCallEntityServiceMutation();

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

	if (speakers.length == 0) {
		return null;
	}

	return (
		<div>
			<div className="mb-1 font-semibold">
				Group
			</div>

			{speakers.map((speaker) => {
				return (
					<Checkbox
						className="mb-1"
						checked={selected_group_members?.indexOf(speaker.entity_id) > -1}
						onChange={() => updateGroupMember(speaker)}
						label={speaker.attributes.friendly_name}
					/>
				);
			})}
		</div>
	);
};

export default SpeakerGroupMembers;
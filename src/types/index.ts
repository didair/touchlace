
export interface Entity {
	entity_id: string,
	state: string,
	attributes: {
		brightness?: number,
		current_position?: number,
		device_class?: string,
		entity_picture?: string,
		friendly_name: string,
		group_members?: Array,
		media_artist?: string,
		media_content_id?: string,
		media_duration?: number,
		media_position?: number,
		media_title?: string,
		repeat?: string,
		shuffle?: boolean,
		unit_of_measurement?: string,
		volume_level?: number,
	},
};

export interface EntitySettings {
	name: string,
	note: string,
	icon: string,
};
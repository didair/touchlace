
export interface Entity {
	entity_id: string,
	state: string | number,
	attributes: {
		brightness?: number,
		current_position?: number,
		device_class?: string,
		entity_picture?: string,
		friendly_name: string,
		group_members?: Array<string>,
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
	name?: string,
	note?: string,
	icon?: string,
	backgroundUrl?: string,
	sensorType?: 'door' | 'window' | 'lock' | 'temperature',
};
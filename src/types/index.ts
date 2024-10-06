
export interface IEntity {
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
		selected_map?: string;
		rooms?: {
			[mapName: string]: IRoom[]
		};
	},
};

export interface IRoom {
	id: string,
	name: string,
	entities?: Array<string>,
	icon?: string;
};

export interface IEntitySettings {
	name?: string,
	note?: string,
	icon?: string,
	backgroundImageId?: string,
	backgroundUrl?: string,
	sensorType?: 'door' | 'window' | 'lock' | 'temperature' | 'price',
};

export interface IEntityGroup {
	id: string,
	name: string,
	backgroundImageId?: string,
	backgroundUrl?: string,
	entities: Array<string>,
};

export interface IVacuum {
	id: string,
	name: string,
};

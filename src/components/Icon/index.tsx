import { IconNames } from 'constants/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {
	ArchetypesBollard,
	ArchetypesCeilingRound,
	ArchetypesCeilingSquare,
	ArchetypesDeskLamp,
	ArchetypesDoubleSpot,
	ArchetypesFloorLantern,
	ArchetypesFloorShade,
	ArchetypesFloorSpot,
	ArchetypesPendantLong,
	ArchetypesPendantRound,
	ArchetypesRecessedCeiling,
	ArchetypesRecessedFloor,
	ArchetypesSingleSpot,
	ArchetypesTableShade,
	ArchetypesTableWash,
	ArchetypesWallLantern,
	ArchetypesWallShade,
	ArchetypesWallSpot,
	BulbCandle,
	BulbFlood,
	BulbFoh,
	BulbGeneralGroup,
	BulbGroup,
	BulbsClassic,
	BulbsSpot,
	BulbsSultan,
	DevicesBridgesV2,
	DevicesDimmerswitch,
	DevicesFriendsofhue,
	DevicesMotionSensor,
	DevicesPlug,
	DevicesTap,
	HeroesBloom,
	HeroesHuego,
	HeroesHueplay,
	HeroesIris,
	HeroesLightstrip,
	PresetsDimmerDimdown,
	PresetsDimmerDimup,
	RoomsAttic,
	RoomsBalcony,
	RoomsBedroom,
	RoomsCarport,
	RoomsCloset,
	RoomsDining,
	RoomsDriveway,
	RoomsGarage,
	RoomsGuestroom,
	RoomsGym,
	RoomsHallway,
	RoomsKidsbedroom,
	RoomsLaundryroom,
	RoomsLiving,
	RoomsLounge,
	RoomsOffice,
	RoomsOutdoor,
	RoomsOutdoorSocialtime,
	RoutinesComingHome,
	RoutinesDaytime,
	RoutinesGoToSleep,
	RoutinesHomeAway,
	RoutinesLeavingHome,
	RoutinesLocation,
	RoutinesNighttime,
	RoutinesSunrise,
	RoutinesSunset,
	RoutinesTimers,
	RoutinesWakeUp,
	Speaker,
	Star,
	UicontrolsMotionSensitivity,
	UicontrolsNoMotion,
	Vacuum,
} from './library';

const Icon = ({ name, className }: {
	name: IconNames,
	className: string,
}) => {
	switch (name) {
		case 'circle-plus':
			return <FontAwesomeIcon icon={solid('circle-plus')} className={className} />

		case 'pen':
			return <FontAwesomeIcon icon={solid('pen')} className={className} />

		case 'trash-can':
			return <FontAwesomeIcon icon={solid('trash-can')} className={className} />

		case 'lightbulb':
			return <FontAwesomeIcon icon={solid('lightbulb')} className={className} />

		case 'toggle-on':
			return <FontAwesomeIcon icon={solid('toggle-on')} className={className} />

		case 'toggle-off':
			return <FontAwesomeIcon icon={solid('toggle-off')} className={className} />

		case 'arrow-up':
			return <FontAwesomeIcon icon={solid('arrow-up')} className={className} />

		case 'arrow-down':
			return <FontAwesomeIcon icon={solid('arrow-down')} className={className} />

		case 'arrow-left':
			return <FontAwesomeIcon icon={solid('arrow-left')} className={className} />

		case 'arrow-right':
			return <FontAwesomeIcon icon={solid('arrow-right')} className={className} />

		case 'circle-info':
			return <FontAwesomeIcon icon={solid('circle-info')} className={className} />

		case 'triangle-exclamation':
			return <FontAwesomeIcon icon={solid('triangle-exclamation')} className={className} />

		case 'gear':
			return <FontAwesomeIcon icon={solid('gear')} className={className} />

		case 'code':
			return <FontAwesomeIcon icon={solid('code')} className={className} />

		case 'city':
			return <FontAwesomeIcon icon={solid('city')} className={className} />

		case 'tree':
			return <FontAwesomeIcon icon={solid('tree')} className={className} />

		case 'bath':
			return <FontAwesomeIcon icon={solid('bath')} className={className} />

		case 'gamepad':
			return <FontAwesomeIcon icon={solid('gamepad')} className={className} />

		case 'rocket':
			return <FontAwesomeIcon icon={solid('rocket')} className={className} />

		case 'power-off':
			return <FontAwesomeIcon icon={solid('power-off')} className={className} />

		case 'door-open':
			return <FontAwesomeIcon icon={solid('door-open')} className={className} />

		case 'door-closed':
			return <FontAwesomeIcon icon={solid('door-closed')} className={className} />

		case 'unlock':
			return <FontAwesomeIcon icon={solid('unlock')} className={className} />

		case 'lock':
			return <FontAwesomeIcon icon={solid('lock')} className={className} />

		case 'umbrella-beach':
			return <FontAwesomeIcon icon={solid('umbrella-beach')} className={className} />

		case 'water-ladder':
			return <FontAwesomeIcon icon={solid('water-ladder')} className={className} />

		case 'tv':
			return <FontAwesomeIcon icon={solid('tv')} className={className} />

		case 'sink':
			return <FontAwesomeIcon icon={solid('sink')} className={className} />

		case 'computer':
			return <FontAwesomeIcon icon={solid('computer')} className={className} />

		case 'ArchetypesBollard':
			return <ArchetypesBollard />

		case 'ArchetypesCeilingRound':
			return <ArchetypesCeilingRound />

		case 'ArchetypesCeilingSquare':
			return <ArchetypesCeilingSquare />

		case 'ArchetypesDeskLamp':
			return <ArchetypesDeskLamp />

		case 'ArchetypesDoubleSpot':
			return <ArchetypesDoubleSpot />

		case 'ArchetypesFloorLantern':
			return <ArchetypesFloorLantern />

		case 'ArchetypesFloorShade':
			return <ArchetypesFloorShade />

		case 'ArchetypesFloorSpot':
			return <ArchetypesFloorSpot />

		case 'ArchetypesPendantLong':
			return <ArchetypesPendantLong />

		case 'ArchetypesPendantRound':
			return <ArchetypesPendantRound />

		case 'ArchetypesRecessedCeiling':
			return <ArchetypesRecessedCeiling />

		case 'ArchetypesRecessedFloor':
			return <ArchetypesRecessedFloor />

		case 'ArchetypesSingleSpot':
			return <ArchetypesSingleSpot />

		case 'ArchetypesTableShade':
			return <ArchetypesTableShade />

		case 'ArchetypesTableWash':
			return <ArchetypesTableWash />

		case 'ArchetypesWallLantern':
			return <ArchetypesWallLantern />

		case 'ArchetypesWallShade':
			return <ArchetypesWallShade />

		case 'ArchetypesWallSpot':
			return <ArchetypesWallSpot />

		case 'BulbCandle':
			return <BulbCandle />

		case 'BulbFlood':
			return <BulbFlood />

		case 'BulbFoh':
			return <BulbFoh />

		case 'BulbGeneralGroup':
			return <BulbGeneralGroup />

		case 'BulbGroup':
			return <BulbGroup className={className} />

		case 'BulbsClassic':
			return <BulbsClassic />

		case 'BulbsSpot':
			return <BulbsSpot />

		case 'BulbsSultan':
			return <BulbsSultan />

		case 'DevicesBridgesV2':
			return <DevicesBridgesV2 />

		case 'DevicesDimmerswitch':
			return <DevicesDimmerswitch />

		case 'DevicesFriendsofhue':
			return <DevicesFriendsofhue />

		case 'DevicesMotionSensor':
			return <DevicesMotionSensor />

		case 'DevicesPlug':
			return <DevicesPlug />

		case 'DevicesTap':
			return <DevicesTap />

		case 'HeroesBloom':
			return <HeroesBloom />

		case 'HeroesHuego':
			return <HeroesHuego />

		case 'HeroesHueplay':
			return <HeroesHueplay />

		case 'HeroesIris':
			return <HeroesIris />

		case 'HeroesLightstrip':
			return <HeroesLightstrip />

		case 'PresetsDimmerDimdown':
			return <PresetsDimmerDimdown />

		case 'PresetsDimmerDimup':
			return <PresetsDimmerDimup />

		case 'RoomsAttic':
			return <RoomsAttic />

		case 'RoomsBalcony':
			return <RoomsBalcony />

		case 'RoomsBedroom':
			return <RoomsBedroom />

		case 'RoomsCarport':
			return <RoomsCarport />

		case 'RoomsCloset':
			return <RoomsCloset />

		case 'RoomsDining':
			return <RoomsDining />

		case 'RoomsDriveway':
			return <RoomsDriveway />

		case 'RoomsGarage':
			return <RoomsGarage />

		case 'RoomsGuestroom':
			return <RoomsGuestroom />

		case 'RoomsGym':
			return <RoomsGym />

		case 'RoomsHallway':
			return <RoomsHallway />

		case 'RoomsKidsbedroom':
			return <RoomsKidsbedroom />

		case 'RoomsLaundryroom':
			return <RoomsLaundryroom />

		case 'RoomsLiving':
			return <RoomsLiving />

		case 'RoomsLounge':
			return <RoomsLounge />

		case 'RoomsOffice':
			return <RoomsOffice />

		case 'RoomsOutdoor':
			return <RoomsOutdoor />

		case 'RoomsOutdoorSocialtime':
			return <RoomsOutdoorSocialtime />

		case 'RoutinesComingHome':
			return <RoutinesComingHome />

		case 'RoutinesDaytime':
			return <RoutinesDaytime />

		case 'RoutinesGoToSleep':
			return <RoutinesGoToSleep />

		case 'RoutinesHomeAway':
			return <RoutinesHomeAway />

		case 'RoutinesLeavingHome':
			return <RoutinesLeavingHome />

		case 'RoutinesLocation':
			return <RoutinesLocation />

		case 'RoutinesNighttime':
			return <RoutinesNighttime />

		case 'RoutinesSunrise':
			return <RoutinesSunrise className={className} />

		case 'RoutinesSunset':
			return <RoutinesSunset className={className} />

		case 'RoutinesTimers':
			return <RoutinesTimers className={className} />

		case 'RoutinesWakeUp':
			return <RoutinesWakeUp className={className} />

		case 'UicontrolsMotionSensitivity':
			return <UicontrolsMotionSensitivity className={className} />

		case 'UicontrolsNoMotion':
			return <UicontrolsNoMotion className={className} />

		case 'temperature-full':
			return <FontAwesomeIcon icon={solid("temperature-full")} className={className} />

		case 'temperature-three-quarters':
			return <FontAwesomeIcon icon={solid("temperature-three-quarters")} className={className} />

		case 'temperature-half':
			return <FontAwesomeIcon icon={solid("temperature-half")} className={className} />

		case 'temperature-quarter':
			return <FontAwesomeIcon icon={solid("temperature-quarter")} className={className} />

		case 'temperature-empty':
			return <FontAwesomeIcon icon={solid("temperature-empty")} className={className} />

		case 'battery-full':
			return <FontAwesomeIcon icon={solid("battery-full")} className={className} />

		case 'battery-three-quarters':
			return <FontAwesomeIcon icon={solid("battery-three-quarters")} className={className} />

		case 'battery-half':
			return <FontAwesomeIcon icon={solid("battery-half")} className={className} />

		case 'battery-quarter':
			return <FontAwesomeIcon icon={solid("battery-quarter")} className={className} />

		case 'battery-empty':
			return <FontAwesomeIcon icon={solid("battery-empty")} className={className} />

		case 'bolt':
			return <FontAwesomeIcon icon={solid("bolt")} className={className} />

		case 'speaker':
			return <Speaker className={className} />

		case 'play':
			return <FontAwesomeIcon icon={solid('play')} className={className} />

		case 'pause':
			return <FontAwesomeIcon icon={solid('pause')} className={className} />

		case 'stop':
			return <FontAwesomeIcon icon={solid('stop')} className={className} />

		case 'music':
			return <FontAwesomeIcon icon={solid('music')} className={className} />

		case 'backward-step':
			return <FontAwesomeIcon icon={solid('backward-step')} className={className} />

		case 'forward-step':
			return <FontAwesomeIcon icon={solid('forward-step')} className={className} />

		case 'shuffle':
			return <FontAwesomeIcon icon={solid('shuffle')} className={className} />

		case 'repeat':
			return <FontAwesomeIcon icon={solid('repeat')} className={className} />

		case 'volume-xmark':
			return <FontAwesomeIcon icon={solid('volume-xmark')} className={className} />

		case 'volume-off':
			return <FontAwesomeIcon icon={solid('volume-off')} className={className} />

		case 'volume-low':
			return <FontAwesomeIcon icon={solid('volume-low')} className={className} />

		case 'volume-high':
			return <FontAwesomeIcon icon={solid('volume-high')} className={className} />

		case 'radio':
			return <FontAwesomeIcon icon={solid('radio')} className={className} />

		case 'compact-disc':
			return <FontAwesomeIcon icon={solid('compact-disc')} className={className} />

		case 'file-audio':
			return <FontAwesomeIcon icon={solid('file-audio')} className={className} />

		case 'user':
			return <FontAwesomeIcon icon={solid('user')} className={className} />

		case 'house':
			return <FontAwesomeIcon icon={solid('house')} className={className} />

		case 'star':
			return <Star className={className} />

		case 'wrench':
			return <FontAwesomeIcon icon={solid('wrench')} className={className} />

		case 'rotate':
			return <FontAwesomeIcon icon={solid('rotate')} className={className} />

		case 'blender':
			return <FontAwesomeIcon icon={solid('blender')} className={className} />

		case 'mug':
			return <FontAwesomeIcon icon={solid('mug-hot')} className={className} />

		case 'beer':
			return <FontAwesomeIcon icon={solid('beer-mug-empty')} className={className} />

		case 'wine-glass':
			return <FontAwesomeIcon icon={solid('wine-glass')} className={className} />

		case 'wine-bottle':
			return <FontAwesomeIcon icon={solid('wine-bottle')} className={className} />

		case 'whiskey-glass':
			return <FontAwesomeIcon icon={solid('whiskey-glass')} className={className} />

		case 'martini-citrus':
			return <FontAwesomeIcon icon={solid('martini-glass-citrus')} className={className} />

		case 'martini':
			return <FontAwesomeIcon icon={solid('martini-glass')} className={className} />

		case 'champagne-glasses':
			return <FontAwesomeIcon icon={solid('champagne-glasses')} className={className} />

		case 'glass-water':
			return <FontAwesomeIcon icon={solid('glass-water')} className={className} />

		case 'burger':
			return <FontAwesomeIcon icon={solid('burger')} className={className} />

		case 'pizza-slice':
			return <FontAwesomeIcon icon={solid('pizza-slice')} className={className} />

		case 'broom':
			return <FontAwesomeIcon icon={solid('broom')} className={className} />

		case 'vacuum':
			return <Vacuum className={className} />

		default:
			return null;
	};
};

Icon.defaultProps = {
	className: '',
};

export default Icon;

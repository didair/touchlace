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
	UicontrolsMotionSensitivity,
	UicontrolsNoMotion,
} from './library';

const Icon = ({ name, className }) => {
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

		case 'champagne-glasses':
			return <FontAwesomeIcon icon={solid('champagne-glasses')} className={className} />

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
			return <BulbGroup />

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
			return <RoutinesSunrise />

		case 'RoutinesSunset':
			return <RoutinesSunset />

		case 'RoutinesTimers':
			return <RoutinesTimers />

		case 'RoutinesWakeUp':
			return <RoutinesWakeUp />

		case 'UicontrolsMotionSensitivity':
			return <UicontrolsMotionSensitivity />

		case 'UicontrolsNoMotion':
			return <UicontrolsNoMotion />

		default:
			return null;
	};
};

Icon.defaultProps = {
	className: '',
};

export default Icon;
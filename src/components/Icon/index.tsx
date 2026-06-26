import { IconNames } from 'constants/icons';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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

const lucideIcons: Partial<Record<IconNames, LucideIcon>> = {
  'circle-plus': LucideIcons.CirclePlus,
  pen: LucideIcons.Pen,
  'trash-can': LucideIcons.Trash2,
  lightbulb: LucideIcons.Lightbulb,
  'toggle-on': LucideIcons.ToggleRight,
  'toggle-off': LucideIcons.ToggleLeft,
  'arrow-up': LucideIcons.ArrowUp,
  'arrow-down': LucideIcons.ArrowDown,
  'arrow-left': LucideIcons.ArrowLeft,
  'arrow-right': LucideIcons.ArrowRight,
  'circle-info': LucideIcons.Info,
  'triangle-exclamation': LucideIcons.TriangleAlert,
  gear: LucideIcons.Settings,
  code: LucideIcons.Code,
  city: LucideIcons.Building2,
  tree: LucideIcons.TreePine,
  bath: LucideIcons.Bath,
  gamepad: LucideIcons.Gamepad2,
  rocket: LucideIcons.Rocket,
  'power-off': LucideIcons.Power,
  'door-open': LucideIcons.DoorOpen,
  'door-closed': LucideIcons.DoorClosed,
  unlock: LucideIcons.Unlock,
  lock: LucideIcons.Lock,
  'umbrella-beach': LucideIcons.Umbrella,
  'water-ladder': LucideIcons.WavesLadder,
  tv: LucideIcons.Tv,
  sink: LucideIcons.Bath,
  computer: LucideIcons.Computer,
  'temperature-full': LucideIcons.ThermometerSun,
  'temperature-three-quarters': LucideIcons.Thermometer,
  'temperature-half': LucideIcons.Thermometer,
  'temperature-quarter': LucideIcons.Thermometer,
  'temperature-empty': LucideIcons.Thermometer,
  'battery-full': LucideIcons.BatteryFull,
  'battery-three-quarters': LucideIcons.BatteryMedium,
  'battery-half': LucideIcons.BatteryMedium,
  'battery-quarter': LucideIcons.BatteryLow,
  'battery-empty': LucideIcons.Battery,
  bolt: LucideIcons.Bolt,
  play: LucideIcons.Play,
  pause: LucideIcons.Pause,
  stop: LucideIcons.Square,
  music: LucideIcons.Music,
  'backward-step': LucideIcons.StepBack,
  'forward-step': LucideIcons.StepForward,
  shuffle: LucideIcons.Shuffle,
  repeat: LucideIcons.Repeat,
  'volume-xmark': LucideIcons.VolumeX,
  'volume-off': LucideIcons.VolumeOff,
  'volume-low': LucideIcons.Volume1,
  'volume-high': LucideIcons.Volume2,
  radio: LucideIcons.Radio,
  'compact-disc': LucideIcons.Disc3,
  'file-audio': LucideIcons.FileAudio,
  user: LucideIcons.User,
  house: LucideIcons.House,
  wrench: LucideIcons.Wrench,
  rotate: LucideIcons.RotateCw,
  blender: LucideIcons.Blender,
  mug: LucideIcons.Coffee,
  beer: LucideIcons.Beer,
  'wine-glass': LucideIcons.Wine,
  'wine-bottle': LucideIcons.BottleWine,
  'whiskey-glass': LucideIcons.GlassWater,
  'martini-citrus': LucideIcons.Martini,
  martini: LucideIcons.Martini,
  'champagne-glasses': LucideIcons.Glasses,
  'glass-water': LucideIcons.GlassWater,
  burger: LucideIcons.Hamburger,
  'pizza-slice': LucideIcons.Pizza,
  broom: LucideIcons.BrushCleaning,
};

const Icon = ({ name, className }: {
  name: IconNames,
  className: string,
}) => {
  const LucideComponent = lucideIcons[name];

  if (LucideComponent != null) {
    return <LucideComponent className={className} />;
  }

  switch (name) {
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

    case 'speaker':
      return <Speaker className={className} />

    case 'star':
      return <Star className={className} />

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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Icon = ({ name, className }) => {
	switch(name) {
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
			return <FontAwesomeIcon icon={solid('bath')} className={className} />

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

		default:
			return null;
	};
};

Icon.defaultProps = {
	className: '',
};

export default Icon;

export const IconsList = [
	'arrow-down',
	'arrow-left',
	'arrow-right',
	'arrow-up',
	'bath',
	'circle-plus',
	'city',
	'code',
	'door-closed',
	'door-open',
	'gamepad',
	'gear',
	'lightbulb',
	'lock',
	'pen',
	'power-off',
	'rocket',
	'sink',
	'toggle-off',
	'toggle-on',
	'trash-can',
	'tree',
	'triangle-exclamation',
	'tv',
	'umbrella-beach',
	'unlock',
	'water-ladder',
];
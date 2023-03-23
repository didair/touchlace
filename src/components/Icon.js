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

		case 'arrow-left':
			return <FontAwesomeIcon icon={solid('arrow-left')} className={className} />

		case 'arrow-right':
			return <FontAwesomeIcon icon={solid('arrow-right')} className={className} />

		case 'triangle-exclamation':
			return <FontAwesomeIcon icon={solid('triangle-exclamation')} className={className} />

		case 'gear':
			return <FontAwesomeIcon icon={solid('gear')} className={className} />

		default:
			return null;
	};
};

Icon.defaultProps = {
	className: '',
};

export default Icon;
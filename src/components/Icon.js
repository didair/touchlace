import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Icon = ({ name }) => {
	switch(name) {
		case 'circle-plus':
			return <FontAwesomeIcon icon={solid('circle-plus')} />

		case 'pen':
			return <FontAwesomeIcon icon={solid('pen')} />

		case 'trash-can':
			return <FontAwesomeIcon icon={solid('trash-can')} />

		default:
			return null;
	};
};

export default Icon;
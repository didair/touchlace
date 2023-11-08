import cx from 'classnames';
import { getParameterByName } from 'lib/url';
import { getBaseURI } from 'lib/config';
import { useEffect, useState } from 'react';
import { getHassAuth, getHassConnection } from 'lib/hass';

const Setup = () => {
	const [hass, setHass] = useState(getBaseURI());

	useEffect(() => {
		if (getParameterByName('auth_callback') == '1') {
			// Run this to fetch and store token before any api calls
			getHassAuth().then(() => {
				// Fix this redirect l8er
				window.location = '/';
			});
		}
	}, []);

	const saveSettings = async () => {
		localStorage.setItem('touchlace-base-uri', hass);
		getHassConnection();
	};

	if (getParameterByName('auth_callback') == '1') {
		return null;
	}

	return (
		<div className="flex max-w-lg mx-auto min-h-full h-full flex-col justify-center">
			<div className="mb-4">
				<h1 className="block text-5xl">Touchlace</h1>
			</div>

			<div>
				<label className="block font-bold mb-2" htmlFor="endpoint">
					Home Assistant URL:
				</label>

				<input
					id="endpoint"
					type="url"
					value={hass}
					onChange={(e) => setHass(e.target.value)}
					placeholder="http://192.168.1.15:8123"
					className={cx(
						"outline-none",
						'block',
						'w-full',
						'py-3 px-5',
						'rounded-md',
						'border-2',
						'border-green',
						'focus:border-bright-green',
						'text-dark',
					)}
				/>
			</div>

			<div className="text-right mt-4">
				<button disabled={false} onClick={saveSettings} className={cx(
					'py-3 px-5',
					'rounded-md',
					'text-dark',
					'bg-green',
					'border-2',
					'border-green',
					'hover:border-bright-green',
					'shadow-md',
					'hover:shadow-lg',
					'cursor-pointer',
					{
						'opacity-70': false,
						'cursor-not-allowed': false,
					}
				)}>
					Save settings and sign in
				</button>
			</div>
		</div>
	);

}

export default Setup;

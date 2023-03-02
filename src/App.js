import './App.css';
import { useState } from 'react';

function get(endpoint, baseURI, token) {
	return new Promise((resolve, reject) => {
		fetch(`${baseURI}/api/${endpoint}`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			},
		})
		.then((response) => response.json())
		.then((result) => {
			if (result != null) {
				resolve(result);
			}
		})
		.catch((error) => {
			reject(error);
		});
	});
}

function App() {
	const [hass, setHass] = useState(localStorage.getItem('touchlace-base-uri') ?? '');
	const [token, setToken] = useState(localStorage.getItem('touchlace-token') ?? '');
	const [config, setConfig] = useState(null);
	const [states, setStates] = useState(null);

	const saveSettings = () => {
		localStorage.setItem('touchlace-base-uri', hass);
		localStorage.setItem('touchlace-token', token);
	};

	const runConnect = async () => {
		const result = await get('config', hass, token);

		if (result != null) {
			console.log('config from hass', result);
			setConfig(result);
		}
	};

	const runGetStates = async () => {
		const result = await get('states', hass, token);

		if (result != null) {
			console.log('states from hass', result);
			setStates(result);
		}
	};

	return (
		<div className="App">
			<div style={{ textAlign: 'left' }}>
				Endpoint of homeassisant installation (w/o trailing slash) e.g. http://192.168.1.10:8123<br />
				<input
					type="text"
					value={hass}
					onChange={(e) => setHass(e.target.value)}
					placeholder="HASS endpoint"
				/>

				Your long life token generated under /profile -> long life tokens<br />
				<input
					type="text"
					value={token}
					onChange={(e) => setToken(e.target.value)}
					placeholder="HASS Token"
				/>
			</div>

			<div>
				<button onClick={saveSettings}>
					Save settings in localstorage
				</button>

				<button onClick={runConnect} disabled={token === ''}>
					Connect
				</button>

				<button onClick={runGetStates} disabled={token === '' || config == null}>
					Get states
				</button>
			</div>

			{config != null ?
				<div>
					<h2>Connected to: {config.location_name}!</h2>
				</div>
			: null}

			{states != null ?
				<div>
					<h3>Got states from {states.length} devices</h3>

					<table>
						<thead>
							<tr>
								<th>entity_id</th>
								<th>state</th>
								<th>brightness</th>
							</tr>
						</thead>

						<tbody>
							{states.map((state) => {
								return (
									<tr key={state.entity_id}>
										<td>{state.entity_id}</td>
										<td>{state.state}</td>
										<td>
											{state.attributes.brightness != null ?
												state.attributes.brightness + '%'
											: null}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			: null}
		</div>
	);
}

export default App;

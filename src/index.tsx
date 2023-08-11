import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { store, persistor } from 'lib/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { getBaseURI } from 'lib/config';

import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';

import App from 'containers/App';
import Settings from 'containers/pages/Settings';
import Devices from 'containers/pages/Devices';
import Setup from 'containers/pages/Setup';

import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Devices />,
			},
			{
				path: '/settings',
				element: <Settings />,
			},
		],
		loader: () => new Promise((resolve, reject) => {
			if (getBaseURI() != '') {
				resolve(1);
				return;
			}

			// Replace this redirect l8er
			window.location = '/setup';
		}),
	},
	{
		path: '/setup',
		element: <Setup />,
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

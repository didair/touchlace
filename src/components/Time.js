import { useEffect, useState } from "react";

const Time = () => {
	const [date, setDate] = useState(new Date());

	const getBrowserLocale = () => navigator.language || navigator.browserLanguage || (navigator.languages || ["en"])[0];

	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 30 * 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const time = date.toLocaleTimeString(getBrowserLocale(), {
		hour: 'numeric',
		hour12: false,
		minute: 'numeric'
	});

	return time;
};

export default Time;
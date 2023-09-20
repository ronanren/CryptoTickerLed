export const fetchDisplaysJSON = (setDisplays, setSettings) => {
	fetch('config_displays.json')
		.then((res) => res.json())
		.then((data) => {
			setDisplays(data.displays);
			setSettings(data.settings);
		});
};

export const fetchCoinsList = (setCoins) => {
	const cachedData = JSON.parse(localStorage.getItem('cachedCoinsData'));
	const lastFetchTime = localStorage.getItem('lastCoinsFetchTime');

	if (!cachedData || !lastFetchTime || Date.now() - lastFetchTime > 24 * 60 * 60 * 1000) {
		fetch('https://api.coingecko.com/api/v3/coins/list')
			.then((res) => res.json())
			.then((data) => {
				setCoins(data);

				localStorage.setItem('cachedCoinsData', JSON.stringify(data));
				localStorage.setItem('lastCoinsFetchTime', Date.now());
			})
			.catch((error) => console.error('Error fetching data:', error));
	} else {
		setCoins(cachedData);
	}
};


export const writeDisplaysJSON = (displays, settings) => {
	const serverDomain = window.location.hostname;
	const port = 3001;
	const apiUrl = `http://${serverDomain}:${port}/write-json`;
	fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ displays, settings })
	});
};

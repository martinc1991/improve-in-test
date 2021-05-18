import axios from 'axios';

export const formatStringToFilter = function (string) {
	if (typeof string === 'number') {
		return string.toString().toUpperCase().trim();
	} else if (typeof string === 'string') {
		return string.toUpperCase().trim();
	} else {
		return 'error';
	}
};

export const getInfoFromServer = function (endpoint) {
	console.log(`getting ${endpoint.toUpperCase()} from SERVER`);
	return new Promise((resolve, reject) => {
		axios
			.get('https://my-json-server.typicode.com/improvein/dev-challenge/' + endpoint)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});
};

export const getGenre = (genreCode, genreArray) => {
	let filteredGenre = genreArray.filter((genre) => {
		return genre.code === genreCode;
	});
	return filteredGenre[0]?.name || 'Goth Metal'; // 'Within Temptation' has no genre associated from the genre endpoint
};

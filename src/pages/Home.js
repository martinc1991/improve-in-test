import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Home() {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [bands, setBands] = useState([]);
	const [genres, setGenres] = useState([]);
	const [filteredBands, setFilteredBands] = useState([]);
	const [search, setSearch] = useState('');
	// Filter criterias
	const [sortByIdOrder, setSortByIdOrder] = useState('asc');
	const [sortByNameOrder, setSortByNameOrder] = useState('asc');
	const [sortByYearOrder, setSortByYearOrder] = useState('asc');
	const [sortByCountryOrder, setSortByCountryOrder] = useState('asc');
	const [sortByGenreOrder, setSortByGenreOrder] = useState('asc');
	const [sortByNumberOfMembersOrder, setSortByNumberOfMembersOrder] = useState('asc');

	let bandsInfo = null;
	let genresInfo = '';

	useEffect(() => {
		// Bands
		if (localStorage.getItem('bandsInfo')) {
			console.log('getting INFO from localStorage');
			bandsInfo = localStorage.getItem('bandsInfo');
			bandsInfo = JSON.parse(bandsInfo);
			setBands(bandsInfo);
			setFilteredBands(bandsInfo);
			// console.log(bandsInfo);
		} else {
			console.log('getting INFO from SERVER');
			axios
				.get('https://my-json-server.typicode.com/improvein/dev-challenge/bands')
				.then((response) => {
					bandsInfo = response.data;
					// console.log(bandsInfo);
					setBands(bandsInfo);
					setFilteredBands(bandsInfo);
					localStorage.setItem('bandsInfo', JSON.stringify(bandsInfo));
				})
				.catch((error) => {
					console.log(error);
				});
		}
		// Genres
		if (localStorage.getItem('genresInfo')) {
			console.log('getting INFO from localStorage');
			genresInfo = localStorage.getItem('genresInfo');
			genresInfo = JSON.parse(genresInfo);
			setGenres(genresInfo);
		} else {
			console.log('getting INFO from SERVER');
			axios
				.get('https://my-json-server.typicode.com/improvein/dev-challenge/genre')
				.then((response) => {
					genresInfo = response.data;
					setGenres(genresInfo);
					localStorage.setItem('genresInfo', JSON.stringify(genresInfo));
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	const getGenre = (genreCode) => {
		let genreArr = genres.filter((genre) => {
			return genre.code === genreCode;
		});
		return genreArr[0]?.name || 'Goth Metal'; // 'Within Temptation' has no genre associated from the genre endpoint
	};

	const filterHandler = (e) => {
		setSearch(e.target.value.trim());
		// If the TextInput filter is empty, set filteredBands equal to events
		if (!e.target.value) {
			setFilteredBands(bands);
		} else {
			// Filtered bands
			let filteredBands = bands.filter((band) => {
				return band.name.toLowerCase().includes(e.target.value.trim());
				// || band.members.toLowerCase().includes(e.target.value.trim()); // todo: ver si agregar filtro por miembros
			});
			setFilteredBands(filteredBands);
		}
	};

	// Sorting
	const sortByBandNameHandler = (e) => {
		if (sortByNameOrder === 'desc') {
			setSortByNameOrder('asc');
		} else {
			setSortByNameOrder('desc');
		}
		// filteredBands
		let filteredArr = [];
		filteredArr = filteredArr.concat(filteredBands);

		filteredArr.sort(sortByBandName);
		setFilteredBands(filteredArr);

		// bands
		let arr = [];
		arr = arr.concat(bands);
		arr.sort(sortByBandName);
		setBands(arr);
	};
	const sortByBandName = function (a, b) {
		var nameA = a.name.toUpperCase(); // ignore upper and lowercase
		var nameB = b.name.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return sortByNameOrder === 'asc' ? -1 : 1;
		}
		if (nameA > nameB) {
			return sortByNameOrder === 'asc' ? 1 : -1;
		}
		// names must be equal
		return 0;
	};

	const sortByNumberOfMembersHandler = (e) => {
		if (sortByNumberOfMembersOrder === 'desc') {
			setSortByNumberOfMembersOrder('asc');
		} else {
			setSortByNumberOfMembersOrder('desc');
		}
		// filteredBands
		let filteredArr = [];
		filteredArr = filteredArr.concat(filteredBands);

		filteredArr.sort(sortByNumberOfMembers);
		setFilteredBands(filteredArr);

		// bands
		let arr = [];
		arr = arr.concat(bands);
		arr.sort(sortByNumberOfMembers);
		setBands(arr);
	};
	const sortByNumberOfMembers = function (a, b) {
		if (sortByNumberOfMembersOrder === 'asc') {
			return a.members.length - b.members.length;
		} else if (sortByNumberOfMembersOrder === 'desc') {
			return b.members.length - a.members.length;
		} else {
			return 0;
		}
	};

	const sortByYearHandler = (e) => {
		if (sortByYearOrder === 'desc') {
			setSortByYearOrder('asc');
		} else {
			setSortByYearOrder('desc');
		}
		// filteredBands
		let filteredArr = [];
		filteredArr = filteredArr.concat(filteredBands);

		filteredArr.sort(sortByYear);
		setFilteredBands(filteredArr);

		// bands
		let arr = [];
		arr = arr.concat(bands);
		arr.sort(sortByYear);
		setBands(arr);
	};
	const sortByYear = function (a, b) {
		if (sortByYearOrder === 'asc') {
			return a.year - b.year;
		} else if (sortByYearOrder === 'desc') {
			return b.year - a.year;
		} else {
			return 0;
		}
	};

	const sortByCountryHandler = (e) => {
		if (sortByCountryOrder === 'desc') {
			setSortByCountryOrder('asc');
		} else {
			setSortByCountryOrder('desc');
		}
		// filteredBands
		let filteredArr = [];
		filteredArr = filteredArr.concat(filteredBands);

		filteredArr.sort(sortByCountry);
		setFilteredBands(filteredArr);

		// bands
		let arr = [];
		arr = arr.concat(bands);
		arr.sort(sortByCountry);
		setBands(arr);
	};
	const sortByCountry = function (a, b) {
		var nameA = a.country.toUpperCase(); // ignore upper and lowercase
		var nameB = b.country.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return sortByCountryOrder === 'asc' ? -1 : 1;
		}
		if (nameA > nameB) {
			return sortByCountryOrder === 'asc' ? 1 : -1;
		}
		// names must be equal
		return 0;
	};

	const sortByIdHandler = (e) => {
		if (sortByIdOrder === 'desc') {
			setSortByIdOrder('asc');
		} else {
			setSortByIdOrder('desc');
		}
		// filteredBands
		let filteredArr = [];
		filteredArr = filteredArr.concat(filteredBands);

		filteredArr.sort(sortById);
		setFilteredBands(filteredArr);

		// bands
		let arr = [];
		arr = arr.concat(bands);
		arr.sort(sortById);
		setBands(arr);
	};
	const sortById = function (a, b) {
		if (sortByIdOrder === 'asc') {
			return a.id - b.id;
		} else if (sortByIdOrder === 'desc') {
			return b.id - a.id;
		} else {
			return 0;
		}
	};

	const sortByGenreHandler = (e) => {
		if (sortByGenreOrder === 'desc') {
			setSortByGenreOrder('asc');
		} else {
			setSortByGenreOrder('desc');
		}
		// filteredBands
		let filteredArr = [];
		filteredArr = filteredArr.concat(filteredBands);

		filteredArr.sort(sortByGenre);
		setFilteredBands(filteredArr);

		// bands
		let arr = [];
		arr = arr.concat(bands);
		arr.sort(sortByGenre);
		setBands(arr);
	};
	const sortByGenre = function (a, b) {
		var nameA = a.genreCode.toUpperCase(); // ignore upper and lowercase
		var nameB = b.genreCode.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return sortByGenreOrder === 'asc' ? -1 : 1;
		}
		if (nameA > nameB) {
			return sortByGenreOrder === 'asc' ? 1 : -1;
		}
		// names must be equal
		return 0;
	};

	return (
		<div>
			<div>
				<h1>Bands</h1>
			</div>
			<div>
				<label htmlFor='filter'>Filter: </label>
				<input type='text' id='filter' onChange={filterHandler} />

				{/* <button onClick={sortByBandNameHandler}>Sort by Band Name</button> */}
				<Button variant='info' size='sm' onClick={sortByIdHandler}>
					Sort by ID
				</Button>
				<Button variant='info' size='sm' onClick={sortByBandNameHandler}>
					Sort by Band Name
				</Button>
				<Button variant='info' size='sm' onClick={sortByYearHandler}>
					Sort by Year
				</Button>
				<Button variant='info' size='sm' onClick={sortByCountryHandler}>
					Sort by Country
				</Button>
				<Button variant='info' size='sm' onClick={sortByGenreHandler}>
					Sort by Genre
				</Button>
				<Button variant='info' size='sm' onClick={sortByNumberOfMembersHandler}>
					Sort by Members
				</Button>
			</div>
			<br />

			{/* Table */}
			<Table responsive size='sm' hover striped>
				<thead>
					<tr>
						{Array.from(['ID', 'Name', 'Year', 'Country', 'Genre', 'Members']).map((colName, index) => (
							<th key={index}>{colName}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredBands && filteredBands.length ? (
						filteredBands.map((band, key) => {
							return (
								<tr key={key}>
									<td>{band.id}</td>
									<td>
										<Link to={`/bands/${band.id}`}>{band.name}</Link>
									</td>
									<td>{band.year}</td>
									<td>{band.country}</td>
									<td>{getGenre(band.genreCode)}</td>
									{/* <td>{band.genreCode}</td> */}
									<td>{band.members.length}</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan={6}>No bands satisfy this filter criteria</td>
						</tr>
					)}
				</tbody>
			</Table>
			{/* Table */}
		</div>
	);
}

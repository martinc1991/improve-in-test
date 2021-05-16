import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [bands, setBands] = useState([]);
	const [filteredBands, setFilteredBands] = useState([]);
	const [search, setSearch] = useState('');
	const [sortByNameOrder, setSortByNameOrder] = useState('asc');
	const [sortByNumberOfMembersOrder, setSortByNumberOfMembersOrder] = useState('asc');
	let bandsInfo = null;

	useEffect(() => {
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
	}, []);

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

	return (
		<div>
			<div>
				<input type='text' onChange={filterHandler} />
			</div>
			<br />
			<div>
				<button onClick={sortByBandNameHandler}>Sort by Band Name</button>
			</div>
			<br />
			<div>
				<button onClick={sortByNumberOfMembersHandler}>Sort by Members</button>
			</div>
			<br />
			{filteredBands &&
				filteredBands.map((band, key) => {
					return (
						<div key={key}>
							<Link to={`/bands/${band.id}`}>{`${band.name} (${band.members.length} members)`}</Link>
						</div>
					);
				})}
		</div>
	);
}

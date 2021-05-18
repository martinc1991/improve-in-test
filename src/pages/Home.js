import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { formatStringToFilter, getInfoFromServer, getGenre } from '../utils/utils.js';

// true for 'asc', false for 'desc'
const initialSortState = {
	id: true,
	name: true,
	year: true,
	country: true,
	genre: true,
	members: true,
};

const categories = ['id', 'name', 'year', 'country', 'genre', 'members'];

export default function Home() {
	const [bands, setBands] = useState([]);
	const [genres, setGenres] = useState([]);
	const [filteredBands, setFilteredBands] = useState([]);
	const [search, setSearch] = useState('');
	const [sortState, setSortState] = useState(initialSortState);

	let bandsInfo = null;
	let genresInfo = '';

	useEffect(() => {
		(async () => {
			// Bands
			if (localStorage.getItem('bandsInfo')) {
				console.log('getting BANDS from localStorage');
				bandsInfo = localStorage.getItem('bandsInfo');
				bandsInfo = JSON.parse(bandsInfo);
				setBands(bandsInfo);
				setFilteredBands(bandsInfo);
			} else {
				try {
					bandsInfo = await getInfoFromServer('bands');
					setBands(bandsInfo);
					setFilteredBands(bandsInfo);
					localStorage.setItem('bandsInfo', JSON.stringify(bandsInfo));
				} catch (error) {
					console.log(error);
				}
			}
			// Genres
			if (localStorage.getItem('genresInfo')) {
				console.log('getting GENRES from localStorage');
				genresInfo = localStorage.getItem('genresInfo');
				genresInfo = JSON.parse(genresInfo);
				setGenres(genresInfo);
			} else {
				try {
					genresInfo = await getInfoFromServer('genre');
					setGenres(genresInfo);
					localStorage.setItem('genresInfo', JSON.stringify(genresInfo));
				} catch (error) {
					console.log(error);
				}
			}
		})();
	}, []);

	// filtering
	const filterHandler = (e) => {
		setSearch(e.target.value.trim());
		// If the TextInput filter is empty, set filteredBands equal to bands
		if (!e.target.value) {
			setFilteredBands(bands);
		} else {
			// Filtered bands
			let filteredBands = bands.filter((band) => {
				return formatStringToFilter(band.name).includes(formatStringToFilter(e.target.value)) || formatStringToFilter(band.country).includes(formatStringToFilter(e.target.value)) || formatStringToFilter(getGenre(band.genreCode, genres)).includes(formatStringToFilter(e.target.value));
			});
			setFilteredBands(filteredBands);
		}
	};

	// Sorting
	const sortHandler = (colName) => {
		let newSortState = { ...initialSortState };
		newSortState[colName] = !sortState[colName];

		setSortState(newSortState);

		// filteredBands
		let filteredArr = [];
		filteredArr = filteredArr.concat(filteredBands);

		filteredArr.sort((a, b) => {
			let nameA;
			let nameB;

			if (['id', 'year', 'members'].includes(colName)) {
				nameA = a[colName];
				nameB = b[colName];
			} else {
				nameA = colName === 'genre' ? formatStringToFilter(a.genreCode) : formatStringToFilter(a[colName]);
				nameB = colName === 'genre' ? formatStringToFilter(b.genreCode) : formatStringToFilter(b[colName]);
			}

			if (nameA < nameB) {
				return sortState[colName] ? -1 : 1;
			}
			if (nameA > nameB) {
				return sortState[colName] ? 1 : -1;
			}

			return 0;
		});

		setFilteredBands(filteredArr);

		// bands
		let arr = [];
		arr = arr.concat(bands);
		arr.sort((a, b) => {
			let nameA;
			let nameB;

			if (['id', 'year', 'members'].includes(colName)) {
				nameA = a[colName];
				nameB = b[colName];
			} else {
				nameA = colName === 'genre' ? formatStringToFilter(a.genreCode) : formatStringToFilter(a[colName]);
				nameB = colName === 'genre' ? formatStringToFilter(b.genreCode) : formatStringToFilter(b[colName]);
			}

			if (nameA < nameB) {
				return sortState[colName] ? -1 : 1;
			}
			if (nameA > nameB) {
				return sortState[colName] ? 1 : -1;
			}

			return 0;
		});
		setBands(arr);
	};

	return (
		<div>
			<Container className='mb-3'>
				<div className='my-2'>
					<h1 className='text-info'>Bands</h1>
				</div>
				<div>
					<label htmlFor='filter' className='mx-2'>
						Filter:
					</label>
					<input type='text' id='filter' placeholder='Band, country or genre' className='w-25' onChange={filterHandler} />

					{categories.map((colName, index) => (
						<Button
							variant='info'
							size='sm'
							key={index}
							className='mx-1 mb-1'
							onClick={() => {
								sortHandler(colName);
							}}>
							{'Sort by ' + (colName === 'genreCode' ? 'GENRE' : colName.toLocaleUpperCase())}
						</Button>
					))}
				</div>
			</Container>

			{/* Table */}
			<Table responsive size='sm' hover striped className='table-borderless'>
				<thead className='bg-info my-4'>
					<tr>
						{categories.map((colName, index) => (
							<th key={index}>{colName.toLocaleUpperCase()}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredBands && filteredBands.length ? (
						filteredBands.map((band, key) => {
							return (
								<tr key={key} className={`${key % 2 ? 'table-info' : ''}`}>
									<td>{band.id}</td>
									<td>
										<Link to={`/bands/${band.id}`}>{band.name}</Link>
									</td>
									<td>{band.year}</td>
									<td>{band.country}</td>
									<td>{getGenre(band.genreCode, genres)}</td>
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
		</div>
	);
}

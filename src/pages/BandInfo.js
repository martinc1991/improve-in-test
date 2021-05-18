import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

export default function BandInfo() {
	let { id } = useParams();
	id = parseInt(id);

	const [dataLoaded, setDataLoaded] = useState(false);
	const [genres, setGenres] = useState([]);
	const [localBand, setLocalBand] = useState({});
	const [localAlbums, setLocalAlbums] = useState({});
	let bandsInfo = null;
	let localAlbumsInfo = null;
	let genresInfo = '';

	useEffect(() => {
		// Get bands info
		if (localStorage.getItem('bandsInfo')) {
			console.log('getting BANDS from localStorage');
			bandsInfo = localStorage.getItem('bandsInfo');
			bandsInfo = JSON.parse(bandsInfo);
			bandsInfo = bandsInfo.filter((band) => {
				return band.id === id;
			})[0];
			setLocalBand(bandsInfo);
		} else {
			console.log('getting BANDS from API');
			axios
				.get('https://my-json-server.typicode.com/improvein/dev-challenge/bands')
				.then((response) => {
					bandsInfo = response.data;
					localStorage.setItem('bandsInfo', JSON.stringify(bandsInfo));
					setLocalBand(bandsInfo[0]);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		// Get albums info
		if (localStorage.getItem('albumsInfo')) {
			console.log('getting ALBUMS from localStorage');
			localAlbumsInfo = localStorage.getItem('albumsInfo');
			localAlbumsInfo = JSON.parse(localAlbumsInfo);
			localAlbumsInfo = localAlbumsInfo.filter((album) => {
				return album.bandId === id;
			});
			setLocalAlbums(localAlbumsInfo);
		} else {
			console.log('getting ALBUMS from API');
			axios
				.get('https://my-json-server.typicode.com/improvein/dev-challenge/albums')
				.then((response) => {
					localAlbumsInfo = response.data;
					localStorage.setItem('albumsInfo', JSON.stringify(localAlbumsInfo));
					localAlbumsInfo = localAlbumsInfo.filter((album) => {
						return album.bandId === id;
					});
					setLocalAlbums(localAlbumsInfo);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		// Genres
		if (localStorage.getItem('genresInfo')) {
			console.log('getting GENRES from localStorage');
			genresInfo = localStorage.getItem('genresInfo');
			genresInfo = JSON.parse(genresInfo);
			setGenres(genresInfo);
		} else {
			console.log('getting GENRES from API');
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

	return (
		<div>
			<Container className='px-5 pt-3'>
				{localBand ? (
					<div>
						<h1>
							{localBand.name} (created in {localBand.year})
						</h1>
						<p>
							<strong>Genre:</strong> {getGenre(localBand.genreCode)}
						</p>
						<p>
							<strong>Country:</strong> {localBand.country}
						</p>
						{/* <p>band members: {localBand.members.length}</p> */}
						<p>
							<strong>Albums:</strong>
						</p>
						<ul>
							{localAlbums.length ? (
								localAlbums.map((album, key) => {
									return (
										<li key={key}>
											{album.name} ({album.year})
										</li>
									);
								})
							) : (
								<li>No albums from this band</li>
							)}
						</ul>
						<p>
							<strong>Members:</strong>
						</p>
						<ol>
							{localBand && localBand.members?.length ? (
								localBand.members.map((member, key) => {
									let link = member.name.replaceAll(' ', '_');
									return (
										<li key={key}>
											<a href={'https://en.wikipedia.org/wiki/' + link} target='_blank' rel='noopener noreferrer'>
												{member.name}
											</a>
										</li>
									);
								})
							) : (
								<li>No members from this band</li>
							)}
						</ol>
					</div>
				) : (
					<div>
						<p>No band info</p>
					</div>
				)}
			</Container>
		</div>
	);
}

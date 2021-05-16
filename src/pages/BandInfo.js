import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BandInfo() {
	let { id } = useParams();
	id = parseInt(id);

	const [dataLoaded, setDataLoaded] = useState(false);
	const [localBand, setLocalBand] = useState({});
	const [localAlbums, setLocalAlbums] = useState({});
	let bandsInfo = null;
	let localAlbumsInfo = null;

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
			console.log('getting BANDS from SERVER');
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
			// console.log('localAlbums: ', localAlbumsInfo);
			setLocalAlbums(localAlbumsInfo);
		} else {
			console.log('getting ALBUMS from SERVER');
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
	}, []);

	return (
		<div>
			{localBand ? (
				<div>
					<h1>{localBand.name}</h1>
					<p>ID: {localBand.id}</p>
					<p>Genre: {localBand.genreCode}</p>
					<p>Year: {localBand.year}</p>
					<p>Country: {localBand.country}</p>
					{/* <p>band members: {localBand.members.length}</p> */}
					<p>Albums</p>
					{localAlbums.length ? (
						localAlbums.map((album, key) => {
							return (
								<p key={key}>
									{' - ' + album.name} ({album.year})
								</p>
							);
						})
					) : (
						<p>No albums from this band</p>
					)}
				</div>
			) : (
				<div>
					<p>No band info</p>
				</div>
			)}
		</div>
	);
}

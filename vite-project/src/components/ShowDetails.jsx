/* This code snippet is a React functional component called `ShowDetails`. It is responsible for
displaying details of a TV show, including its title, description, genres, seasons, and episodes.
Here is a breakdown of what the code is doing: */
import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchShow } from '../services/api';
import { genreMap } from '../utils/genreMapper';
import { AudioContext } from '../contexts/AudioContext';

export const ShowDetails = () => {
  const { id } = useParams();
  const { playAudio } = useContext(AudioContext);
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadShow = async () => {
      const data = await fetchShow(id);
      setShow(data);
    };
    loadShow();

    // Load existing favorites
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, [id]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(Number(event.target.value));
  };

  const handleFavorite = (episode) => {
    const updatedFavorites = [...favorites, episode];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (!show) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <Link
        to="/"
        className="text-white bg-green-500 px-4 py-2 rounded-md shadow-md hover:bg-green-600 mb-4 inline-block"
      >
        Back to Home
      </Link>
      <div className="flex flex-col lg:flex-row items-start bg-gray-100 rounded-lg shadow-lg p-6 gap-6">
        <img
          src={show.image}
          alt={show.title}
          className="w-full lg:w-1/3 rounded-lg shadow-md object-cover"
        />
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{show.title}</h1>
          <p className="text-gray-600 mb-4">{show.description}</p>
          <p className="text-gray-800 mb-4">
            <strong>Genres:</strong>{' '}
            {show.genres.map((id) => genreMap[id]).join(', ')}
          </p>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Season
            </label>
            <select
              value={selectedSeason}
              onChange={handleSeasonChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {show.seasons.map((season, index) => (
                <option key={index} value={index}>
                  Season {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Episodes</h2>
            <ul className="space-y-2">
              {show.seasons[selectedSeason].episodes.map((episode, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 border rounded-md bg-white shadow-sm"
                >
                  <span className="text-gray-800">
                    {index + 1}. {episode.title}
                  </span>
                  <button
                    onClick={() => playAudio(episode.audioUrl)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Play
                  </button>
                  <button
                    onClick={() => handleFavorite(episode)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Add to Favorites
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
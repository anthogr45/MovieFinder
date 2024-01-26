import { useMutation } from '@apollo/client';
import { ADD_Fav_MOVIE, EDIT_Fav_MOVIE } from '../utils/mutations';
import React, { useState, createContext, useContext, useEffect } from 'react';

const FavoriteMoviesContext = createContext();

export const useFavoriteMovies = () => useContext(FavoriteMoviesContext);

export const FavoriteMoviesProvider = ({ children }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [addFavMovie] = useMutation(ADD_Fav_MOVIE);
    const [editFavMovie] = useMutation(EDIT_Fav_MOVIE);

    const addFavoriteMovie = async (movieId) => {
        if (!favoriteMovies.includes(movieId)) {
            setFavoriteMovies([...favoriteMovies, movieId]);
            try {
                await addFavMovie({ variables: { movieId } });
            } catch (error) {
                console.error("Error adding favorite movie:", error);
            }
        }
    };

    const removeFavoriteMovie = async (movieId) => {
        setFavoriteMovies(favoriteMovies.filter(id => id !== movieId));
        try {
            await editFavMovie({ variables: { movieId } });
        } catch (error) {
            console.error("Error removing favorite movie:", error);
        }
    };

    return (
        <FavoriteMoviesContext.Provider value={{ favoriteMovies, addFavoriteMovie, removeFavoriteMovie }}>
            {children}
        </FavoriteMoviesContext.Provider>
    );
};
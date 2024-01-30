import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Auth from '../utils/auth';
import { useFavoriteMovies } from '../utils/FavoriteMoviesContext';

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/No_image_available.png';
  const { isFav, addFavoriteMovie, removeFavoriteMovie } = useFavoriteMovies();
  const [favBtnColor, setfavBtnColor] = useState(isFav(movie) ? '#98002e' : '');

  useEffect(() => {
    setfavBtnColor(isFav(movie) ? '#98002e' : '');
  }, [movie, isFav]);

  const toggleFav = async () => {
    if (Auth.loggedIn()) {
      if (isFav(movie)) {
        const success = await removeFavoriteMovie(movie);
        if (success) setfavBtnColor('');
      } else {
        const success = await addFavoriteMovie(movie);
        if (success) setfavBtnColor('#98002e');
      }
    } else {
      alert('Login first!');
    }
  };

  return (
    <Stack sx={{ margin: '20px' }}>
      <Card sx={{ maxWidth: 400, maxHeight: 600, height: '100%', position: 'relative' }}>
        <Link to={`/movie/${movie.id}`}>
          <CardMedia
            component="img"
            height="400"
            image={imageUrl}
            alt={movie.title}
            sx={{
              '&:hover': {
                opacity: 0.8,
                transition: 'opacity 0.3s ease-in-out',
              },
            }}
          />
        </Link>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {movie.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={toggleFav}>
            <FavoriteIcon sx={{ color: favBtnColor }} />
          </IconButton>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default MovieCard;

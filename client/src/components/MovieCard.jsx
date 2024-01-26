import * as React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
// import { EDIT_MOVIE } from '../utils/mutations';
import { ADD_Fav_MOVIE, EDIT_Fav_MOVIE } from '../utils/mutations';

export default function MovieCard({movie}) {
  const [editMovie] = useMutation(EDIT_MOVIE);
  // about movie image, please ref: https://developer.themoviedb.org/docs/image-basics
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;



  const [isFavorite, setIsFavorite] = useState(false);
  const [addFavMovie] = useMutation(ADD_Fav_MOVIE);
  const [editFavMovie] = useMutation(EDIT_Fav_MOVIE);
  
  const handleFavoriteToggle = async () => {
    setIsFavorite(!isFavorite);

    if (isFavorite) {
      // Remove the movie from the favorite list
      try {
        await editFavMovie({ variables: { movieId: movieIdToRemove } });
        
      } catch (error) {
       
      }
    } else {
      // Add the movie to the favorite list of the user
      try {
        await addFavMovie({ variables: { movieId: movieIdToAdd } });
        
      } catch (error) {
        
      }
    }
  };

  return (
    <Stack spacing={4}>
        <Card sx={{ maxWidth: 345 }}>
          <Link to={`/movie/${movie.id}`}>
          <CardMedia
            component="img"
            height="194"
            image={imageUrl}
            alt={movie.title}
          />
          <CardContent>
              <Typography variant="h5" gutterBottom>
                    {movie.title}
              </Typography>
          </CardContent>
          </Link>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick = {handleFavoriteToggle}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </CardActions>
        </Card>
    </Stack>
  );
}
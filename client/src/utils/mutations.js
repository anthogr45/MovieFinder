
import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const EDIT_Fav_MOVIE = gql`
  mutation editFavMovie($movieId: ID!) {
    editFavMovie(movieId: $movieId) {
      _id
      favorite_movies
    }
  }
`;

export const ADD_Fav_MOVIE = gql`
  mutation addFavMovie($movieId: ID!) {
    addFavMovie(movieId: $movieId) {
      _id
      favorite_movies
    }
  }
`;
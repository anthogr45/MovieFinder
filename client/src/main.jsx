import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './pages/Home.jsx';
import WatchList from './pages/WatchList.jsx';
import ModalsContainer from './components/ModalsContainer.jsx'; 

import Error from './pages/Error.jsx';
import App from './App.jsx';
import MovieSearchResult from './pages/MovieSearchResult';
import MovieDetail from './pages/MovieDetail.jsx';

import ButtonAppBar from './components/NavTabs.jsx';
import Footer from './components/Footer.jsx'; 


const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // changed by J.Z, try to use Outlet
    //errorElement: <h1 className="display-2">Wrong page!</h1>, -- change by J.Z change to errpage
    errorElement: <Error />,
    children: [
        {
          index: true,
          path: "",
          element: (
            <ThemeProvider theme={theme}>
              <Home />
            </ThemeProvider>
          ),
        },
        {
          path: '/saved',
          element: (
            <ThemeProvider theme={theme}>
              <WatchList />
            </ThemeProvider>
          ),
        },
        {
          path: '/search/:keyword',
          element: (
            <ThemeProvider theme={theme}>
              <MovieSearchResult />
            </ThemeProvider>
          ),
        },
        {
          path: '/movie/:movieId',
          element: (
            <ThemeProvider theme={theme}>
              <MovieDetail />
            </ThemeProvider>
          ),
        },
      ],
    },
]);

const rootElement = document.getElementById('root');
const modalRootElement = document.getElementById('modal-root');

ReactDOM.createRoot(rootElement).render(
  <>
    <RouterProvider router={router} />
    {/* Render modals container */}
    <ModalsContainer rootElement={modalRootElement} />
  </>
);

import HomePage from './pages/HomePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoutesComponent from './routes/Routes';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // your primary color
    },
    secondary: {
      main: 'rgb(245, 245, 245)', // your secondary color
    },
    common: {
      white: '#ffffff',
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          marginTop: 1,
          marginBottom: 1,
          '& > label': {
            top: 23,
            left: 0,
            '&[data-shrink="false"]': {
              top: 5,
            },
          },
          '& > div > input': {
            padding: '30.5px 14px 11.5px !important',
          },
          '& legend': {
            display: 'none',
          },
          '& fieldset': {
            top: 0,
          },
        },
      },
    },
  },
});

function App() {
  const user = null;
  const logo = 'assets/logo/blood_logo.png';
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {user ? (
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blood Donor Market
            </a>
          </header>
        ) : (
          <RoutesComponent />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

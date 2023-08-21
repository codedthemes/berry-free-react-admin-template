import HomePage from './pages/HomePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoutesComponent from './routes/Routes';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(255,0,0,1)', // your primary color
    },
    secondary: {
      main: '#f5f5f5', // your secondary color
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

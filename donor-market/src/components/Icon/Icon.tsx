// material-ui
import { useTheme } from '@mui/material/styles';

interface LogoProps {
  name: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<LogoProps> = ({ name, style }) => {
  const theme = useTheme();

  let icon;
  switch (name) {
    case 'vertical-lines':
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chart-arrows-vertical"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 21v-14" />
          <path d="M9 15l3 -3l3 3" />
          <path d="M15 10l3 -3l3 3" />
          <path d="M3 21l18 0" />
          <path d="M12 21l0 -9" />
          <path d="M3 6l3 -3l3 3" />
          <path d="M6 21v-18" />
        </svg>
      );
      break;
    case 'home-heart':
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-home-heart"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M21 12l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h6" />
          <path d="M9 21v-6a2 2 0 0 1 2 -2h2c.39 0 .754 .112 1.061 .304" />
          <path d="M19 21.5l2.518 -2.58a1.74 1.74 0 0 0 0 -2.413a1.627 1.627 0 0 0 -2.346 0l-.168 .172l-.168 -.172a1.627 1.627 0 0 0 -2.346 0a1.74 1.74 0 0 0 0 2.412l2.51 2.59z" />
        </svg>
      );
      break;
    case 'viewport-wide':
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-viewport-wide"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 12h-7l3 -3m0 6l-3 -3" />
          <path d="M14 12h7l-3 -3m0 6l3 -3" />
          <path d="M3 6v-3h18v3" />
          <path d="M3 18v3h18v-3" />
        </svg>
      );
      break;
    default:
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-droplet-filled"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6.801 11.003a6 6 0 1 0 10.396 -.003l-5.197 -8l-5.199 8.003z"
            stroke="#010202"
            strokeWidth="0"
            fill="currentColor"
          />
          <path d="M12 3v17" strokeWidth="0" fill="currentColor" />
          <path d="M12 12l3.544 -3.544" strokeWidth="0" fill="currentColor" />
          <path d="M12 17.3l5.558 -5.558" strokeWidth="0" fill="currentColor" />
        </svg>
      );
      break;
  }
  return <div style={style}>{icon}</div>;
};

export default Icon;

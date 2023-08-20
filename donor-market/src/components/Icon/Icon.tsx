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
    case 'checkup-list':
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-checkup-list"
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
          <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
          <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
          <path d="M9 14h.01" />
          <path d="M9 17h.01" />
          <path d="M12 16l1 1l3 -3" />
        </svg>
      );
      break;
    case 'antenna-bars':
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-antenna-bars-5"
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
          <path d="M6 18l0 -3" />
          <path d="M10 18l0 -6" />
          <path d="M14 18l0 -9" />
          <path d="M18 18l0 -12" />
        </svg>
      );
      break;
    case 'lock':
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-lock"
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
          <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
          <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
          <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
        </svg>
      );
      break;
    case 'hospital':
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-building-hospital"
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
          <path d="M3 21l18 0" />
          <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
          <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
          <path d="M10 9l4 0" />
          <path d="M12 7l0 4" />
        </svg>
      );
      break;
    case 'device-heart':
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-device-heart-monitor"
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
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M4 9h6l1 -2l2 4l1 -2h6" />
          <path d="M4 14h16" />
          <path d="M14 17v.01" />
          <path d="M17 17v.01" />
        </svg>
      );
      break;
    case 'blood-cross':
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-medical-cross-filled"
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
          <path
            d="M11 2l-.15 .005a2 2 0 0 0 -1.85 1.995v2.803l-2.428 -1.401a2 2 0 0 0 -2.732 .732l-1 1.732l-.073 .138a2 2 0 0 0 .805 2.594l2.427 1.402l-2.427 1.402a2 2 0 0 0 -.732 2.732l1 1.732l.083 .132a2 2 0 0 0 2.649 .6l2.428 -1.402v2.804a2 2 0 0 0 2 2h2l.15 -.005a2 2 0 0 0 1.85 -1.995v-2.804l2.428 1.403a2 2 0 0 0 2.732 -.732l1 -1.732l.073 -.138a2 2 0 0 0 -.805 -2.594l-2.428 -1.403l2.428 -1.402a2 2 0 0 0 .732 -2.732l-1 -1.732l-.083 -.132a2 2 0 0 0 -2.649 -.6l-2.428 1.4v-2.802a2 2 0 0 0 -2 -2h-2z"
            stroke-width="0"
            fill="currentColor"
          />
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

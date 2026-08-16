// third party
import { merge } from 'lodash-es';

// project imports
import Alert from './Alert';
import Autocomplete from './Autocomplete';
import Avatar from './Avatar';
import Button from './Button';
import CardActions from './CardActions';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import Checkbox from './Checkbox';
import Chip from './Chip';
import DataGrid from './DataGrid';
import DatePicker from './DatePicker';
import Divider from './Divider';
import DateTimePickerToolbar from './DateTimePickerToolbar';
import DialogActions from './DialogActions';
import DialogTitle from './DialogTitle';
import Fab from './Fab';
import InputAdornment from './InputAdornment';
import IconButton from './IconButton';
import InputBase from './InputBase';
import InputLabel from './InputLabel';
import InternalDateTimePickerTabs from './InternalDateTimePickerTabs';
import ListItemButton from './ListItemButton';
import ListItemIcon from './ListItemIcon';
import ListItemText from './ListItemText';
import OutlinedInput from './OutlinedInput';
import PaginationItem from './PaginationItem';
import Paper from './Paper';
import PickersOutlinedInput from './PickersOutlinedInput';
import PickersTextField from './PickersTextField';
import Select from './Select';
import Slider from './Slider';
import Switch from './Switch';
import TableCell from './TableCell';
import TablePagination from './TablePagination';
import TableRow from './TableRow';
import Tabs from './Tabs';
import TextField from './TextField';
import TimelineContent from './TimelineContent';
import TimelineDot from './TimelineDot';
import Tooltip from './Tooltip';
import TreeItem from './TreeItem';
import Typography from './Typography';

// ===============================||  OVERRIDES - MAIN  ||=============================== //

export default function ComponentsOverrides(theme, borderRadius, outlinedFilled) {
  return merge(
    Alert(theme),
    Autocomplete(theme, borderRadius),
    Avatar(theme),
    Button(theme),
    CardActions,
    CardContent(),
    CardHeader(theme),
    Checkbox(),
    Chip(),
    DataGrid(theme),
    DatePicker(),
    DateTimePickerToolbar(),
    DialogActions(),
    DialogTitle(),
    Divider(theme),
    Fab(theme),
    IconButton(theme),
    InputAdornment(theme),
    InputBase(theme),
    InputLabel(),
    InternalDateTimePickerTabs(theme),
    ListItemButton(theme),
    ListItemIcon(theme),
    ListItemText(theme),
    OutlinedInput(theme, borderRadius, outlinedFilled),
    PaginationItem(),
    Paper(borderRadius),
    PickersOutlinedInput(theme, borderRadius, outlinedFilled),
    PickersTextField(),
    Select(),
    Switch(theme),
    Slider(theme),
    TableCell(theme),
    TablePagination(theme, borderRadius),
    TableRow(theme),
    Tabs(theme),
    TextField(),
    TimelineContent(theme),
    TimelineDot(),
    Tooltip(theme),
    TreeItem(),
    Typography(theme)
  );
}

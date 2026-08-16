// third party
import { merge } from 'lodash-es';

// project imports
import Alert from './Alert';
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
import Dialog from './Dialog';
import DialogTitle from './DialogTitle';
import IconButton from './IconButton';
import InputBase from './InputBase';
import InputLabel from './InputLabel';
import ListItemButton from './ListItemButton';
import ListItemIcon from './ListItemIcon';
import ListItemText from './ListItemText';
import OutlinedInput from './OutlinedInput';
import Paper from './Paper';
import Select from './Select';
import Slider from './Slider';
import Switch from './Switch';
import TableCell from './TableCell';
import Tabs from './Tabs';
import Typography from './Typography';

// ===============================||  OVERRIDES - MAIN  ||=============================== //

export default function ComponentsOverrides(theme, borderRadius, outlinedFilled) {
  return merge(
    Alert(theme),
    Avatar(theme),
    Button(theme),
    CardActions,
    CardContent(),
    CardHeader(theme),
    Checkbox(),
    Chip(theme),
    DataGrid(theme),
    DatePicker(),
    DateTimePickerToolbar(),
    DialogActions(),
    Dialog(),
    DialogTitle(),
    Divider(theme),
    IconButton(theme),
    InputBase(theme),
    InputLabel(),
    ListItemButton(theme),
    ListItemIcon(theme),
    ListItemText(theme),
    OutlinedInput(theme, borderRadius, outlinedFilled),
    Paper(borderRadius),
    Select(),
    Slider(theme),
    Switch(theme),
    TableCell(theme),
    Tabs(theme),
    Typography(theme)
  );
}

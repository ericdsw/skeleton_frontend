import { createMuiTheme } from '@material-ui/core/styles';
import { purple, teal } from '@material-ui/core/colors';

const baseTheme = (mode = 'light') => createMuiTheme({
  palette: {
    type: mode,
    primary: purple,
    secondary: teal
  }
});

export default baseTheme;
import { merge } from 'lodash';
import Appbar from './appbar';
import { Theme } from '@mui/material';
import Tabs from './tabs';
import Button from './button';
import Input from './input';


// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Appbar(theme),
    Tabs(theme),
    Button(theme),
    Input(theme)
  );
}

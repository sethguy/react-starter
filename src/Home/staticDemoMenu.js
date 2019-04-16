import React from 'react';
import { MenuItem } from './Menu';
const staticDemoMenu = () => {
  return (<MenuItem title="cell Types">
    <MenuItem title="cell Type 1">
      <MenuItem title="option 1"></MenuItem>
      <MenuItem title="option 2"></MenuItem>
    </MenuItem>
    <MenuItem title="cell Type 2"></MenuItem>
  </MenuItem>
    ,
    <MenuItem title="input Types">
      <MenuItem title=" input option 1"></MenuItem>
      <MenuItem title=" input option 2"></MenuItem>
    </MenuItem>
    ,
    <MenuItem title="input2 Types">
      <MenuItem title=" input2 option 1">
        <MenuItem title=" input3 option 1"></MenuItem>
        <MenuItem title=" input3 option 23"></MenuItem>
        <MenuItem title=" input3 option 13"></MenuItem>
        <MenuItem title=" input3 option 24"></MenuItem>

        <MenuItem title=" input3 option 155"></MenuItem>
        <MenuItem title=" input3 option 266"></MenuItem>

      </MenuItem>
      <MenuItem title=" input2 option 2"></MenuItem>
    </MenuItem>);
};

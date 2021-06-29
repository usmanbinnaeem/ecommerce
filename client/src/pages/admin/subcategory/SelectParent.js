import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    maxWidth: 360,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({ categories, prntCategory, setPrntCategory }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setPrntCategory(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          value = {prntCategory}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <MenuItem key={c._id} value={c._id || " "}>
                {c.name}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>Parent Category</FormHelperText>
      </FormControl>
    </div>
  );
}

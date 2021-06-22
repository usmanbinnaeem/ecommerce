import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  field: {
    // maxWidth: 360,
    marginBottom: 15,
  },
}));

const Search = ({ keyword, setKeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const classes = useStyles();
  return (
    <TextField
      type="search"
      label="Filter"
      value={keyword}
      onChange={handleSearch}
      fullWidth
      variant="standard"
      required
      className={classes.field}
    />
  );
};

export default Search;

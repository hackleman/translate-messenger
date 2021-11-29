import { makeStyles } from "@mui/styles";
import { FormControl, FilledInput, InputAdornment } from "@mui/material";

const useStyles = makeStyles(() => ({
    filledInput: {
      height: 50,
      background: "#E9EEF9",
      borderRadius: 5,
      fontSize: 13,
      fontWeight: "bold",
      color: "#99A9C4",
      letterSpacing: 0,
      display: "flex",
      justifyContent: "center",
      marginBottom: 20
    },
    input: {
      "&::placeholder": {
        color: "#ADC0DE",
        opacity: 1
      }
    }
  }));

const Search = (props: any) => {
    const classes = useStyles();
    const { handleChange } = props;

    const handleSubmit = (event: any) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
            <FilledInput
            name="search"
            onChange={handleChange}
            classes={{ root: classes.filledInput, input: classes.input }}
            disableUnderline
            placeholder="Search"
            startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
            }></FilledInput>
        </FormControl>
        </form>
    );
};

export default Search;

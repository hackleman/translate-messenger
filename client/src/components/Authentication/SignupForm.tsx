import { ComponentProps } from "react";
import { 
    Box,
    Grid, 
    Button, 
    FormControl, 
    Input,
    FormHelperText 
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: '100%'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formHeader: {
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 300,
    },
    formButton: {
        width: '30%',
        fontWeight: 400,
        borderRadius: 1
    },
    formButtonContainer: {
        display: 'flex',
        marginTop: '2rem',
        justifyContent: 'center'
    }
}));

const SignupForm = (props: ComponentProps<any>) => {
    const classes = useStyles();
    const { formErrorMessage, handleRegister } = props;

    return (
        <Box className={classes.root}>
            <form className={classes.form} onSubmit={handleRegister}>
                <Box className={classes.formHeader}>
                    Username:
                    <FormControl margin="normal" required>
                        <Input
                            name="username"
                            type="text"
                            required
                        />
                    </FormControl>
                </Box>
                <Box className={classes.formHeader}>
                    Email:
                    <FormControl margin="normal" required>
                        <Input
                            name="email"
                            type="email"
                            required
                        />
                    </FormControl>
                </Box>
                <Box className={classes.formHeader}>
                    Password:
                    <FormControl  error={!!(formErrorMessage as any).confirmPassword} margin="normal" required>
                        <Input
                            name="password"
                            inputProps={{minLength: 6}}
                            type="password"
                            required
                        />
                        <FormHelperText>
                            {(formErrorMessage as any).confirmPassword}
                        </FormHelperText>
                    </FormControl>
                </Box>
                <Box className={classes.formHeader}>
                    Confirm Password:
                    <FormControl  error={!!(formErrorMessage as any).confirmPassword} margin="normal" required>
                        <Input
                            name="confirmPassword"
                            inputProps={{minLength: 6}}
                            type="password"
                            required
                        />
                        <FormHelperText>
                            {(formErrorMessage as any).confirmPassword}
                        </FormHelperText>
                    </FormControl>
                </Box>
                <Grid className={classes.formButtonContainer}>
                    <Button className={classes.formButton} type="submit" variant="contained" size="large" >
                        Create
                    </Button> 
                </Grid>
        </form>
    </Box>
    )
}

export default SignupForm;
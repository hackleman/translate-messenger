import { ComponentProps } from "react";
import { 
    Box,
    Grid, 
    Button, 
    FormControl, 
    Input
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
        marginTop: '1rem'
    },
    bannerText: {
        fontWeight: 600,
        fontSize: 26,
        paddingBottom: '1rem'
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

const LoginForm = (props: ComponentProps<any>) => {
    const classes = useStyles();
    const { handleLogin } = props;

    return (
        <Box className={classes.root}>
            <Box className={classes.bannerText}>Welcome back!</Box>
            <form className={classes.form} onSubmit={handleLogin}>
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
                    Password:
                    <FormControl margin="normal" required>
                        <Input
                            name="password"
                            inputProps={{minLength: 6}}
                            type="password"
                            required
                        />
                    </FormControl>
                </Box>
                <Grid className={classes.formButtonContainer}>
                    <Button className={classes.formButton} type="submit" variant="contained" size="large" >
                        Login
                    </Button> 
                </Grid>
            </form>
        </Box>
    )
}

export default LoginForm;
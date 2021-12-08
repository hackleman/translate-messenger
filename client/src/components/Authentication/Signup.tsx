import { ComponentProps } from "react";
import { 
    Box, 
    Grid, 
    Button, 
    Hidden
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { SignupForm } from './index';
import Image from './bg-img.png';

const useStyles = makeStyles((theme: any) => ({
    root: {
        height: '100vh',
        width: '100vw',
    },
    left: {
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(0,0,255,0.5)), url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    banner: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: 1
    },
    form: {
        width: '70%',
        alignItems: 'center',
        display: 'flex',
        flexGrow: 2
    },
    footer: {
        flexGrow: 1
    },
    bannerText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem 0 3rem',
    },
    bannerButton: {
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center'
    },
}));

const Signup = (props: ComponentProps<any>) => {
    const classes = useStyles();
    const { navigateToLogin, handleRegister, formErrorMessage } = props;

    return (
        <Grid container className={classes.root}>
            <Hidden mdDown>
                <Grid container item xs={0} md={4} className={classes.left} />
            </Hidden>
            <Grid 
                container 
                direction="column"
                justifyContent="center"
                alignItems="center"
                item 
                xs={12} md={8} >
                <Grid container className={classes.banner}>
                    <Grid item xs={6} md={4} className={classes.bannerText}>Already have an account?</Grid>
                    <Grid item xs={6} md={4} className={classes.bannerButton}>
                        <Button 
                            onClick={navigateToLogin} 
                            variant="outlined" 
                            size="medium"
                        > Login
                        </Button> 
                    </Grid>
                </Grid>
                <Grid className={classes.form}>
                    <SignupForm 
                        handleRegister={handleRegister} 
                        formErrorMessage={formErrorMessage}
                    />
                </Grid>
                <Box className={classes.footer} />
            </Grid>
        </Grid>
    )
}

export default Signup;
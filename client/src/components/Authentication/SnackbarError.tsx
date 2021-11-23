import { Button, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
    snackbar: {
        backgroundColor: "red",
        fontWeight: "bold"
    },
    icon: {
        color: "white"
    }
});

const SnackbarError = (props: any) => {
    const classes = useStyles();
    return (
        <Snackbar
            open={props.snackBarOpen}
            onClose={() => props.setSnackBarOpen(false)}
            message={props.errorMessage || "Sorry, an error occursed"}
            action={
                <React.Fragment>
                    <Button
                        className={classes.icon}
                        size="small"
                        onClick={() => props.setSnackBarOpen(false)}>
                            close
                    </Button>
                </React.Fragment>
            }
            ContentProps={{
                classes: {
                    root: classes.snackbar
                }
            }}
        />
    );
};

export default SnackbarError;
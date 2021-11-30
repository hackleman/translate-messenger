import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { ReduxState } from "../store";
import { Grid, CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Navigate } from "react-router-dom";
import { fetchConversations, fetchUser } from '../store/thunks';
import { SidebarContainer } from './Sidebar';
import { ActiveChat } from "./ActiveChat";

const useStyles = makeStyles((_theme: any) => ({
    root: {
        height: "100vh"
    },
    logout: {
        color: "#ff00ff"
    }
}));

const Home = (props: any) => {
    const classes = useStyles();
    const { user, fetchConversations } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (user?.id) {
            setIsLoggedIn(true);
        }
    }, [user.id])

    useEffect(() => {
        fetchConversations();
    }, [fetchConversations])

    if (user.id === null) {
        if (isLoggedIn) return <Navigate replace to="/login" />
        return <Navigate replace to="/register" />
    }
    return (
        <>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <SidebarContainer />
                <ActiveChat /> 
            </Grid>
        </>
    )
}

const mapStateToProps = (state: ReduxState) => {
    return {
        user: state.user,
        conversations: state.conversations
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchConversations: () => {
            dispatch(fetchUser());
            dispatch(fetchConversations());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
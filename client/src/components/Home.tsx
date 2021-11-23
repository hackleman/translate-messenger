import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { ReduxState } from "../store";
import { Button, Grid, CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Navigate } from "react-router-dom";
import { logout, fetchConversations } from '../store/thunks';

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
    const { user, logout, fetchConversations } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (user?.id) {
            setIsLoggedIn(true);
        }
    }, [user.id])

    useEffect(() => {
        fetchConversations();
    }, [fetchConversations])

    if (!user?.id) {
        if (isLoggedIn) return <Navigate replace to="/login" />
        return <Navigate replace to="/register" />
    }

    const handleLogout = async () => {
        await logout(user?.id)  
    }

    return (
        <>
            <Button className={classes.logout} onClick={handleLogout}>
                Logout
            </Button>
            <Grid>
                <CssBaseline />
                {/* <SidebarContainer />
                <ActiveChat /> */}
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
        logout: (id: number) => {
            dispatch(logout(id));
        },
        fetchConversations: () => {
            dispatch(fetchConversations());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
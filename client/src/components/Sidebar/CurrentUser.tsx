import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Box, Typography, Button } from "@mui/material";
import { BadgeAvatar } from "./index";
import { logout } from "../../store/thunks";
import { clearState, ReduxState } from "../../store";

const useStyles = makeStyles(() => ({
    root: {
      height: 44,
      marginTop: 23,
      marginLeft: 6,
      display: "flex",
      alignItems: "center"
    },
    subContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexGrow: 1
    },
    username: {
      letterSpacing: -0.23,
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 17
    },
    ellipsis: {
      color: "#95A7C4",
      marginRight: 24,
      opacity: 0.5
    }
  }));

const CurrentUser = (props: any) => {
    const classes = useStyles();
    const user = props.user || {};
    const { logout } = props;
    
    const handleLogout = async () => {
        await logout(user?.id)  
    }

    return (
            <Box className={classes.root}>
            <BadgeAvatar photoUrl={user.photoUrl} online={true} />
            <Box className={classes.subContainer}>
                <Typography className={classes.username}>{user.username}</Typography>
            </Box>
            <Button onClick={handleLogout}>
                Logout
            </Button>
            </Box>
        );
};

const mapStateToProps = (state: ReduxState) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
      logout: (id: number) => {
          dispatch(logout(id));
          dispatch(clearState());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);

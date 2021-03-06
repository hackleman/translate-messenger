import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Box, Typography, Button } from "@mui/material";
import { BadgeAvatar } from "./index";
import { logout } from "../../store/thunks";
import { clearState, ReduxState } from "../../store";

const useStyles = makeStyles(() => ({
    root: {
      height: 44,
      padding: '3rem 1rem 3rem 0',
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      transition: '0.5s'
    },
    avatar: {
      paddingLeft: '1rem',
      flexGrow: 1
    },
    username: {
      letterSpacing: -0.23,
      fontSize: 20,
      fontWeight: "bold",
    },
    ellipsis: {
      color: "#95A7C4",
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
            <Box className={classes.avatar}>
                <Typography sx={{fontSize: 20}}>{user.username}</Typography>
            </Box>
            <Button variant="outlined" onClick={handleLogout}>
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

import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { connect } from "react-redux";
import { BadgeAvatar } from "./index";

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

    return (
            <Box className={classes.root}>
            <BadgeAvatar photoUrl={user.photoUrl} online={true} />
            <Box className={classes.subContainer}>
                <Typography className={classes.username}>{user.username}</Typography>
            </Box>
            </Box>
        );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(CurrentUser);

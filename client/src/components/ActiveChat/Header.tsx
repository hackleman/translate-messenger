import { makeStyles } from "@mui/styles";
import { 
  Box, 
  Typography,
  Button } from "@mui/material";

const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 89,
      borderRadius: 12,
      paddingLeft: '2rem',
      boxShadow: "1px 2px 2px 1px gray"
    },
    content: {
      display: "flex",
      alignItems: "center",
    },
    button: {
      borderRadius: 12,
      paddingRight: '2rem'
    },
    statusText: {
      fontSize: 12,
      color: "#BFC9DB",
      letterSpacing: -0.17
    },
    statusDot: {
      height: 8,
      width: 8,
      borderRadius: "50%",
      marginRight: 5,
      backgroundColor: "#D0DAE9"
    },
    online: {
      background: "#1CED84"
    },
    ellipsis: {
      color: "#95A7C4",
      marginRight: 24,
      opacity: 0.5
    }
}));

const Header = (props: any) => {
    const classes = useStyles();
    const { username, online } = props;

    const executeScroll = () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  
    return (
      <Box className={classes.root}>
        <Box className={classes.content}>
          <Typography sx={{marginRight: '1rem', fontSize: 20}}>{username}</Typography>
          <Box className={`${classes.statusDot}`}></Box>
          <Typography className={classes.statusText}>{online ? "Online" : "Offline"}</Typography>
        </Box>
        <Button className={classes.button} onClick={executeScroll}>
          back
        </Button>
      </Box>
    );
};
  
export default Header;
  
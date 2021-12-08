import { makeStyles } from "@mui/styles";
import { Avatar, Box, Theme, Typography } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end"
    },
    date: {
      fontSize: 11,
      color: "#BECCE2",
      fontWeight: "bold",
      marginBottom: 5
    },
    text: {
      fontSize: 14,
      color: "#91A3C0",
      letterSpacing: -0.2,
      padding: 8,
      fontWeight: "bold"
    },
    bubble: {
      background: "#F4F6FA",
      borderRadius: "10px 10px 0 10px"
    },
    avatar: {

    }
  }));

const SenderBubble = (props: any) => {
    const classes = useStyles();
    const { time, text, latestRead, photoUrl } = props;
    const photourl = photoUrl || "";
    
    return (
      <Box className={classes.root}>
        <Typography className={classes.date}>{time}</Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
        {
          latestRead && <Avatar className={classes.avatar} src={photourl} sx={{width:16, height:16}} />
        }
      </Box>
    );
  };
  
export default SenderBubble;
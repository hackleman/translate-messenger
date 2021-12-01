import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: 20,
        flexGrow: 1,
      },
    username: {
        fontWeight: "bold",
        letterSpacing: -0.2,
    },
    previewText: {
        fontSize: 12,
        color: "#9CADC8",
        letterSpacing: -0.17,
    },
}))

const ChatContent = (props: any) => {
    const classes = useStyles();
    const { conversation } = props;
    const { otherUser, latestMessageText } = conversation;

    return (
        <Box className={classes.root}>
            <Box>
                <Typography className={classes.username}>
                    {otherUser.username}
                </Typography>
                <Typography className={classes.previewText}>
                    {latestMessageText}
                </Typography>
            </Box>
        </Box>
    )
}

export default ChatContent;
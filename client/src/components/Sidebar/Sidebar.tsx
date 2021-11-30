import { Box, Typography } from "@mui/material";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Search, Chat, CurrentUser } from "./index";
import { ReduxState } from "../../store";

const useStyles = makeStyles(() => ({
    root: {
        paddingLeft: 21,
        paddingRight: 21,
        flexGrow: 1
      },
      title: {
        fontSize: 20,
        letterSpacing: -0.29,
        fontWeight: "bold",
        marginTop: 32,
        marginBottom: 15
      }
}));

const Sidebar = (props: any) => {
    const classes = useStyles();
    const conversations = props.conversations || [];
    const { handleChange, searchTerm } = props;

    return (
        <Box className={classes.root}>
            <CurrentUser />
            <Typography className={classes.title}>Chats</Typography>
            <Search handleChange={handleChange} />
            {conversations
                .filter((conversation: any) => conversation.otherUser.username.includes(searchTerm))
                .map((conversation: any) => {
                    return <Chat conversation={conversation} key={conversation.otherUser.username} />
                })}
        </Box>
    )
}

const mapStateToProps = (state: ReduxState) => {
    return {
        conversations: state.conversations
    }
}
export default connect(mapStateToProps)(Sidebar);
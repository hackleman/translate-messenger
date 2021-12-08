import { Box, Typography } from "@mui/material";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Search, Chat, CurrentUser } from "./index";
import { ReduxState } from "../../store";

const useStyles = makeStyles(() => ({
    root: {
        paddingLeft: 21,
        paddingRight: 21,
        height: '100vh',
    }
}));

const Sidebar = (props: any) => {
    const classes = useStyles();
    const conversations = props.conversations || [];
    const { handleChange, searchTerm, activeConversation } = props;

    return (
        <Box className={classes.root}>
            <CurrentUser />
            <Typography 
                sx={{marginTop: 4, marginBottom: 3, fontSize: 20, letterSpacing: -0.29}}>
                    Chats
            </Typography>
            <Search handleChange={handleChange} />
            {conversations
                .filter((conversation: any) => conversation.otherUser.username.includes(searchTerm))
                .map((conversation: any) => {
                    return (
                        <Chat 
                            conversation={conversation} 
                            key={conversation.otherUser.username} 
                            activeConversation={activeConversation === conversation.otherUser.username}
                        />
                    )
                })}
        </Box>
    )
}

const mapStateToProps = (state: ReduxState) => {
    return {
        conversations: state.conversations,
        activeConversation: state.active
    }
}
export default connect(mapStateToProps)(Sidebar);
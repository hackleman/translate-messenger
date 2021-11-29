import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { connect } from "react-redux";
import { Header, Messages, Input } from './index';

const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      flexGrow: 8,
      flexDirection: "column"
    },
    chatContainer: {
      marginLeft: 41,
      marginRight: 41,
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "space-between"
    }
  }));

const ActiveChat = (props: any) => {
    const classes = useStyles();
    const { user } = props;
    const conversation = props.conversation || {};
    return (
      <Box className={classes.root}>
        {conversation.otherUser && (
          <>
            <Header
              username={conversation.otherUser.username}
              online={conversation.otherUser.online || false}
            />
            <Box className={classes.chatContainer}>
              <Messages
                messages={conversation.messages}
                otherUser={conversation.otherUser}
                userId={user.id}
              />
              <Input
                otherUser={conversation.otherUser}
                conversationId={conversation.id}
                user={user}
              />
            </Box>
          </>
        )}
      </Box>
    );
  };
  
const mapStateToProps = (state: any) => {
    return {
      user: state.user,
      conversation:
        state.conversations &&
        state.conversations.find(
          (conversation: any) => conversation.otherUser.username === state.active
        )
    };
};
  
export default connect(mapStateToProps, null)(ActiveChat);
  
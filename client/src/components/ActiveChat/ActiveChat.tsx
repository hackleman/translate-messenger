import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { connect } from "react-redux";
import { Header, Messages, Input } from './index';
import { ReduxState } from "../../store";

const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      flexDirection: "column",
      height: '100vh',
      marginLeft: 41,
      marginRight: 41,
      justifyContent: 'space-between'
    },
    messages: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "space-between",
      padding: '1rem',
      maxHeight: '75vh',
      borderRadius: '1rem',
    },
  }));

const ActiveChat = (props: any) => {
    const classes = useStyles();
    const { user } = props;
    const conversation = props.conversation || {};
    
    return (
      <>
        {conversation.otherUser ? (
          <Box className={classes.root}>
            <Header
              username={conversation.otherUser.username}
              online={conversation.otherUser.online || false}
            />
            <Box className={classes.messages}>
              <Messages
                messages={conversation.messages}
                latestRead={conversation.latestReadMessage}
                otherUser={conversation.otherUser}
                userId={user.id}
              />
            </Box>
            <Box>
              <Input
                  otherUser={conversation.otherUser}
                  conversationId={conversation.id}
                  user={user}
                />
            </Box>
          </Box>
        ) : 
          <Box>
          </Box>
      }
      </>
    );
  };
  
const mapStateToProps = (state: ReduxState) => {
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
  
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Box, Badge } from "@mui/material";
import { BadgeAvatar, ChatContent } from './index';
import { setActiveConversation } from "../../store/thunks";

const useStyles = makeStyles(() => ({
    root: {
      borderRadius: 8,
      height: 80,
      boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      "&:hover": {
        cursor: "grab"
      }
    },
    badge: {
        width: 14,
        top: '1.75rem',
        right: '2vw',
        borderRadius: "50%",
        backgroundColor: "#3A8DFF",
        color: "white",
        fontWeight: 600
    },
    badgeRoot: {
        width: '100%'
    }
  }));

const Chat = (props: any) => {
    const classes = useStyles();
    const { conversation, setActiveChat } = props;
    const { otherUser } = conversation;

    const handleClick = async (conversation: any) => {
        await setActiveChat(conversation.otherUser.username);
    }

    return (
            <Box onClick={() => handleClick(conversation)} className={classes.root}>
                <Badge
                    classes={{ badge: `${classes.badge}` }}
                    className={classes.badgeRoot}
                    badgeContent={conversation.unreadCount}>
                    <BadgeAvatar
                        username={otherUser.username}
                        online={otherUser.online}
                        photoUrl={otherUser.photoUrl}
                        sidebar={true}
                    />
                    <ChatContent conversation={conversation} />
                </Badge>
            </Box>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setActiveChat: (username: string) => {
            dispatch(setActiveConversation(username));
        }
    }
}

export default connect(null, mapDispatchToProps)(Chat);

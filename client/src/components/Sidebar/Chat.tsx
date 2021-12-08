import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Box, Badge } from "@mui/material";
import { BadgeAvatar, ChatContent } from './index';
import { setActiveConversation } from "../../store/thunks";

const useStyles = makeStyles(() => ({
    root: {
      height: 80,
      marginBottom: 10,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      "&:hover": {
        cursor: "grab",
        backgroundColor: 'rgba(0, 0, 0, .1)',
        transition: '0.5s'
      },
      boxShadow: "1px 1px 1px 1px lightblue",
      transition: '0.75s'
    },
    active: {
        backgroundColor: 'rgba(0, 0, 0, .1)',
    },
    badge: {
        width: 14,
        top: '50%!important',
        right: '10%!important',
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
    const { conversation, setActiveChat, activeConversation } = props;
    const { otherUser } = conversation;

    const handleClick = async (conversation: any) => {
        await setActiveChat(conversation);
    }

    const activeClasses = `${classes.root} ${activeConversation && classes.active}`

    return (
        <Box 
            onClick={() => handleClick(conversation)} 
            className={activeClasses}
        >
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
        setActiveChat: (conversation: any) => {
            dispatch(setActiveConversation(conversation));
        }
    }
}

export default connect(null, mapDispatchToProps)(Chat);

import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { BadgeAvatar, ChatContent } from './index';
import { setActiveChat } from '../../store/reducers/active'; 

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
    }
  }));

const Chat = (props: any) => {
    const classes = useStyles();
    const { conversation } = props;
    const { otherUser } = conversation;

    const handleClick = async (conversation: any) => {
        await props.setActiveChat(conversation.otherUser.username);
    }

    return (
        <Box onClick={() => handleClick(conversation)} className={classes.root}>
            <BadgeAvatar
                username={otherUser.username}
                online={otherUser.online}
                photoUrl={otherUser.photoUrl}
                sidebar={true}
            />
            <ChatContent conversation={conversation} />
        </Box>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setActiveChat: (id: string) => {
            dispatch(setActiveChat(id));
        }
    }
}

export default connect(null, mapDispatchToProps)(Chat);

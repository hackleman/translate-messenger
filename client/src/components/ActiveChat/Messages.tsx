import { useEffect } from 'react';
import { Box } from "@mui/material";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyles = makeStyles(() => ({
  messages: {
    overflowY: 'scroll',
    overflowX: 'hidden'
  }
}));

const Messages = (props: any) => {
  const classes = useStyles();
  const { messages, otherUser, userId, latestRead } = props;
  let JSONmessages = JSON.stringify(messages);

  const executeScroll = () => {
    const scrollContainer = document.getElementById('scrollBottom');

    if (scrollContainer) {
      scrollContainer.scrollIntoView({ behavior: 'smooth'})
    }
  }

  useEffect(executeScroll, [JSONmessages]);

  return (
    <Box className={classes.messages}>
      {messages.map((message: any, idx: number) => {
        const time = moment(message.createdAt).format("h:mm");

        return (message.senderId === userId) ? (
          <SenderBubble 
            key={message.id} 
            text={message.text} 
            latestRead={message.id === latestRead}
            time={time} 
            photoUrl={otherUser.photoUrl} 
          />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
      <Box id="scrollBottom" />
    </Box>
  );
};

export default Messages;
import { useState } from "react";
import { FormControl, FilledInput } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/thunks";

const useStyles = makeStyles(() => ({
    root: {
      justifySelf: "flex-end",
      marginTop: 15
    },
    input: {
      height: 70,
      backgroundColor: "#F4F6FA",
      borderRadius: 8,
      marginBottom: 20
    }
}));

const Input = (props: any) => {
    const classes = useStyles();
    const [text, setText] = useState("");
    const { postMessage, otherUser, conversationId, user } = props;
  
    const handleChange = (event: any) => {
      setText(event.target.value);
    };
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
      const reqBody = {
        text: event.target.text.value,
        recipientId: otherUser.id,
        conversationId,
        sender: conversationId ? null : user
      };
      await postMessage(reqBody);
      setText("");
    };
  
    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
          />
        </FormControl>
      </form>
    );
};
  
const mapDispatchToProps = (dispatch: any) => {
    return {
      postMessage: (message: any) => {
        dispatch(postMessage(message));
      },
    };
};
  
export default connect(null, mapDispatchToProps)(Input);
  
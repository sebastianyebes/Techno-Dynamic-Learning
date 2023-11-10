import React, { useRef } from 'react';

import { LessonsService } from 'apis/LessonsService';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

const ChatbotDialog = (props) => {
  const { open, handleClose, lessonId, pageId } = props;
  const messageInputRef = useRef();
  const [isGettingResponse, setIsGettingResponse] = React.useState(false);
  const [messages, setMessages] = React.useState([
    {
      message: 'Hi, I am the chatbot. How can I help you?',
      sender: 'bot'
    }
  ]);

  const handleSend = async () => {
    setIsGettingResponse(true);
    const message = messageInputRef.current.value;
    messageInputRef.current.value = ''; // Clear the message input immediately after getting its value

    // Add the user's message to the messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: message, sender: 'You' }
    ]);

    try {
      const response = await LessonsService.chatbot(lessonId, pageId, message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: response.data.response, sender: 'bot' }
      ]);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsGettingResponse(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='md'>
      <DialogTitle>Chatbot</DialogTitle>
      <DialogContent dividers>
        <Box display='flex' flexDirection='column' width={1}>
          {messages.map((message, index) => {
            if (message.sender === 'bot') {
              return (
                <Paper
                  variant='outlined'
                  key={index}
                  sx={{
                    p: 1,
                    mb: 1,
                    maxWidth: '60%',
                    alignSelf: 'flex-start',
                    overflowWrap: 'break-word',
                    bgcolor: 'rgba(240, 240, 240, 0.1)',
                    borderRadius: '15px',
                    borderBottomLeftRadius: '0px'
                  }}>
                  <Typography variant='subtitle2' color='primary'>
                    {message.sender}
                  </Typography>
                  <Typography variant='body2'>{message.message}</Typography>
                </Paper>
              );
            } else {
              return (
                <Paper
                  variant='outlined'
                  key={index}
                  sx={{
                    p: 1,
                    mb: 1,
                    maxWidth: '60%',
                    alignSelf: 'flex-end',
                    bgcolor: 'rgba(27, 94, 32, 0.1)',
                    borderColor: 'primary.main',
                    overflowWrap: 'break-word',
                    borderRadius: '15px',
                    borderBottomRightRadius: '0px'
                  }}>
                  <Typography align='right' variant='subtitle2' color='primary'>
                    {message.sender}
                  </Typography>
                  <Typography variant='body2'>{message.message}</Typography>
                </Paper>
              );
            }
          })}
          {isGettingResponse && (
            <Typography
              variant='body2'
              sx={{
                mb: 1
              }}>
              Getting response...
            </Typography>
          )}
        </Box>
        <Box display='flex' gap={1}>
          <TextField
            variant='standard'
            fullWidth
            label='Message'
            multiline
            maxRows={3}
            inputRef={messageInputRef}
          />
          <Button
            onClick={handleSend}
            variant='contained'
            color='primary'
            disabled={isGettingResponse}
            endIcon={<SendIcon />}>
            Send
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;

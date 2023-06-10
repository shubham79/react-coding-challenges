import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import defaultMessages from '../../../contexts/LatestMessages/constants/initialMessages';
import useScrollToBottom from '../../../customHooks/scrollToBottom';

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function Messages() {
  const messageElementRef = useRef(null);
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
  const [allMessages, setAllMessages] = useState([
    { user: 'bot', message: defaultMessages.bot },
  ]);
  const [userMessage, setUserMessage] = useState();
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Scroll to bottom hook for new message received / send
  useScrollToBottom(messageElementRef);

  const handleBotMessageReceived = useCallback(
    (botMessage) => {
      playReceive();
      setLatestMessage('bot', botMessage);
      setIsBotTyping(false);
      setAllMessages((mssgs) => [
        ...mssgs,
        { user: 'bot', message: botMessage },
      ]);
    },
    [playReceive, setLatestMessage]
  );

  // side-effect ro handle on bot-message
  useEffect(() => {
    socket.on('bot-message', (message) => {
      // handle Bot Message
      handleBotMessageReceived(message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // side-effect ro handle on bot-typing
  useEffect(() => {
    socket.on('bot-typing', (message) => {
      // handle bot typing
      setIsBotTyping(true);
    });
  }, []);

  // send message to Botty
  const sendMessage = useCallback(() => {
    if (userMessage && userMessage.length > 0) {
      playSend();
      socket.emit('user-message', userMessage);
      setAllMessages((mssgs) => [
        ...mssgs,
        { user: 'me', message: userMessage },
      ]);
    }
  }, [playSend, userMessage]);

  // set User message to local state
  const onChangeMessage = useCallback((event) => {
    const inputValue = event.target.value;
    setUserMessage(inputValue);
  }, []);

  return (
    <div className='messages'>
      <Header />
      <div className='messages__list' id='message-list' ref={messageElementRef}>
        {allMessages?.map((messageItem, index) => (
          <Message
            botTyping={isBotTyping}
            message={messageItem}
            nextMessage={allMessages[index + 1]}
          />
        ))}
      </div>
      {isBotTyping && <TypingMessage />}
      <Footer
        message={userMessage}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  );
}

export default Messages;

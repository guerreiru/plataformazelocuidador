import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { TYPES as CHAT_TYPES } from '../../store/ChatReducer';
import { formatMessage } from '../../utils/chatUtils';

const options = {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
  // autoRefreshToken: true,
  // persistSession: true
  // url: string,
  // headers?: { [key: string]: string },
};

export const supabaseClient = createClient(
  'https://uvegwjpwmzhkjfxjxxsx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZWd3anB3bXpoa2pmeGp4eHN4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0OTg2MDczMSwiZXhwIjoxOTY1NDM2NzMxfQ.J--Ww4DKD3fRJliiWlVq7RxIC_574FUfFSPMwIZjEPc',
  options,
);

// Banco que estava integrada no App Cuidador, confirmar o porque estava diferente com o Romulo.
// export const supabaseClient = createClient(
//   'https://vsblxlqdvbrmuvromivn.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM1NTIwNTc3LCJleHAiOjE5NTEwOTY1Nzd9._R80Z3BrxwYv50LDxy_b6CwrzgBm4RAaUkOteFB9HsE',
//   options,
// );

let mySubscriptionSender = null;
let mySubscriptionReceiver = null;

const ChatProvider = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, token: jwt } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState({});
  const dispatch = useDispatch();

  const initializeRedux = async (data) => {
    const formatedData = {};

    for (let i = 0; i < data.length; i++) {
      const message = data[i];
      if (formatedData[message.subject]) {
        formatedData[message.subject].unreadCount =
          formatedData[message.subject].unreadCount + 1;
      } else {
        formatedData[message.subject] = { unreadCount: 1 };
      }

      if (formatedData[message.subject][message.sender]) {
        //formatedData[message.subject][message.sender].messages.push(message);
        formatedData[message.subject][message.sender].unreadCount =
          formatedData[message.subject][message.sender].unreadCount + 1;
      } else {
        formatedData[message.subject][message.sender] = {
          userType: message.sender_type,
          messages: [],
          unreadCount: 1,
        };
      }
    }

    dispatch({ type: CHAT_TYPES.INITIALIZE, payload: formatedData });
  };

  const initChat = async () => {
    if (user && user.id) {
      const { data, error } = await supabaseClient
        .from('chat')
        .select()
        .filter('receiver', 'eq', user.id)
        .filter('read', 'eq', false);
      if (error) {
        // eslint-disable-next-line no-console
        console.error('ERROR ChatProvider:69', error);
      }
      if (data) {
        initializeRedux(data);
      }
    }
  };

  const initSubs = () => {
    if (!mySubscriptionSender && user && user.id) {
      mySubscriptionSender = supabaseClient
        .from(`chat:sender=eq.${user.id}`)
        .on('*', (payload) => {
          if (payload.eventType === 'INSERT') {
            setNewMessage(payload.new);
          }
        })
        .subscribe();

      mySubscriptionReceiver = supabaseClient
        .from(`chat:receiver=eq.${user.id}`)
        .on('*', (payload) => {
          if (payload.eventType === 'INSERT') {
            setNewMessage(payload.new);
          }
        })
        .subscribe();
    }
  };

  const addNewMessage = async () => {
    if (
      user &&
      newMessage.id &&
      (newMessage.sender === user.id || newMessage.receiver === user.id)
    ) {
      const willIncrement = newMessage.sender !== user.id;

      const _newMessage = await formatMessage(newMessage);
      const userType =
        newMessage.sender === user.id ? null : newMessage.sender_type;
      const userId =
        newMessage.sender === user.id ? newMessage.receiver : newMessage.sender;

      dispatch({
        type: CHAT_TYPES.NEW_MESSAGE_ADD,
        payload: {
          message: _newMessage,
          userType: userType,
          userId: userId,
          subject: newMessage.subject,
          willIncrement,
        },
      });
    }
  };

  useEffect(() => {
    addNewMessage();
  }, [newMessage]);

  useEffect(() => {
    initChat();
    initSubs();
  }, [user]);

  return null;
};

export default ChatProvider;

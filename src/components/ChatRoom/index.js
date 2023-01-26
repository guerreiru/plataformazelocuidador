import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import supabase from 'services/supabase';

let mySubscription = null;

export function ChatRoom({ user, senior, messages = [], userSelected = {} }) {
  // id: userId,
  // name: userName,
  // avatar: userAvatar = 'https://placeimg.com/140/140/any',

  const submit = async (text) => {
    if (text) {
      try {
        const { data, err } = await supabase.from('chat').insert({
          sender: user.id,
          sender_name: user.name,
          subject: senior.id,
          receiver: userSelected.id,
          message: text,
          read: false,
        });
      } catch (e) {
        //console.error(e);
      }
    }
  };
  /*
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState({});

  const _setMessageList = (ml) => {
    const newMessageList = {};
    for (let i = 0; i < ml.length; i++) {
      newMessageList[ml[i]._id] = { ...ml[i] };
    }
    setMessageList(Object.values(newMessageList));
  };

  const init = async () => {
    if (messageList.length === 0) {
      const { data, error } = await supabase
        .from('chat')
        .select()
        .eq('room', room);

      if (error) {
        //console.error(error);
        return;
      }
      const _formattedMessageList = await Promise.all(
        data.reverse().map((d) => formatMessage(d)),
      );
      _setMessageList(_formattedMessageList.filter((message) => !!message._id));
    }
  };

  if (!mySubscription) {
    mySubscription = supabase
      .from(`chat:room=eq.${room}`)
      .on('*', (payload) => setNewMessage(payload.new))
      .subscribe();
  }

  const addNewMessage = async () => {
    if (newMessage.id) {
      const _newMessage = await formatMessage(newMessage);
      _setMessageList([_newMessage, ...messageList]);
    }
  };

  useEffect(() => {
    addNewMessage();
  }, [newMessage]);

  useEffect(() => {
    init();

    return () => {
      supabase.removeSubscription(mySubscription);
    };
  }, []);

  const submit = async (text) => {
    if (text) {
      try {
        const { data, err } = await supabase.from('chat').insert({
          sender: userId,
          sender_name: userName,
          room,
          message: text,
        });
      } catch (e) {
        //console.error(e);
      }
    }
  };

  const formatMessage = async (dbMessage) => {
    try {
      return {
        _id: dbMessage.id,
        text: dbMessage?.message,
        createdAt: dbMessage?.created_at,
        user: {
          _id: dbMessage.sender,
          name: dbMessage.sender_name,
          avatar: userAvatar,
        },
      };
    } catch (error) {
      // console.error(error);
    }
  };

  */
  return (
    <>
      <SafeAreaView>
        <GiftedChat
          messages={messages}
          onSend={(msgs) => msgs.map((mess) => submit(mess.text))}
          user={{ _id: userSelected.id }}
          userSelected={userSelected}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
}

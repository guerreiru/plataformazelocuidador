/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Bubble,
} from 'react-native-gifted-chat';
import { StatusBar, View, Image, Text } from 'react-native';
import { supabaseClient } from 'components/ChatProvider';
import { useAuth, useSenior } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import AvatarDefault from 'Images/AvatarDefault.png';
import IconSend from '../../../../assets/send.png';
import { DivChatDesactive, TextStyled, IconChat, StrongStyled } from './style';
import IconChatDesactive from '../../../../assets/SpeakerNotesOff.png';

import 'dayjs/locale/pt-br';
import { formatMessage } from 'utils/chatUtils';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../Teams/Item/styles';
import usePhoto from 'hooks/usePhoto';
import colors from 'styles/colors';

export function Chat({ route }) {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(AvatarDefault);
  const { user } = useAuth();
  const { senior } = useSenior();
  const { userSelected } = useSelector((state) => state.chat);
  const navigation = useNavigation();
  const { getPhotoByProfessional, getPhotoByCaregiver } = usePhoto();

  const messages = useSelector((state) => {
    if (
      state.chat.data[senior.id] &&
      state.chat.data[senior.id][userSelected.id]
    ) {
      return state.chat.data[senior.id][userSelected.id].messages;
    }
    return [];
  });

  const updatePhoto = async () => {
    let _photo;
    if (
      userSelected.profession === 'MÉDICO(A)' ||
      userSelected.profession === 'ENFERMEIRO(A)'
    ) {
      _photo = await getPhotoByProfessional(userSelected.id);
    } else {
      _photo = await getPhotoByCaregiver(userSelected.id);
    }
    setPhoto(_photo);
  };

  useEffect(() => {
    updatePhoto();
  }, [userSelected]);

  const submit = async (text) => {
    if (text) {
      try {
        const { data, error } = await supabaseClient.from('chat').insert({
          sender: user.id,
          sender_name: user.name,
          subject: senior.id,
          receiver: userSelected.id,
          message: text,
          read: false,
        });

        if (data) {
          return data;
        }
        if (error) {
          // eslint-disable-next-line no-console
          console.log('ERROR chatUtils:77', error);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('ERROR chatUtils:81', e);
      }
    }
  };

  const initMessages = async () => {
    const { data: dataReceiver, error: errorReceiver } = await supabaseClient
      .from('chat')
      .select()
      .eq('subject', senior.id)
      .eq('sender', userSelected.id)
      .eq('receiver', user.id);

    const { data: dataSender, error: errorSender } = await supabaseClient
      .from('chat')
      .select()
      .eq('subject', senior.id)
      .eq('sender', user.id)
      .eq('receiver', userSelected.id);

    if (errorSender || errorReceiver) {
      // eslint-disable-next-line no-console
      console.error('ERRORS', errorSender, errorReceiver);
    }

    const data = [...dataSender, ...dataReceiver].sort((a, b) => {
      return a.created_at > b.created_at ? -1 : 1;
    });
    if (data) {
      const _formattedMessageList = await Promise.all(
        data.map((d) => formatMessage(d)),
      );
      const finalMessages = _formattedMessageList.filter(
        (message) => !!message._id,
      );

      dispatch({
        type: 'OLD_MESSAGE_LISTED',
        payload: {
          messages: finalMessages,
          subject: senior.id,
          userId: userSelected.id,
          userType: userSelected.user_type,
        },
      });
    }
  };

  useEffect(() => {
    initMessages();
  }, [user, userSelected, senior]);

  const setRead = async () => {
    const { data, error } = await supabaseClient
      .from('chat')
      .update({
        read: true,
      })
      .eq('receiver', user.id)
      .eq('sender', userSelected.id)
      .eq('read', false);

    if (data && data.length) {
      dispatch({
        type: 'NEW_MESSAGES_READ',
        payload: {
          subject: senior.id,
          userId: userSelected.id,
          count: data?.length || 0,
        },
      });
    }
  };

  useEffect(() => {
    setRead();
  }, [messages]);

  const renderTitle = (props) => {
    const names = userSelected.full_name.split(' ');
    return (
      <View style={styles.containerTop}>
        <Avatar source={photo} styles={styles.photo} />
        <View style={styles.containerNames}>
          <Text style={styles.topName}>{`${names[0]} ${names[1]}`}</Text>
          <Text style={{ fontSize: 14, color: 'white' }}>
            {userSelected.profession.toLowerCase()}
          </Text>
        </View>
      </View>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#F8EBFF',
          },
          right: {
            backgroundColor: colors.PRIMARY,
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10 }}>
          <Image
            source={IconSend}
            style={{ width: 42, height: 42, marginBottom: -2 }}
          />
        </View>
      </Send>
    );
  };

  useEffect(() => {
    navigation.setOptions({ headerTitle: renderTitle });
  }, []);

  if (senior && user && userSelected) {
    return (
      <>
        <View style={styles.bg}>
          <GiftedChat
            renderAvatarOnTop={false}
            placeholder={'Digite sua mensagem'}
            messages={messages}
            onSend={(msgs) => msgs.map((mess) => submit(mess.text))}
            user={{ _id: user.id }}
            userSelected={userSelected}
            alwaysShowSend={
              userSelected.chat_active || userSelected.chat_active === undefined
                ? true
                : false
            }
            locale={'pt-br'}
            renderSend={
              userSelected.chat_active || userSelected.chat_active === undefined
                ? renderSend
                : null
            }
            renderAvatar={null}
            renderInputToolbar={(props) =>
              userSelected.chat_active ||
              userSelected.chat_active === undefined ? (
                <InputToolbar
                  {...props}
                  containerStyle={styles.containerStyle}
                />
              ) : null
            }
            textInputStyle={styles.textInputStyle}
            renderBubble={renderBubble}
          />
          {userSelected.chat_active === false ? (
            <DivChatDesactive>
              <TextStyled>
                O chat
                <StrongStyled> desse profissional</StrongStyled> está desativado
                para troca de mensagens
              </TextStyled>
              <IconChat source={IconChatDesactive} resizeMode="cover" />
            </DivChatDesactive>
          ) : null}
        </View>
        <StatusBar style="auto" />
      </>
    );
  }
  return null;
}

const styles = {
  bg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 20,
    marginRight: 5,
    backgroundColor: 'white',
    lineHeight: 20,
    padding: 10,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderTopWidth: 1,
    paddingVertical: 5,
  },
  containerTop: { flexDirection: 'row', alignItems: 'flex-start' },
  topName: { fontSize: 18, color: 'white', fontWeight: 'bold' },
  containerNames: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    flex: 1,
  },
};

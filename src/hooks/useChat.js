import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import useSupabase from './useSupabase';
import { TYPES } from 'store/ChatReducer';

let mySubscriptionSender = null;
let mySubscriptionReceiver = null;

function useChat() {
  const { supabase } = useSupabase();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const formatMessage = async (dbMessage) => {
    try {
      return {
        _id: dbMessage.id,
        text: dbMessage?.message,
        subject: dbMessage?.subject,
        createdAt: dbMessage?.created_at,
        user: {
          _id: dbMessage.sender,
          name: dbMessage.sender_name,
          avatar: dbMessage.avatar,
        },
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const dispatchNewMessage = (newMessage) => {
    const formattedMessageList = formatMessage(newMessage);
    dispatch({
      type: TYPES.NEW_MESSAGE_ADD,
      payload: {
        subject: formattedMessageList.subject,
        userId: formattedMessageList.user._id,
        messages: {
          _id: formattedMessageList._id,
          text: formattedMessageList.text,
          createdAt: formattedMessageList.createdAt,
        },
        userType: formattedMessageList.user.type,
      },
    });
  };

  const init = async () => {
    try {
      const { data, error } = await supabase
        .from('chat')
        .eq('read', false)
        .eq('receiver', user.id)
        .select()
        .execute();

      if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return;
      }

      const _formattedMessageList = await Promise.all(
        data.reverse().map((d) => formatMessage(d)),
      );

      for (let i = 0; i < _formattedMessageList.length; i++) {
        dispatch({
          type: TYPES.OLD_MESSAGE_LISTED,
          payload: {
            subject: _formattedMessageList[i].subject,
            userId: _formattedMessageList[i].user._id,
            messages: {
              _id: _formattedMessageList[i]._id,
              text: _formattedMessageList[i].text,
              createdAt: _formattedMessageList[i].createdAt,
            },
            userType: _formattedMessageList[i].user.type,
          },
        });
      }

      if (!mySubscriptionSender) {
        mySubscriptionSender = supabase
          .from(`chat:sender=eq.${user.id}`)
          .on('*', (payload) => dispatchNewMessage(payload.new))
          .subscribe();
      }

      if (!mySubscriptionReceiver) {
        mySubscriptionReceiver = supabase
          .from(`chat:receiver=eq.${user.id}`)
          .on('*', (payload) => dispatchNewMessage(payload.new))
          .subscribe();
      }
    } catch (e) {
      console.error('ERROR ===> ', e);
    }
  };

  useEffect(() => {
    if (user) {
      init();

      return () => {
        supabase.removeSubscription(mySubscriptionSender);
        supabase.removeSubscription(mySubscriptionReceiver);
      };
    }
  }, [user]);

  return { supabase };

  /* FLUXO DE ENTRADA

  1. Quando o usuário entra na aplicação, o fluxo é:
    - Conecta no supabase OK
    - Verificar no LocalStorage a data da Última Mensagem
    - Executar listenMessages() com a data maior que da última mensagem
    - Todas as novas mensagens deverão ser adicionadas à local Storage com flag (NÃO LIDA)

  */
}

export default useChat;

export const formatMessage = async (dbMessage) => {
  try {
    return {
      _id: dbMessage.id,
      text: dbMessage?.message,
      createdAt: dbMessage?.created_at,
      subject: dbMessage?.subject,
      user: {
        _id: dbMessage.sender,
        userType: dbMessage.sender_type,
        name: dbMessage.sender_name,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR chatUtils:16', error);
  }
};

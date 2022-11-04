import { Linking } from 'react-native';

const sendOnWhatsApp = (msg, mobile) => {
  if (mobile) {
    if (msg) {
      let url = `whatsapp://send?text=${msg}&phone=${mobile}`;
      Linking.openURL(url)
        .then((data) => {
          //console.info('WhatsApp Opened');
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          alert(
            'Parece que você não tem WhatsApp instalado neste dispositivo.',
          );
        });
    } else {
      // eslint-disable-next-line no-alert
      alert('Please insert message to send');
    }
  } else {
    // eslint-disable-next-line no-alert
    alert('Please insert mobile no');
  }
};

export default sendOnWhatsApp;

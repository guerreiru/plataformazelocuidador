import { message } from './message';
const getErrors = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  if (error.response) {
    const responseData = error.response.data;

    let err;

    if (responseData.error) {
      err = responseData.error;
    } else if (responseData.errors) {
      err = responseData.errors;
    }

    if (err) {
      if (typeof err === 'string') {
        return err;
      }
      if (Array.isArray(err)) {
        return err.join(', ');
      }
    }
  }
  return 'Erro inesperado no server. Entre em contato com o suporte!';
};

export function errorHandler(err) {
  const errorsMsg = getErrors(err);

  if (errorsMsg) {
    message.error(errorsMsg);
    return;
  }
  if (err.response.status === 400) {
    message.error('Erro na autenticação.');
    return;
  }
  if (err.response.status === 404) {
    message.error('Desculpe! Página não encontrada.');
    return;
  }
  if (err.response.status === 500 || err.response.status === 501) {
    message.error('Erro interno, tente novamente mais tarde!');
  }
}

import * as Yup from 'yup';
import moment from 'moment';

import { REGEX_NAME, empty } from '../utils';

export const basicFieldsCaregiver = () => [
  {
    name: 'full_name',
    label: 'Nome completo do cuidador',
    placeholder: 'Ex: Fulano dos Santos',
    validation: Yup.string()
      .required('Este campo não pode ficar em branco')
      .matches(REGEX_NAME, {
        message: 'Só são permitidas letras (A-Z), acentos e espaços',
      })
      .min(2, 'Nome deve ter ao menos 2 caracteres')
      .test(
        'teste',
        'Esse campo não aceita espaço(s) em branco no início do texto.',
        (value) => empty(value),
      ),
  },
  {
    name: 'phone_number',
    label: 'Whatsapp do cuidador',
    mask: 'cel-phone',
    placeholder: '(XX) XXXXX-XXXX',
    validation: Yup.string()
      .length(15, 'O telefone digitado está incorreto')
      .required('Este campo não pode ficar em branco'),
  },
  {
    name: 'email',
    label: 'E-mail do cuidador',
    keyboardType: 'email-address',
    placeholder: 'exemplo@email.com',
    validation: Yup.string()
      .email('O e-mail digitado está incorreto')
      .required('Este campo não pode ficar em branco'),
  },
];

export const fieldAccompaniesSince = () => [
  {
    name: 'accompanies_since',
    label: 'Acompanha desde',
    mask: 'datetime',
    placeholder: 'DD/MM/AAAA',
    options: {
      format: 'DD/MM/YYYY',
    },
    validation: Yup.string()
      .required('Este campo não pode ficar em branco')
      .test('valid-date', 'Data no formato inválido', (value) => {
        var aDate = moment(value, 'DD/MM/YYYY', true);
        return aDate.isValid();
      })
      .test('valid-date', 'Não se pode marcar uma data no futuro', (value) => {
        const date = moment(value, 'DD/MM/YYYY').toDate();
        if (date > moment.now()) {
          return false;
        }
        return true;
      }),
  },
];

import { Alert } from 'react-native';
import * as Yup from 'yup';
import moment from 'moment';
import { EMPTY } from '../utils/regex';

export const setValidationField = (regex, message) => {
  return Yup.string()
    .nullable()
    .matches(regex, { message, excludeEmptyString: true });
};

export const getValidationSchema = (fields) => {
  const validations = {};
  fields.forEach((f) => {
    if (f.validation) {
      validations[f.name] = f.validation;
    }
  });
  return Yup.object().shape(validations);
};

export const empty = (value) => {
  if (value && value.indexOf(' ') === 0) {
    return false;
  }
  return !EMPTY.test(value);
};

export const validDate = Yup.string()
  .nullable()
  .test('valid-date', 'Data no formato inválido', (value) => {
    if (value) {
      var aDate = moment(value, 'DD/MM/YYYY', true);
      return aDate.isValid();
    }
    return true;
  })
  .test('valid-max-age', 'Data de Acompanhamento fora dos limites', (value) => {
    if (value) {
      return moment().diff(moment(value, 'DD/MM/YYYY'), 'years') <= 130;
    }
    return true;
  });

export const validBirthdateCaregiver = Yup.string()
  .nullable()
  .test('valid-date', 'Data no formato inválido', (value) => {
    if (value) {
      var aDate = moment(value, 'DD/MM/YYYY', true);
      return aDate.isValid();
    }
    return true;
  })
  .test('valid-max-age', 'Data de nascimento fora dos limites', (value) => {
    if (value) {
      return moment().diff(moment(value, 'DD/MM/YYYY'), 'years') <= 130;
    }
    return true;
  })
  .test('valid-min-age', 'O cuidador deve ter no mínimo 18 anos', (value) => {
    if (value) {
      return moment().diff(moment(value, 'DD/MM/YYYY'), 'years') >= 18;
    }
    return true;
  });

export const validBirthdateSenior = Yup.string()
  .required('Campo obrigatório não preenchido')
  .test('valid-date', 'Data no formato inválido', (value) => {
    var aDate = moment(value, 'DD/MM/YYYY', true);
    return aDate.isValid();
  })
  .test('valid-max-age', 'Data de nascimento fora dos limites', (value) => {
    return moment().diff(moment(value, 'DD/MM/YYYY'), 'years') <= 130;
  })
  .test('valid-min-age', 'O idoso deve ter no mínimo 18 anos', (value) => {
    return moment().diff(moment(value, 'DD/MM/YYYY'), 'years') >= 18; // TODO qual a idade mínima de um idoso na aplicação?
  });

export const validAccompaniesSince = () => {};

export const getFormValidationErrorMessage = (config, fields, logError) => {
  const arrayErrorsMessage = [];
  fields.forEach((f) => {
    const fieldNameInValidation = logError[f.name];
    config.setFieldTouched(f.name);
    if (fieldNameInValidation) {
      let fieldLabelFormat;
      if (f.label) {
        fieldLabelFormat = f.label.toLowerCase().replace(' *', '');
        fieldLabelFormat = f.label.toLowerCase().replace('*', '');
      } else {
        fieldLabelFormat = f.name.toLowerCase().replace(' *', '');
        fieldLabelFormat = f.name.toLowerCase().replace('*', '');
      }

      if (fieldLabelFormat) {
        var firstLetter = fieldLabelFormat[0];
        fieldLabelFormat =
          firstLetter.toUpperCase() + fieldLabelFormat.slice(1);
        arrayErrorsMessage.push(
          `- ${fieldLabelFormat} - ${fieldNameInValidation}`,
        );
      } else {
        arrayErrorsMessage.push(`-${fieldNameInValidation}`);
      }
    }
  });
  const errorsMessage = arrayErrorsMessage.join('\n');
  Alert.alert('Erros no Formulário', errorsMessage);
};

export const validationMin = (value) => {
  if (value) {
    return value && value.length >= 8;
  }
  return true;
};

export const validationUpper = (value) => {
  if (value) {
    return /[A-Z]/.test(value);
  }
  return true;
};

export const validationLower = (value) => {
  if (value) {
    return /[a-z]/.test(value);
  }
  return true;
};
export const validationNumber = (value) => {
  if (value) {
    return /[0-9]/.test(value);
  }
  return true;
};

export const validationEqual = (value, confirm) => value === confirm;
export const validationEspecial = (value) => {
  if (value) {
    // eslint-disable-next-line no-useless-escape
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
  }
  return true;
};

export const PasswordSchemaValidation = Yup.string()
  .required('Este campo não pode ficar em branco')
  .min(8, 'Sua senha deve conter no mínimo 8 dígitos')
  .test(
    'validate-upper-char',
    'Sua senha deve conter uma letra maiúscula',
    validationUpper,
  )
  .test(
    'validate-lowe-char',
    'Sua senha deve conter uma letra minúscula',
    validationLower,
  )
  .test(
    'validate-number-char',
    'Sua senha deve conter um número',
    validationNumber,
  )
  .test(
    'validate-especial-char',
    'Sua senha deve conter um caractere especial (símbolo)',
    validationEspecial,
  )
  .trim();

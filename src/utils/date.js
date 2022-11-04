import moment from 'moment';
import { formatDistanceToNow } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

const AdministrationInterval = {
  ONCE_A_DAY: '1 vez ao dia',
  TWO_TIMES_A_DAY: '2 vezes ao dia',
  THREE_TIMES_A_DAY: '3 vezes ao dia',
  FOUR_TIMES_A_DAY: '4 vezes ao dia',
  FIVE_TIMES_A_DAY: '5 vezes ao dia',
  SIX_TIMES_A_DAY: '6 vezes ao dia',
  EVERY_12_HOURS: '12/12 horas',
  EVERY_8_HOURS: '8/8 horas',
  EVERY_6_HOURS: '6/6 horas',
  EVERY_4_HOURS: '4/4 horas',
  EVERY_2_HOURS: '2/2 horas',
  EVERY_HOUR: 'A cada hora',
};

export const calculateAge = (birthdate) => {
  try {
    const ageOfSenior = Math.floor(
      moment(new Date()).diff(moment(birthdate, 'DD/MM/YYYY'), 'years', true),
    );
    return ageOfSenior;
  } catch (error) {
    return '';
  }
};

export const fromNow = (date) => {
  return formatDistanceToNow(new Date(date), { locale: pt });
};

export const formatDate = (date, format = 'DD/MM/YYYY') => {
  try {
    if (date) {
      return moment.utc(date).format(format);
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};

export const isToday = (currentDate) =>
  moment(currentDate).isSame(new Date(), 'day');

export const isThisWeek = (currentDate) =>
  moment(currentDate).isSame(new Date(), 'week');

export const getTime = (date) => {
  try {
    const _date = new Date(date);
    return `${moment.utc(date).format('DD/MM/YYYY')} - ${_date.getHours()}:${(
      '00' + _date.getMinutes()
    ).slice(-2)}`;
  } catch (error) {
    return 'Erro no tratamento da data';
  }
};

export const getIncInMinutesByInterval = (administration_interval) => {
  const intervals = {
    [AdministrationInterval.ONCE_A_DAY]: 1440,
    [AdministrationInterval.TWO_TIMES_A_DAY]: 720,
    [AdministrationInterval.THREE_TIMES_A_DAY]: 480,
    [AdministrationInterval.FOUR_TIMES_A_DAY]: 360,
    [AdministrationInterval.FIVE_TIMES_A_DAY]: 288,
    [AdministrationInterval.SIX_TIMES_A_DAY]: 240,
    [AdministrationInterval.EVERY_12_HOURS]: 720,
    [AdministrationInterval.EVERY_8_HOURS]: 480,
    [AdministrationInterval.EVERY_6_HOURS]: 360,
    [AdministrationInterval.EVERY_4_HOURS]: 240,
    [AdministrationInterval.EVERY_2_HOURS]: 120,
    [AdministrationInterval.EVERY_HOUR]: 60,
  };

  return intervals[administration_interval];
};

export const calcHours = (startTime, administrationInterval) => {
  const intervalInMinutes = getIncInMinutesByInterval(administrationInterval);

  const timers = new Set();
  const _date = moment(startTime, 'DD/MM/YYYY HH:mm');
  for (let i = 0; i < 24; i++) {
    timers.add(_date.format('HH:mm'));
    _date.add(intervalInMinutes, 'minute');
  }
  return [...timers].splice(0, 24).sort().join(', ');
};

export const calcHoursByISO = (
  startTime,
  administrationInterval,
  asArray = false,
) => {
  if (!startTime) {
    return 'a definir';
  }
  const intervalInMinutes = getIncInMinutesByInterval(administrationInterval);

  const timers = new Set();
  const _date = moment(startTime);
  for (let i = 0; i < 24; i++) {
    timers.add(_date.format('HH:mm'));
    _date.add(intervalInMinutes, 'minute');
  }

  if (asArray) {
    return [...timers].splice(0, 24).sort();
  }

  return [...timers].splice(0, 24).sort().join(', ');
};

export const getArrayScheduleByStartAndInterval = (
  startTime,
  administrationInterval,
  debug = false,
) => {
  try {
    const response = [];

    const hours = calcHoursByISO(startTime, administrationInterval, true);

    for (let i = 0; i < hours.length; i++) {
      const strData = `${moment().format('YYYY-MM-DD')} ${hours[i]}`;
      let d = moment(strData, 'YYYY-MM-DD HH:mm');
      while (d < moment()) {
        d = d.add(1, 'day');
      }
      response.push(d.toDate());
    }
    return response;
  } catch (e) {
    return [new Date(startTime)];
  }
};

export const getNextDate = (time) => {
  const _date = moment();
  const _nowTime = _date.format('HH:mm');
  if (_nowTime > time) {
    _date.add(1, 'day');
  }
  const [hour, minute] = time.split(':').map((i) => Number(i));
  _date.set({ hour, minute, second: 0, millisecond: 0 });
  const finalDate = new Date(_date.toDate());
  return finalDate;
};

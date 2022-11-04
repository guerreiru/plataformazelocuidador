export const shortString = (value, size = 3) => {
  if (value) {
    return value.split(' ').slice(0, size).join(' ');
  }
  return '';
};

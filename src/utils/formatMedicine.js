const formatNameMedicine = (name) => {
  return name
    .substring(0, 1)
    .toUpperCase()
    .concat(name.substring(1).toLowerCase());
};

export default formatNameMedicine;

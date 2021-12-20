export const formatDate = (date) => {
  const _date = new Date(date);

  const year = _date.getFullYear();
  const month =
    _date.getMonth() + 1 < 10
      ? `0${_date.getMonth() + 1}`
      : _date.getMonth() + 1;
  const day = _date.getDate() < 10 ? `0${_date.getDate()}` : _date.getDate();

  return `${year}-${month}-${day}`;
};

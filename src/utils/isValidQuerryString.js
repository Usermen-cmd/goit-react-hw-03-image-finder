import toast from 'react-hot-toast';

const isValidQuerryString = (querryString, prevQuerryString) => {
  if (!querryString) {
    toast.error('Строка поиска пуста! Введите запрос');
    return false;
  } else if (querryString === prevQuerryString) {
    toast.error(`Вы уже смотрите ${prevQuerryString}`);
    return false;
  }
  return true;
};
export default isValidQuerryString;

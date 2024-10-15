export const createObservable = (initialState = []) => {
  let state = initialState;
  let observers = [];

  const notify = () => {
    observers.forEach((observer) => observer(state));
  };

  return {
    subscribe: (observer) => {
      observers = [...observers, observer];
    },
    unsubscribe: (observer) => {
      observers = observers.filter((obs) => obs !== observer);
    },
    setState: (newState) => { // при изменении состояния вызов, чтобы обновить список фильмов и уведомить всех подписчиков.
      state = newState;
      notify();
    },
    getState: () => state, //получаем текущее состояние 
  };
};
import { EventEmitter } from './';

export default (type, message, timeout) => {
  EventEmitter.emit('alert', {
    type: type,
    message: message,
    timeout: timeout
  });
};

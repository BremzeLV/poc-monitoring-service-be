import dayjs, { ConfigType } from 'dayjs';

export const handlebarsHelpers = {
  ifEquals: (arg1: unknown, arg2: unknown) => arg1 === arg2,
  formatDate: (date: ConfigType) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
};

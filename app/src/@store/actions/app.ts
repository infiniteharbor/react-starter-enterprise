import { AppConfig, SET_CONFIG } from '~@store/constants/app';

export const setConfig = (config: AppConfig) => ({
  type: SET_CONFIG,
  config
});

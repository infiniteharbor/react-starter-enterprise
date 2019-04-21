export const SET_CONFIG = 'app/config/set';

export interface AppState {
  config: AppConfig;
}

export interface AppConfig {
    name: string;
    version: string;
}

import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from 'firebase/remote-config';
import { isEmpty } from 'lodash';
import Helpers from '../../utilities/helpers';

export default class FirebaseService {
  private static readonly config = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
    databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
    measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
  };

  private static readonly app = initializeApp(FirebaseService.config);
  private static readonly remoteConfig = getRemoteConfig(FirebaseService.app);
  private static readonly analytics = getAnalytics(FirebaseService.app);

  constructor() {
    FirebaseService.remoteConfig.defaultConfig = {
      test_key: 'Firebase test',
    };
  }

  public async fetchAndActivateRemoteConfig(): Promise<void> {
    await fetchAndActivate(FirebaseService.remoteConfig);
  }

  public static getValue(key: string): string {
    const value = getValue(FirebaseService.remoteConfig, key).asString();
    return isEmpty(value) ? key : value;
  }

  public static logEvent(
    key: string,
    params?: { [key: string]: unknown }
  ): void {
    if (!Helpers.isEnvProd()) {
      console.log(`>> EVENT: ${key}`);
      return;
    }
    logEvent(FirebaseService.analytics, key, params);
  }

  // KEYS
  public static readonly test_key = 'test_key';

  // EVENTS
  public static readonly test_event = 'test_event';
}

import { Location } from 'react-router-dom';

export default class Helpers {
  static isEnvProd = (): boolean => {
    const env = `${process.env.REACT_APP_ENV}`;
    return env === 'production';
  };

  static wait = (ms = 500) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  static getQueryParam = (
    location: Location,
    query: string
  ): string | undefined => {
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    return searchParams.get(query) ?? undefined;
  };
}

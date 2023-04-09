import { ErrorDto, ParsedErrorDto } from '../models/dtos/error.dto';

export class Errors {
  public static readonly errorGenericTitle: string = 'Error!';
  public static readonly errorGenericText: string = 'Something went wrong.';

  private static readonly ErrorGeneric: ErrorDto = {
    status: 500,
    path: '',
    message: Errors.errorGenericText,
  };

  private static getParsedErrorDtoFromApiError = (
    error: unknown
  ): ParsedErrorDto => {
    return JSON.parse(JSON.stringify(error)) as ParsedErrorDto;
  };

  public static getErrorDtoFromApiError = (error: any): ErrorDto => {
    if (!error.response || !error.response.data) {
      return Errors.ErrorGeneric;
    }
    return error.response.data;
  };

  public static isAuthError(error: unknown) {
    const { status } = this.getParsedErrorDtoFromApiError(error);
    return status === 401 || status === 403;
  }
}

import { LoginDto } from '../../../models/dtos/login.dto';
import { LoginRequest } from '../../../models/requests/login.request';
import axios from '../../axios';

export default async function loginRequest(
  request: LoginRequest
): Promise<LoginDto> {
  const response = await axios.post<LoginDto>(
    `${process.env.REACT_APP_BASE_URL}/auth/login`,
    request
  );
  return response.data;
}

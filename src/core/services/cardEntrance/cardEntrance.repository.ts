import { CardEntranceDto } from '../../models/dtos/cardEntrance.dto';
import axios from '../axios';

export default async function cardEntranceRequest(): Promise<CardEntranceDto[]> {
  const response = await axios.get<CardEntranceDto[]>(
    `${process.env.REACT_APP_BASE_URL}/gecis`,
  );
  return response.data;
}



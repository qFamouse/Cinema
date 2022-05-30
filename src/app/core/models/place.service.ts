import {Hall} from "./hall.model";

export interface Place {
  id: number,
  hallId: number,
  hall: Hall
  floor: number,
  seat: number,
  row: number,
  isVip: false
}

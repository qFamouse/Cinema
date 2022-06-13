import {Seance} from "./seance.model";

export interface Hall {
  id: number,
  name: string,
  rows: number,
  seats: number,
  seances: Seance[]
}

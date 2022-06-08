import {Seance} from "./seance.model";

export interface Hall {
  id: number,
  name: string,
  floor_count: number,
  place_count: number,
  seances: Seance[]
}

import {Seance} from "./seance.model";
import {Place} from "./place.service";

export interface Ticket {
  id: number,
  seanceId: number,
  seance: Seance,
  placeId: number,
  place: Place,
  const: number,
  isOccupied: boolean
}

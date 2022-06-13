import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";
import {Place} from "../models/place.service";

const places : string = 'places';

@Injectable()
export class PlaceService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Place[]> {
    return this.apiService.get(`/${places}/`);
  }

  getById(slug: any): Observable<Place[]> {
    return this.apiService.get(`/${places}/${slug}`);
  }
}

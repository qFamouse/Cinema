import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Hall} from "../models/hall.model";

const halls : string = 'halls';

@Injectable()
export class HallService {

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Hall[]> {
    return this.apiService.get(`/${halls}/`)
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Sensor } from "./sensor.types";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private responseNull: Sensor = {key: '', name : '', status: ''}
    private _sensor : BehaviorSubject<Sensor> = new BehaviorSubject(this.responseNull);

    constructor(private _httpClient: HttpClient){}

    get sensor$(): Observable<Sensor>
    {
        return this._sensor.asObservable();
    }

    getEsp32(): Observable<Sensor>
    {
        return this._httpClient.get<Sensor>(`https://emi-cbba-esp32.onrender.com/api/esp32/sensors/64054d862abccac58bb80e69`)
            .pipe(
                tap((sensor) => {
                    this._sensor.next(sensor);
                })
            )
    }

    updateSensor(_update: Sensor): Observable<Sensor>
    {
        return this._httpClient.put<Sensor>(`https://emi-cbba-esp32.onrender.com/api/esp32/sensors/64054d862abccac58bb80e69`, _update)
            .pipe(
                tap((sensor) => {
                    this._sensor.next(_update);
                })
            )
    }
}
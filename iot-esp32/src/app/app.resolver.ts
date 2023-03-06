import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AppService } from "./app.service";
import { Sensor } from "./sensor.types";

@Injectable({
    providedIn: 'root'
})
export class AppResolver implements Resolve<any>
{
    constructor(private _appService: AppService,){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sensor> {
        return this._appService.getEsp32();
    }
}
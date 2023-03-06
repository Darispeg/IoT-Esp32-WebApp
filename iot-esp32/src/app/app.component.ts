import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppService } from './app.service';
import { Sensor } from './sensor.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'iot-esp32';
  color: ThemePalette = 'accent';
  sensor!: Sensor;
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
      private _appService: AppService,
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _changeDetectorRef: ChangeDetectorRef,
  ){}
  

  ngOnInit(): void {
    this._changeDetectorRef.markForCheck();
    this._appService.sensor$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((sensor) => {
        console.log(sensor);
        this.sensor = sensor
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  changeStatus(status: string){
    this.sensor.status = status;
    this._appService.updateSensor(this.sensor).pipe().subscribe();
    this._changeDetectorRef.markForCheck();
  }
}

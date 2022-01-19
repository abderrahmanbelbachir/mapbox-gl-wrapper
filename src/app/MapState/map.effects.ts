import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {map, mergeMap, catchError, switchMap} from 'rxjs/operators';
import {MapService} from "../Services/map.service";
import {cancelMoveMarker, initView, loadMap, resetMap, showAllPins} from "./map.actions";
import {MapRxService} from "../Services/map-rx.service";

@Injectable()
export class MapEffects {

  loadMap$ = createEffect(() => this.actions$.pipe(
    ofType(loadMap),
    switchMap(action => this.mapService.buildMap(action.zoom , action.center))
    )
  );

  initView$ = createEffect(() => this.actions$.pipe(
    ofType(initView),
    switchMap(action => this.mapService.initView())
    )
  );

  resetMap$ = createEffect(() => this.actions$.pipe(
    ofType(resetMap),
    switchMap(action => this.mapService.resetMap(action.zoom , action.center))
    )
  );

  showAllPins$ = createEffect(() => this.actions$.pipe(
    ofType(showAllPins),
    switchMap(action => this.mapService.showAllPins())
    )
  );

  cancelMoveMarker$ = createEffect(() => this.actions$.pipe(
    ofType(cancelMoveMarker),
    switchMap(action => this.mapService.cancelMarkerDrag())
    )
  );

  constructor(
    private actions$: Actions,
    private mapService: MapRxService
  ) {}
}

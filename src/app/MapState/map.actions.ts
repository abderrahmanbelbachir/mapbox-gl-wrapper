import {createAction, props} from '@ngrx/store';

export const loadMap = createAction(
  '[Map Component] Load Map',
  props<{ zoom: number , center: any }>()
);


export const initView = createAction(
  '[Map Component] Init View',
  props<{ zoom: number , center: any }>()
);

export const cancelMoveMarker = createAction('[Marker Component] Cancel Move');

export const showAllPins = createAction('[Map Component] Show Pins');


export const resetMap = createAction(
  '[Map Component] Reset Map',
  props<{ zoom: number , center: any }>()
);



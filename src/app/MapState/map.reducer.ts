import { createReducer, on } from '@ngrx/store';
import {cancelMoveMarker, initView, loadMap, resetMap, showAllPins} from "./map.actions";


export const initialState: any = {
  center: [6.172652, 45.899977],
  zoom: 13,
  lng: 0,
  lat: 0
};

const _mapReducer = createReducer(
  initialState,
  on(loadMap, (state , {zoom , center}) => ({ zoom , center })),
  on(initView, (state , {zoom , center}) => ({ zoom , center })),
  on(resetMap, (state , {zoom , center}) => ({ zoom , center })),
  on(showAllPins, (state) => state),
  on(cancelMoveMarker, (state) => state)
);

export function mapReducer(state: any, action: any) {
  return _mapReducer(state, action);
}

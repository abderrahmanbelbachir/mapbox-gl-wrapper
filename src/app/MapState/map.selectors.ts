import {createFeatureSelector} from "@ngrx/store";

export interface MapCoords {
  zoom: number;
  center: any;
};

export const getMapState = createFeatureSelector<MapCoords>("map");

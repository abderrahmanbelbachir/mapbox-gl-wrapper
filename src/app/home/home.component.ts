import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MapService} from "../Services/map.service";
import {pins} from "../DataFiles/pins";
import {Store} from "@ngrx/store";
import {MapCoords} from "../MapState/map.selectors";
import {cancelMoveMarker, initView, loadMap, resetMap, showAllPins} from "../MapState/map.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, AfterViewInit {

  public pins: any[] = [];
  public mapCenter: number[] = [];
  public zoom: number = 12;

  constructor(private map: MapService, private store: Store<MapCoords>) {
  }


  ngOnInit(): void {
    this.pins = pins;
    this.mapCenter = [6.172652, 45.899977];
  }


  ngAfterViewInit(): void {
    // this.markers = this.map.buildMap(this.zoom , this.mapCenter , this.pins);
    const zoom = this.zoom;
    const center = this.mapCenter;
    this.store.dispatch(loadMap({zoom , center}));
    console.log('loaded map : ');
  }

  public showAllPins() {
    this.store.dispatch(showAllPins());
  }

  public initView() {
    const zoom = this.zoom;
    const center = this.mapCenter;
    this.store.dispatch(initView({zoom , center}));
  }

  public cancelDragMarker() {
    this.store.dispatch(cancelMoveMarker());
  }

  public resetMap(){
    const zoom = this.zoom;
    const center = this.mapCenter;
    this.store.dispatch(resetMap({zoom , center}));
  }



}

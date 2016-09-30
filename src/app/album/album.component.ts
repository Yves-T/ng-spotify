import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../services/spotify.service";
import {Album} from "../models/Album";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit {

  id: string;
  album: Album[];
  private subscription: Subscription;

  constructor(private _spotifyService: SpotifyService, private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this._route.params
      .map(params => params['id'])
      .subscribe(id => {
        this._spotifyService.getAlbum(id)
          .subscribe(album => {
            this.album = album;
          });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

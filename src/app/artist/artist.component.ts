import {Component, OnInit, OnDestroy} from '@angular/core';
import {SpotifyService} from "../services/spotify.service";
import {Artist} from "../models/artist";
import {Album} from "../models/Album";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit,OnDestroy {

  id: string;
  artist: Artist[];
  albums: Album[];
  private subscription: Subscription;

  constructor(private _spotifyService: SpotifyService, private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this._route.params
      .map(params => params['id'])
      .subscribe(id => {
        this._spotifyService.getArtist(id)
          .subscribe(artist => {
            this.artist = artist;
          });

        this._spotifyService.getAlbums(id)
          .subscribe(albums => {
            this.albums = albums.items;
          });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

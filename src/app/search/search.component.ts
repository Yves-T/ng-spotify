import {Component, OnInit} from '@angular/core';
import * as _ from "underscore";
import {SpotifyService} from "../services/spotify.service";
import {Artist} from "../models/artist";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  search;
  searchResults: Artist[];

  constructor(private _spotifyService: SpotifyService) {
    this.search = _.debounce(music => {
      this._spotifyService.searchMusic(music)
        .subscribe(res => {
          this.searchResults = res.artists.items;
        })
    }, 200);
  }

  searchMusic(music) {
    this.search(music);
  }

}

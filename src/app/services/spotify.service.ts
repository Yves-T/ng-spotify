import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;

  private baseUrl = 'https://api.spotify.com/v1/';

  constructor(private _http: Http) {
  }

  searchMusic(str: string, type = 'artist') {
    this.searchUrl = `${this.baseUrl}search?query=${str}&offset=0&limit=20&type=${type}&market=BE`;
    return this._http.get(this.searchUrl)
      .map(res => res.json());
  }

  getArtist(id: string) {
    this.artistUrl = `${this.baseUrl}artists/${id}`;
    return this._http.get(this.artistUrl)
      .map(res => res.json());
  }

  getAlbums(artistId: string) {
    this.albumsUrl = `${this.baseUrl}artists/${artistId}/albums`;
    return this._http.get(this.albumsUrl)
      .map(res => res.json());
  }

  getAlbum(albumId: string) {
    this.albumUrl = `${this.baseUrl}albums/${albumId}`;
    return this._http.get(this.albumUrl)
      .map(res => res.json());
  }
}

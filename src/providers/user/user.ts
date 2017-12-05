import { Injectable } from '@angular/core';
import {Picture} from "../../pages/home/picture";
// import {UserPicture} from "../../pages/home/userPicture";
import {User} from "../../pages/home/user";

import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

import { Http } from '@angular/http';
import {Post} from '../../pages/page/post';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  user: User;
  constructor(private http: Http) {

  }

  getUsers(baseUrl): Observable<any> {
    return this.http.get( baseUrl)
      .map(this.parseResponseUsers)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error getPlaces'));
  }
  parseResponseUsers(response: Response) : User[]{
    if(!response.json() ) return [];

    return response.json().map(
      jsonUser => new User(
        jsonUser['id'],
        jsonUser['name'],
        jsonUser['email'],
        jsonUser.address['street'],
        jsonUser.company['name'],
        jsonUser.company['catchPhrase'],
        jsonUser.address['city']
      )
    )
  }

  getAllPictures(baseUrl):Observable<any>{
    return this.http.get( baseUrl)
      .map(this.parseResponseAllPictures)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error getPlaces'));
  }

  parseResponseAllPictures(response: Response) : User[]{
    if(!response.json() ) return [];

    return response.json().map(
      json => new Picture(
        json['albumId'],
        json['title'],
        json['url'],
        json['thumbnailUrl'],
      )
    )
  }

  //"https://jsonplaceholder.typicode.com/albums?userId="+user['id']
  getAlbumByUser(baseUrl,keyword):Observable<any>{
    return this.http
      .get(baseUrl+keyword)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error getpictures'));
  }


  getPosts(baseUrl,keyword: string): Observable<any>{
    if ( keyword == "undefined") return;

    return this.http
      .get(baseUrl+keyword)
      .map(this.parseResponsePost)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error getPosts'));
  }

  parseResponsePost(response: Response) : Post[]{
    if(!response.json() ) return [];

    return response.json().map(
      json => new Post(
        json['userId'],
        json['id'],
        json['title'],
        json['body']
      )
    )
  }


  getComments(baseUrl,keyword: string): Observable<any>{
    if ( keyword == "undefined") return;

    return this.http
      .get(baseUrl+keyword+"/comments")
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error getPosts'));
  }

}

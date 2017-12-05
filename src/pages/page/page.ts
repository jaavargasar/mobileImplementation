import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Post} from "./post";
import {UserProvider} from "../../providers/user/user";
import {User} from "../home/user";
import {Picture} from "../home/picture";
import {Album} from "../home/album";
import {AlbumPhoto} from "./albumPhoto";

@IonicPage()
@Component({
  selector: 'page-page',
  templateUrl: 'page.html',
})
export class Page {

  user: User ={
    id: "1",
    name: "",
    email: "",
    street: "",
    companyName: "",
    catchPhrase: "",
    city: ""
  };
  photo: string="";
  posts: Post[]=[];
  comments: Comment[] =[];
  checkPrint: boolean =false;
  pictures: Picture[]=[];
  albums : Album[]=[];
  users: User[]=[];
  albumPhoto: AlbumPhoto[]=[];
  checkingIfInside: boolean =false;



  constructor(public navCtrl: NavController, public navParams: NavParams,private service: UserProvider) {
    this.service;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page');

    this.photo = localStorage.getItem("userPicture");
    this.init();

  }


  init(){
    //console.log("doing init page");
    this.service.getUsers("https://jsonplaceholder.typicode.com/users").subscribe(
      response =>{
        for(let user of response){
          if(user.id == localStorage.getItem("userId") ) {
            this.user = user;
            break;
          }
        }


        console.log("going inside init");

        this.service.getAllPictures("https://jsonplaceholder.typicode.com/photos?albumid=[albumId]").subscribe(
          response =>{
            this.pictures = response;

            console.log("i've already have all photos response");

            this.service.getAlbumByUser("https://jsonplaceholder.typicode.com/albums?userId=",this.user['id']).subscribe(
              response => {
                this.albums =response;

                console.log("prepare to search photos")
                for( let album of this.albums){ //specific album user response

                  var ownPictures: Picture[]=[];

                  for(let picture of this.pictures){ //All pictures response
                    if( picture['albumId'] == album['id']  ){

                      console.log("coinciden los id de los albunes")
                      this.checkingIfInside=true;
                      var newPicture ={
                        albumId: picture['albumId'],
                        title: picture['tittle'],
                        url: picture['url'],
                        thumbnailUrl: picture['thumbnailUrl']
                      }
                      ownPictures.push(newPicture);
                    }
                  }

                  var newAlbumPhoto ={
                    userId: album['userId'],
                    id: album['id'],
                    title: album['title'],
                    photos: ownPictures
                  }

                  this.albumPhoto.push(newAlbumPhoto);

                }

                if( ! this.checkingIfInside )
                  console.log("no encontro macthing con las photos");



              },
              error => console.log(error)
            )


            this.checkPrint= true;
          },
          error => console.log(error)
        )








      }
      ,error => console.log(error)
    )
  }

}

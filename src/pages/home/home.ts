import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import {User} from "./user";
import {UserProvider} from '../../providers/user/user';
import '../rxjs-operators';
import {UserPicture} from "./userPicture";
import {Picture} from "./picture";
// import {Post} from "../page/post";
import {Album} from "./album";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  //global variables

  users: User[]=[];
  pictures: Picture[]=[];
  userPictures: UserPicture[]=[];

  albums : Album[]=[];
  albumId="";
  checkPrint: boolean =false;
  singleUser: User;
  findPicture: boolean =false;
  items=10;

  constructor(public navCtrl: NavController, public navParams: NavParams,private service: UserProvider) {
    this.service;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.init();
  }


  init(){
    //console.log("doint init home");
    this.service.getUsers("https://jsonplaceholder.typicode.com/users").subscribe(
      response =>{
        this.users=response;

        this.service.getAllPictures("https://jsonplaceholder.typicode.com/photos?albumid=[albumId]").subscribe(
          response =>{
            this.pictures = response;

            for(let user of this.users){
              this.service.getAlbumByUser("https://jsonplaceholder.typicode.com/albums?userId=",user['id']).subscribe(
                response => {
                  this.albums =response;
                  this.albumId= this.albums[0]['id'].toString();
                  //console.log(this.albumId);
                  for(let picture of this.pictures){
                    if(picture['albumId']==this.albumId){

                      var newUserPicture= {
                        id: user['id'],
                        name: user['name'],
                        street: user['street'],
                        url: picture['url'],
                        thumbnailUrl:picture['thumbnailUrl'],
                        city: user['city']
                      }
                      this.findPicture =true;
                      this.userPictures.push(newUserPicture);
                      break;
                    }
                  }
                },
                error => console.log(error)
              )
            }
            this.checkPrint= true;
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }

  goToUser(userID,userPicture){
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("userId", userID);
      localStorage.setItem("userPicture",userPicture);
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage!";
    }


    for(let user of this.users){
      if( user.id == userID) {
        this.service.user = user;
        this.singleUser = user;
        break;
      }
    };
    this.navCtrl.push('Page');
  }


  getFindPicture():boolean{
    return this.findPicture;
  }



}

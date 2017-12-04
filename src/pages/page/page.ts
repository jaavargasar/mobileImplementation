import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Post} from "./post";
import {UserProvider} from "../../providers/user/user";
import {User} from "../home/user";

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

        this.service.getPosts("https://jsonplaceholder.typicode.com/posts?userId=",this.user.id).subscribe(
          response =>{
            this.posts = response;

            for( let post of this.posts){
                this.service.getComments("https://jsonplaceholder.typicode.com/posts/",post.id).subscribe(
                  response =>{
                      this.comments = response;
                      post.setComment(this.comments);
                      post.setFalseVisibleComment();
                  },
                  error => console.log(error)
                )
            }
          },
          error=> console.log(error)
        )
      }
      ,error => console.log(error)
    )
  }

}

export class UserPicture{
  id:string
  name: string;
  street: string;
  url: string;
  thumbnailUrl: string;
  city: string;

  constructor( id:string,  name:string, street:string, url: string, thumbnailUrl: string, city:string){
    this.id = id;
    this.name= name;
    this.street = street;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
    this.city = city;
  }

}

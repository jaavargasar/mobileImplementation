import {Picture} from "../home/picture";

export class AlbumPhoto{
  userId: string;
  id: string;
  title: string;
  photos: Picture[];

  constructor(userId:string, id:string, title:string, photos: Picture[] ){
    this.userId =userId;
    this.id = id;
    this.title =title;
    this.photos = photos;
  }

}

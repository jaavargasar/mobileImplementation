export class Picture{
  albumId: string
  title: string;
  url: string;
  thumbnailUrl: string;

  constructor(albumId:string , title:string,  url: string, thumbnailUrl: string ){
    this.albumId = albumId;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
  }
}

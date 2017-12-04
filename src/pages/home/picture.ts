export class Picture{
  albumId: string
  url: string;
  thumbnailUrl: string;

  constructor(albumId:string , url: string, thumbnailUrl: string ){
    this.albumId = albumId;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
  }
}

export class Album{
  userId: string
  id: string;
  title: string;

  constructor(userId:string , id: string, title: string ){
    this.userId = userId;
    this.id = id;
    this.title = title;
  }
}

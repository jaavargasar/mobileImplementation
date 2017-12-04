export class Post{
  userId:string;
  id: string;
  title: string;
  body: string;
  comments: Comment[];
  checkVisibleComment: boolean;

  constructor(userId:string, id:string, title: string, body:string, comments?: Comment[],checkVisibleComment?:boolean ){
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
    if(comments) this.comments = comments;
    if( checkVisibleComment) this.checkVisibleComment= checkVisibleComment;
  }

  setComment(comments: Comment[]){
    this.comments= comments;
  }

  setFalseVisibleComment(){
    this.checkVisibleComment= false;
  }
}

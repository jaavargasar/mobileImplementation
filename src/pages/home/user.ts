export class User{
  id : string;
  name : string;
  email: string;
  street: string;
  companyName: string;
  catchPhrase: string;
  city: string;



  constructor(id : string,name : string,  email : string, street:string,
         companyName:string, catchPhrase : string, city:string ){
    this.id = id;
    this.name = name;
    this.email = email;
    this.street= street;
    this.companyName = companyName;
    this.catchPhrase = catchPhrase;
    this.city = city;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersianDatepikkerService {

  constructor() { }

  findByValue(myArray : any , value : string){
    let result =  myArray.findIndex( (x:any) => x == value);
    return result ;
  }

  
}

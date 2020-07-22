import { Component } from '@angular/core';
import { variable } from '@angular/compiler/src/output/output_ast';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dare2compete-ass1';

  ticketArrray :boolean[][];
  emptySeatInRow : number[];
  bookedTickets: any[];
  ticketsToReserve: number;
  
  ticketForm = new FormGroup({
    count: new FormControl(0,[Validators.required, Validators.max(7),Validators.min(1)]),
  })

  constructor(){
    this.ticketArrray = [];
    for(var i: number = 0; i < 11; i++) {
      this.ticketArrray[i] = [];
      for(var j: number = 0; j< 7; j++) {
          this.ticketArrray[i][j]  = false;
      }
    }
    this.ticketArrray[11] = [];
    for(var i: number = 0;i<3;i++){
      this.ticketArrray[11][i] = false;
    }
    this.emptySeatInRow = [];
    for(var i: number = 0;i<11;i++){
      this.emptySeatInRow[i] = 7; 
    }
    this.emptySeatInRow[11] = 3;
    console.log(this.emptySeatInRow)
    console.log(this.ticketArrray)
    // this.markTicketAsBook([[0,0],[0,1],[0,2]]);
  }

  markTicketAsBook(index: number[][]){
    index.forEach(ele =>{
      let i = ele[0];
      let j = ele[1];

      this.ticketArrray[i][j] = true;
    })
  }
  find_min(indices: any[][],arr: any[]){
    var diff=50;
    var min=100;
    var index=0;
    let current_empty_seats=0;
    var min_empty_seats=100;
    console.log(arr)
    for (var i=0; i<indices.length; i++ ){
      diff=indices[i][1]-indices[i][0];
      let a= indices[i][1];
      let b =indices[i][0];
      current_empty_seats=0;
      console.log(indices[i][1], +indices[i][0])
      while(a<b){
        current_empty_seats += arr[a];
        a++;
      }
      if(a==b)
        current_empty_seats +=arr[a];

      if(diff<min || current_empty_seats < min_empty_seats){

          min=diff; 
          index=i;
          min_empty_seats = current_empty_seats;
      }
      console.log(min_empty_seats);
    }
    console.log(index)
    return index;
  }


  bookTikcet(){
    // console.log(this.ticketForm.value)
    // console.log(this.ticketsToReserve);
    this.ticketsToReserve = this.ticketForm.value.count;
    let k= this.ticketsToReserve;
    let indices: any[][]=[];
    let arr=this.emptySeatInRow;
    for (var i=0; i<arr.length; i++){
      
      var j=i;
      var sum=0; 
      if(arr[i]==0)
      continue;
      while(k>sum && j<arr.length){
        sum+=arr[j];
        j++;
        // console.log(j)
        if(j==12){
          // console.log(sum)

        }
      }
      if(sum >=k){
        // console.log(">="+sum,+ k)
        indices.push([i,j-1]);
      }
      else{
        // console.log("<"+sum,+ k)

      }
    }
    // console.log(indices)

    var index= this.find_min(indices,arr);
    // console.log(index)
    var indexes:any[][] = [];
    i=indices[index][0];
    j=indices[index][1];

    sum = 0;
    // console.log(i, j);
    while(i<j){
      sum+=arr[i];
      if(i<11){
        for(var x=7-arr[i];x<7;x++){
          indexes.push([i,x])
        }
      }
      if(i==11){
        for(var x=3-arr[i];x<3;x++){
          indexes.push([i,x])
        }
      }
      arr[i]=0;
      i++;
    }
    if(i<11){
      for(var x=7-arr[j];x<7-arr[j]+ (k-sum);x++){
        indexes.push([i,x])
      }
    }
    if(i==11){
      for(var x=3-arr[j];x<3-arr[j]+ (k-sum);x++){
        indexes.push([i,x])
      }
    }
    
    arr[j]=arr[j]-(k-sum);

    this.emptySeatInRow = arr;
    // console.log(indexes);
    this.markTicketAsBook(indexes)
    this.bookedTickets = indexes;
  }

  
}

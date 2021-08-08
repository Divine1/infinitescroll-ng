import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'infinite-scroll';
  content:any = [];
  currentPage:number=1;
  totalPages:number=0;
  constructor(private http : HttpClient){
    
  }
  ngOnInit(){

    this.getdataFromAPI(this.currentPage)
  }

  getdataFromAPI(page : number){
    let limit:number=5;
    let url = `http://localhost:3000/countries?page=${page}&limit=${limit}`;
    this.http.get(url).subscribe((data:any)=>{
      console.log("data ",data)
      this.content.push(...data.content);
      this.totalPages = data.totalPages;
    },(err)=>{
      console.error(err);
    })
  }
  onScroll(event:any){
    let scrollHeight = event.target.scrollHeight;
    let scrollTop = event.target.scrollTop;
    let clientHeight = event.target.clientHeight;

    // console.log("scrollHeight ",scrollHeight);
    // console.log("scrollTop ",scrollTop);
    // console.log("clientHeight ",clientHeight);

    let scrollPosition = scrollHeight - (scrollTop + clientHeight);
    if(scrollPosition == 0 && this.totalPages > this.currentPage){
      this.currentPage++;
      this.getdataFromAPI(this.currentPage);
    }
  }
}

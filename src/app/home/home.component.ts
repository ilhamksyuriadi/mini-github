import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public value : String = '';
  public is_loading : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    if (this.value) {
      this.is_loading = true;
      console.log(this.value);
    } else {
      alert("The field can't be empty");
    }
  }

}

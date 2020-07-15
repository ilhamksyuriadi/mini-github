import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { api_url } from '../config/api-url';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

@Injectable()

export class ProfilePageComponent implements OnInit {

  public img_url : String = "https://picsum.photos/200/300";
  public username : String;
  public user_datas : any;
  public user_data_keys : any;
  public formatted_data : any;

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient ) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    this.getUser(this.username).subscribe( res => {
      if (res) {
        this.img_url = res['avatar_url'];
        this.user_datas = res;
        this.user_data_keys = Object.keys(this.user_datas);
        this.formatted_data = this.formatData(this.user_data_keys,this.user_datas);
      }
    })
  }

  back () {
    this.router.navigateByUrl('/')
  }

  getUser (username) {
    let url = api_url.user + username;
    return this.http.get(url)
  }

  formatData (keys, values) {
    let formatted_data = []
    keys.map( res => {
        let new_data = {
          key: res,
          value: values[res]
        };
        formatted_data.push(new_data);
    })

    return formatted_data
  }

}

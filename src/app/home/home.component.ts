import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from '../config/api-url';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddUser } from '../state/user/user.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@Injectable()

export class HomeComponent implements OnInit {
  public username : String = '';
  public is_loading : boolean = false;

  constructor ( private http: HttpClient, private router: Router, private store: Store ) { }

  ngOnInit () : void {
  }

  submit () {
    if (this.username) {
      this.is_loading = true;
      this.getUser(this.username).subscribe( res => {
        if (res) {
          console.log(res);
          this.addUser(this.username, res)
          this.is_loading = false;
          this.router.navigateByUrl('/profile-page/' + this.username)
        }
      },
      err => {
        console.log(err);
        this.is_loading = false;
        this.router.navigateByUrl('/error-page')
      })
    } else {
        alert("The username field can't be empty");
    }
  }

  getUser(username) {
    let url = api_url.user;
    url = url.replace('[user]', username);
    return this.http.get(url);
  }

  addUser(username,data) {
    this.store.dispatch(new AddUser({username: username, data: data}))
  }

}

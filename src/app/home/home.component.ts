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
  public value : String = '';
  public is_loading : boolean = false;

  constructor ( private http: HttpClient, private router: Router, private store: Store ) { }

  ngOnInit () : void {
    this.addUser('saprul')
  }

  submit () {
    if (this.value) {
      this.is_loading = true;
      this.getUser(this.value).subscribe( res => {
        if (res) {
          console.log(res);
          this.is_loading = false;
          this.router.navigateByUrl('/profile-page/' + this.value)
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

  addUser(name) {
    this.store.dispatch(new AddUser({name: name}))
  }

}

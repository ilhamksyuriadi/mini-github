import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { api_url } from '../config/api-url';
import { HttpClient } from '@angular/common/http';
import { Store, Select } from '@ngxs/store';
import { User } from '../state/user/user.model'
import { UserState } from '../state/user/user.state' // will use this shortl
import { RemoveUser } from '../state/user/user.action'
import { Observable } from 'rxjs';

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
  public is_loading : boolean = true;

  public users$: Observable<User>

  constructor( 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private store: Store 
    ) { 
      this.users$ = this.store.select(state => state.users.users)
    }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    this.getUser(this.username).subscribe( res => {
      if (res) {
        this.img_url = res['avatar_url'];
        this.user_datas = res;
        this.user_data_keys = Object.keys(this.user_datas);
        this.formatted_data = this.formatData(this.user_data_keys,this.user_datas);
        setTimeout(() => this.setLoading(false),800)
      }
    })
    // this.users$.subscribe(res=>{
    //   if (res) {
    //     this.img_url = res[0].data.avatar_url;
    //     this.user_datas =  res[0].data;
    //     this.user_data_keys = Object.keys(this.user_datas);
    //     this.formatted_data = this.formatData(this.user_data_keys,this.user_datas);
    //     setTimeout(() => this.setLoading(false),800)
    //   }
    //   console.log(res[0].data)
    // })
  }

  back () {
    this.removeUser(this.username)
    this.router.navigateByUrl('/')
  }

  toRepoPage () {
    this.router.navigateByUrl('/repositories-page/' + this.username);
  }

  getUser (username) {
    let url = api_url.user;
    url = url.replace('[user]', username);
    return this.http.get(url);
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

  setLoading(state){
    this.is_loading = state;
  }

  removeUser(username){
    this.store.dispatch(new RemoveUser(username))
  }

}

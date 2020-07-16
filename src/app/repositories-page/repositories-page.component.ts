import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { api_url } from '../config/api-url';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-repositories-page',
  templateUrl: './repositories-page.component.html',
  styleUrls: ['./repositories-page.component.scss']
})
export class RepositoriesPageComponent implements OnInit {

  public username : String = '';
  public is_loading : boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    this.getRepos(this.username).subscribe( res => {
      console.log(res)
      setTimeout(() => this.setLoading(false),800)
    })
  }

  toProfilePage() {
    this.router.navigateByUrl('/profile-page/' + this.username);
  }

  getRepos(username) {
    let url = api_url.repos;
    url = url.replace('[user]', username)
    return this.http.get(url);
  }

  setLoading(state){
    this.is_loading = state;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { api_url } from '../config/api-url'

@Component({
  selector: 'app-repositories-page',
  templateUrl: './repositories-page.component.html',
  styleUrls: ['./repositories-page.component.scss']
})
export class RepositoriesPageComponent implements OnInit {

  public username : String = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    this.getRepos(this.username)
  }

  toProfilePage() {
    this.router.navigateByUrl('/profile-page/' + this.username);
  }

  getRepos(username) {
    let url = api_url.repos;
    url = url.replace('[user]', username)
    console.log(url)
  }

}

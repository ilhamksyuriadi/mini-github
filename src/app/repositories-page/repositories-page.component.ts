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

  public username: String = '';
  public is_loading: boolean = true;
  public repos: any;
  public current_repos: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    this.getRepos(this.username).subscribe( res => {
      if (res) {
        console.log(res)
        this.repos = res
        setTimeout(() => this.setLoading(false),800)
      }
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

  setLoading(state) {
    this.is_loading = state;
  }

  getDownLoadUrl(url) {
    url = url.replace('{archive_format}', 'zipball')
    url = url.replace('{/ref}', '/master')
    console.log('ini url', url)
    return this.http.get(url,{responseType: 'blob'})
  }

  download(url){
    this.getDownLoadUrl(url).subscribe( res => {
      console.log('ini ress download', URL.createObjectURL(res))
      window.open(URL.createObjectURL(res), "_blank");
    })
  }

  clone(url) {
    const copy_url = document.createElement('textarea');
    copy_url.style.position = 'fixed';
    copy_url.style.left = '0';
    copy_url.style.top = '0';
    copy_url.style.opacity = '0';
    copy_url.value = url;
    document.body.appendChild(copy_url);
    copy_url.focus();
    copy_url.select();
    document.execCommand('copy');
    document.body.removeChild(copy_url);
    alert('Clone url copied: ' + url)
  }

  getRepoData(event) {
    console.log(event)
  }

}

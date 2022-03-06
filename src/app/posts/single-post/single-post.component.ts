import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../models/posts.model";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {getPostById} from "../state/posts.selector";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  post: Observable<Post> | undefined;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.post = this.store.select(getPostById);
  }

}

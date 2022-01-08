import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Post} from "../../models/posts.model";
import {Observable} from "rxjs";
import {getPosts} from "../state/posts.selector";
import {deletePost} from "../state/posts.action";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]> | undefined;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

  onDelete(postId: any) {
    this.store.dispatch(deletePost({id: postId}));
  }

}

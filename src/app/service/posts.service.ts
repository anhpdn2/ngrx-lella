import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable, of} from "rxjs";
import {Post} from "../models/posts.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`https://vue-completecourse.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://vue-completecourse.firebaseio.com/posts.json`,
      post
    );
  }

  updatePost(post: Post) {
    /*if (!post.id) {
      return of(null);
    }*/
    const postData = {
      [post.id ? post.id : this.randomId()]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      `https://vue-completecourse.firebaseio.com/posts.json`,
      postData
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://vue-completecourse.firebaseio.com/posts/${id}.json`
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(
      `https://vue-completecourse.firebaseio.com/posts/${id}.json`
    );
  }

  randomId() {
    return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }
}

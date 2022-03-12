import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../../service/posts.service";
import {
  addPost,
  addPostSuccess,
  deletePost, deletePostSuccess, dummyAction,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess
} from "./posts.action";
import {exhaustMap, filter, map, mergeMap, of, switchMap, withLatestFrom} from "rxjs";
import { Update } from '@ngrx/entity';
import { Post } from './../../models/posts.model';
import {ROUTER_NAVIGATION, RouterNavigationAction} from "@ngrx/router-store";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {getPosts} from "./posts.selector";

@Injectable()
export class PostsEffects {

  constructor(private actions$: Actions, private postsService: PostsService, private store: Store<AppState>) {
  }

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(
        ([action, posts]) => {
          if (!posts.length) {
            return this.postsService.getPosts().pipe(
              map(posts => {
                return loadPostsSuccess({posts})
              })
            );
          } else {
            return of(dummyAction())
          }
        }
      )
    )
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            console.log(data);
            const post = {...action.post, id: data.name};
            return addPostSuccess({post});
          })
        )
      })
    )
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            const updatePost: Update<Post> = {
              id: action.post.id ? action.post.id : 'd1',
              changes: {
                ...action.post
              }
            }
            return updatePostSuccess({post: updatePost});
          })
        )
      })
    )
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      exhaustMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({id: action.id});
          })
        )
      })
    )
  });

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: any) => {
        if (r.payload.routerState && r.payload.routerState.params && r.payload.routerState['params']['id']) {
          return r.payload.routerState['params']['id'];
        }
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]) => {
        if (id && !posts.length) {
          return this.postsService.getPostById(id).pipe(
            map((post) => {
              const postData = [{ ...post, id}];
              return loadPostsSuccess({posts: postData});
            })
          )
        } else {
          return of(dummyAction());
        }

      })
    )

  });
}

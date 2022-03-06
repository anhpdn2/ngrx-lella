import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../../service/posts.service";
import {
  addPost,
  addPostSuccess,
  deletePost, deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess
} from "./posts.action";
import {exhaustMap, filter, map, mergeMap, of, switchMap} from "rxjs";
import {ROUTER_NAVIGATION, RouterNavigationAction} from "@ngrx/router-store";

@Injectable()
export class PostsEffects {

  constructor(private actions$: Actions, private postsService: PostsService) {
  }

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(
        (action) => {
          return this.postsService.getPosts().pipe(
            map(posts => {
              return loadPostsSuccess({posts})
            })
          );
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
            return updatePostSuccess({post: action.post});
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
      switchMap((id) => {
        if (id) {
          return this.postsService.getPostById(id).pipe(
            map((post) => {
              const postData = [{ ...post, id}];
              return loadPostsSuccess({posts: postData});
            })
          )
        } else {
          return of(loadPostsSuccess({posts: []}));
        }

      })
    )

  });
}

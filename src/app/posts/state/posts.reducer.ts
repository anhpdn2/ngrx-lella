import {createReducer, on} from "@ngrx/store";
import {initialState, postsAdapter} from "src/app/posts/state/posts.state";
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess
} from "./posts.action";

const _postReducer = createReducer(initialState,
  on(addPostSuccess, (state: any, action: any) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(updatePostSuccess, (state: any, action: any) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state: any, action: any) => {
    return postsAdapter.removeOne(action.id, state);
  }),
  on(loadPostsSuccess, (state: any, action: any) => {
    return postsAdapter.setAll(action.posts, state);
  }),
);

export function postsReducer(state: any, action: any) {
  return _postReducer(state, action);
}

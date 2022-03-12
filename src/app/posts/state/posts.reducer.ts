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
    return postsAdapter.addOne(action.post, {
      ...state,
      count: state.count + 1
    });
  }),
  on(updatePostSuccess, (state: any, action: any) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state: any, action: any) => {
    return postsAdapter.removeOne(action.id, {
      ...state,
      count: state.count - 1
    });
  }),
  on(loadPostsSuccess, (state: any, action: any) => {
    return postsAdapter.setAll(action.posts, {
      ...state,
      count: action.posts.length
    });
  }),
);

export function postsReducer(state: any, action: any) {
  return _postReducer(state, action);
}

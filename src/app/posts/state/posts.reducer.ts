import {createReducer, on} from "@ngrx/store";
import { initialState } from "src/app/posts/state/posts.state";
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
    let post = {...action.post};
    return {
    ...state,
      posts: [...state.posts, post]
    }
  }),
  on(updatePostSuccess, (state: any, action: any) => {
    const updatePosts = state.posts.map((p: any) => (p.id == action.post.id) ? action.post : p);
    return {
    ...state,
      posts: updatePosts
    }
  }),
  on(deletePostSuccess, (state: any, action: any) => {
    const deletePosts = state.posts.filter((p: any) => p.id != action.id);
    return {
    ...state,
      posts: deletePosts
    }
  }),
  on(loadPostsSuccess, (state: any, action: any) => {
    return {
      ...state,
      posts: action.posts
    }
  }),
);

export function postsReducer(state: any, action: any) {
  return _postReducer(state, action);
}

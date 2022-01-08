import {createReducer, on} from "@ngrx/store";
import { initialState } from "src/app/posts/state/posts.state";
import {addPost, deletePost, updatePost} from "./posts.action";

const _postReducer = createReducer(initialState,
  on(addPost, (state: any, action: any) => {
    let post = {...action.post};
    post.id = (state.posts.length) + 1;
    return {
    ...state,
      posts: [...state.posts, post]
    }
  }),
  on(updatePost, (state: any, action: any) => {
    const updatePosts = state.posts.map((p: any) => (p.id == action.post.id) ? action.post : p);
    return {
    ...state,
      posts: updatePosts
    }
  }),
  on(deletePost, (state: any, action: any) => {
    const deletePosts = state.posts.filter((p: any) => p.id != action.id);
    return {
    ...state,
      posts: deletePosts
    }
  })
);

export function postsReducer(state: any, action: any) {
  return _postReducer(state, action);
}

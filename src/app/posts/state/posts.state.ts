import {Post} from "../../models/posts.model";

export const initialState = {
  posts: null
}

export interface PostsState {
  posts: Post[];
}

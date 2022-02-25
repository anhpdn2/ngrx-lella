import {Post} from "../../models/posts.model";

export const initialState = {
  posts: []
}

export interface PostsState {
  posts: Post[];
}

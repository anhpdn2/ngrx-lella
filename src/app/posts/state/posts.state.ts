import {Post} from "../../models/posts.model";

export const initialState = {
  posts: [
    {id : '1' , title: 'Sample Title 1', description: 'Sample Description 1'},
    {id : '2' , title: 'Sample Title 2', description: 'Sample Description 2'}
  ]
}

export interface PostsState {
  posts: Post[];
}

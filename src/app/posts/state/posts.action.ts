import {createAction, props} from "@ngrx/store";
import {Post} from "src/app/models/posts.model";
import {Update} from "@ngrx/entity";

export const ADD_POST_ACTION = '[posts page] add post';

export const ADD_POST_SUCCESS = '[posts page] add post success';

export const UPDATE_POST_ACTION = '[posts page] edit post';

export const UPDATE_POST_SUCCESS = '[posts page] edit post success';

export const UPDATE_POST_FAIL = '[posts page] edit post fail';

export const DELETE_POST_ACTION = '[posts page] delete post';

export const DELETE_POST_SUCCESS = '[posts page] delete post success';

export const LOAD_POSTS = '[posts page] load posts';

export const LOAD_POSTS_SUCCESS = '[posts page] load posts success';

export const DUMMY_ACTION = '[posts page] dummy action';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: Post }>());

export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>());

export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ post: Update<Post> }>()
);

export const updatePostFail = createAction(UPDATE_POST_FAIL, props<{ post: Post }>());

export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());

export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());

export const loadPosts = createAction(LOAD_POSTS);

export const dummyAction = createAction(DUMMY_ACTION);

export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts: Post[] }>());

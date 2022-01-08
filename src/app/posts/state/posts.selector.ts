import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostsState} from "./posts.state";

export const POST_STATE_NAME = 'posts';

const getPostsSate = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsSate, (state) => {
  return state.posts;
});

export const getPostById = createSelector(getPostsSate, (state: any, props: any) => {
  return state.posts.find((post: any) => post.id === props.id);
});

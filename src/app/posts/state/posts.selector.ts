import {createFeatureSelector, createSelector} from "@ngrx/store";
import {postsAdapter, PostsState} from "./posts.state";
import {getCurrentRoute} from "../../store/router/router.selector";
import {RouterStateUrl} from "../../store/router/custom-serializer";

export const POST_STATE_NAME = 'posts';

const getPostsSate = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const postsSelector = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsSate, postsSelector.selectAll);

export const getPostsEntities = createSelector(getPostsSate, postsSelector.selectEntities);

export const getPostById = createSelector(getPostsEntities, getCurrentRoute, (posts: any, route: RouterStateUrl) => {
  return posts ? posts[route.params['id']] : null;
});

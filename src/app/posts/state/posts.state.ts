import {Post} from "../../models/posts.model";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export interface PostsState extends EntityState<Post> {
  count: number;
}

export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: sortByTitle
});

export const initialState: PostsState = postsAdapter.getInitialState({
  count: 0
});

export function sortByTitle(a: Post, b: Post) {
  if (!a.title || !b.title) {
    return 1;
  }
  const compare = a.title.localeCompare(b.title);
  if (compare > 0) {
    return -1;
  }
  if (compare < 0) {
    return 1;
  }
  return compare;
}

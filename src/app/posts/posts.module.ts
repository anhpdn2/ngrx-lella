import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {PostsListComponent} from "./posts-list/posts-list.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {EditPostComponent} from "./edit-post/edit-post.component";
import {StoreModule} from "@ngrx/store";
import {POST_STATE_NAME} from "./state/posts.selector";
import {postsReducer} from "./state/posts.reducer";
import {EffectsModule} from "@ngrx/effects";
import {PostsEffects} from "./state/posts.effects";
import { SinglePostComponent } from './single-post/single-post.component';

const route: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      {path: 'add', component: AddPostComponent},
      {path: 'edit/:id', component: EditPostComponent}
    ]
  }
];

@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent,
    SinglePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    ReactiveFormsModule,
    RouterModule.forChild(route),
    EffectsModule.forFeature([PostsEffects])
  ]
})
export class PostsModule {
}

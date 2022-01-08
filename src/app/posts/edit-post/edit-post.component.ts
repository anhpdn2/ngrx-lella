import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import { getPostById } from '../state/posts.selector';
import { Post } from 'src/app/models/posts.model';
import { FormGroup, Validators} from '@angular/forms';
import {FormControl} from "@angular/forms";
import {updatePost} from "../state/posts.action";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  postForm = new FormGroup({});
  postSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      const id = params.get('id');
      this.postSubscription = this.store.select(getPostById, {id}).subscribe(data => {
        this.post = data;
        this.createForm();
      });
    });
  }

  createForm(): void {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post?.description, [Validators.required, Validators.minLength(6)])
    })
  }

  showDescriptionError(textRequired: string, formControl: string): string {
    if (!this.postForm.get(formControl)?.touched && !this.postForm.get(formControl)?.valid) {
      if (this.postForm.get(formControl)?.errors?.['required']) {
        return textRequired + " is required";
      }
      if (this.postForm.get(formControl)?.errors?.['minlength']) {
        return textRequired + " should be minimum 6 character";
      }
    }
    return "";
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;
    const post = {id: this.post?.id, title, description};
    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts']);
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}

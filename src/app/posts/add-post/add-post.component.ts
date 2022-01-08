import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AppState } from 'src/app/store/app.state';
import {Post} from "../../models/posts.model";
import {Store} from "@ngrx/store";
import { addPost } from '../state/posts.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm = new FormGroup({});

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(
        null, [
          Validators.required,
          Validators.minLength(6)
        ]
      ),
      description: new FormControl(
        null, [
          Validators.required,
          Validators.minLength(10)
        ]
      )
    });
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    }
    this.store.dispatch(addPost({post}));
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

}

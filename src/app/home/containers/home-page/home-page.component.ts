import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromStore from "../../reducers";
import { Observable } from "rxjs";
import {
  DownloadFile,
  DownloadMultipleFiles
} from "../../actions/home.actions";

@Component({
  selector: "app-home-page",
  template: `
    <app-home
      [status]="status$ | async"
      [progress]="progress$ | async"
      (download)="download($event)"
      (downloadMultiple)="downloadMultiple($event)"
    ></app-home>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  status$: Observable<string>;
  progress$: Observable<number>;

  constructor(private store: Store<fromStore.State>) {
    this.status$ = this.store.pipe(select(fromStore.selectStatus));
    this.progress$ = this.store.pipe(select(fromStore.selectProgress));
  }

  ngOnInit() {}

  download({ id, url, filename }) {
    this.store.dispatch(new DownloadFile({ id, url, filename }));
  }

  downloadMultiple(files) {
    this.store.dispatch(new DownloadMultipleFiles(files));
  }
}

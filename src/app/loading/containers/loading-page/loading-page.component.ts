import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromStore from "../../reducers";
import { Observable } from "rxjs";
import { Loading } from "../../models/loading.model";

@Component({
  selector: "app-loading-page",
  template: `
    <app-loading [loadings]="loadings$ | async"></app-loading>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingPageComponent implements OnInit {
  loadings$: Observable<Loading[]>;

  constructor(private store: Store<fromStore.State>) {
    this.loadings$ = this.store.pipe(select(fromStore.selectLoadingsArray));
  }

  ngOnInit() {}
}

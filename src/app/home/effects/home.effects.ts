import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  HomeActionTypes,
  DownloadFile,
  DownloadFileSuccess,
  DownloadFileFail,
  DownloadMultipleFiles,
  DownloadMultipleFilesSuccess,
  DownloadMultipleFilesFail
} from "../actions/home.actions";
import {
  switchMap,
  catchError,
  map,
  mergeMap,
  concatMap,
  delay,
  merge,
  concatAll,
  concat,
  mergeAll,
  first,
  finalize,
  tap
} from "rxjs/operators";
import {
  of,
  concat as concatStatic,
  from,
  forkJoin,
  throwError,
  zip,
  timer
} from "rxjs";
import { HomeService } from "../service/home.service";
import {
  UpsertLoading,
  DeleteLoading
} from "../../loading/actions/loading.actions";

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private _homeService: HomeService) {}

  @Effect()
  downloadFile$ = this.actions$.pipe(
    ofType(HomeActionTypes.DownloadFile),
    map((action: DownloadFile) => action.payload),
    mergeMap(({ id, url, filename }) =>
      this._homeService.downloadFileObsRequest({ url, filename }).pipe(
        concatMap(loading => {
          let obs;
          if (loading.progress == 100) {
            obs = concatStatic(
              of(
                new DownloadFileSuccess({
                  download: {
                    id,
                    url,
                    filename
                  },
                  message: loading.message
                })
              ),
              of(new UpsertLoading(loading)),
              of(new DeleteLoading(loading.id)).pipe(delay(500))
            );
          } else {
            obs = of(new UpsertLoading(loading));
          }
          return obs;
        }),
        catchError(error => of(new DownloadFileFail(error)))
      )
    )
  );

  @Effect()
  downloadMultipleFiles$ = this.actions$.pipe(
    ofType(HomeActionTypes.DownloadMultipleFiles),
    map((action: DownloadMultipleFiles) => action.payload),
    switchMap(files =>
      zip(
        from(
          files.map(f =>
            of(new DownloadFile(f)).pipe(
              tap(() => console.log("DOWNLOAD FILE")),
              merge(
                this.actions$.pipe(
                  ofType(
                    HomeActionTypes.DownloadFileSuccess,
                    HomeActionTypes.DownloadFileFail
                  ),
                  first((a: any) => a.payload.id == f.id),
                  tap(a => console.log("DOWNLOAD FILE SUCCESS", a)),
                  switchMap(action => {
                    if (action === HomeActionTypes.DownloadFileFail) {
                      return throwError("Because one DownloadFileFail");
                    }

                    return of();
                  })
                )
              )
            )
          )
        ),
        timer(0, 10)
      ).pipe(
        map(([delayedDll, _timer]) => delayedDll),
        mergeAll(),
        concat(
          of(new DownloadMultipleFilesSuccess("a")).pipe(
            tap(() => console.log("DOWNLOAD MULTIPLE FILES SUCCESS"))
          )
        ),

        catchError(error => of(new DownloadMultipleFilesFail(error)))
      )
    )
  );
}

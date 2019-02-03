import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { ElectronService } from "../../providers/electron.service";
import { Loading } from "../../loading/models/loading.model";
import { UtilsService } from "../../providers/utils.service";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(
    private _electronService: ElectronService,
    private _utilsService: UtilsService,
    private _ngZone: NgZone
  ) {}

  generateRandomId(): string {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }

  downloadFileObsRequest({ url, filename }): Observable<Loading> {
    var received_bytes = 0;
    var total_bytes = 0;
    const id = this._utilsService.generateRandomId();
    const date = Date.now();

    return Observable.create(observer => {
      var out = this._electronService.fs.createWriteStream(filename);

      this._electronService.request
        .get(url)
        .on("error", function(err) {
          console.log(err);
          observer.error(err);
        })
        .on("response", function(data) {
          total_bytes = parseInt(data.headers["content-length"]);
        })
        .on("data", chunk => {
          received_bytes += chunk.length;
          const status = this.showDownloadingProgress(
            received_bytes,
            total_bytes
          );
          if (status.progress < 100) {
            this._ngZone.run(() => {
              observer.next({ ...status, id, date });
            });
          }
        })
        .pipe(out)
        .on("finish", () => {
          this._ngZone.run(() => {
            observer.next({
              id,
              date,
              progress: 100,
              message: "Pipe finish finished!"
            });
            observer.complete();
          });
        });
    });
  }

  showDownloadingProgress(received, total) {
    const progress = (received * 100) / total || 0;
    const message = `${progress.toFixed(
      2
    )} % | ${received} bytes downloaded out of ${total} bytes.`;
    return {
      progress,
      message
    };
  }

  downloadFileObsNeedle(): Observable<string> {
    return Observable.create(observer => {
      var out = this._electronService.fs.createWriteStream("10Mb.dat");

      this._electronService.needle
        .get("http://www.ovh.net/files/10Mb.dat")
        .pipe(out)
        .on("finish", () => {
          this._ngZone.run(() => {
            console.log(`Pipe finish finished! ${Date.now()}`);
            observer.next("Pipe finish finished");
            observer.complete();
          });
        });
    });
  }
}

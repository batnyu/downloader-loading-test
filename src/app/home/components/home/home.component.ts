import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UtilsService } from "../../../providers/utils.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @Input() status;
  @Input() progress: number;
  @Output() download = new EventEmitter();
  @Output() downloadMultiple = new EventEmitter();

  constructor(private _utilsService: UtilsService) {}

  ngOnInit() {}

  downloadFileBig() {
    this.download.emit({
      id: 69,
      url: "http://www.ovh.net/files/100Mb.dat",
      filename: "100Mb.dat"
    });
  }

  downloadFileSmall() {
    this.download.emit({
      id: 452,
      url: "http://www.ovh.net/files/10Mb.dat",
      filename: "10Mb.dat"
    });
  }

  downloadMultipleFiles() {
    this.downloadMultiple.emit(
      Array.from(Array(2).keys()).map(x => ({
        id: this._utilsService.generateRandomId(),
        url: "http://www.ovh.net/files/100Mb.dat",
        filename: "100Mb.dat"
      }))
    );
    // this.downloadMultiple.emit([
    //   {
    //     id: 1,
    //     url: "http://www.ovh.net/files/10Mb.dat",
    //     filename: "10Mb.dat"
    //   },
    //   {
    //     id: 2,
    //     url: "http://www.ovh.net/files/10Mb.dat",
    //     filename: "10Mb.dat"
    //   },
    //   {
    //     id: 3,
    //     url: "http://www.ovh.net/files/10Mb.dat",
    //     filename: "10Mb.dat"
    //   }
    // ]);
  }
}

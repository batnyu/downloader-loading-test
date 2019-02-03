import { Component, OnInit, Input } from "@angular/core";
import { Loading } from "../../models/loading.model";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnInit {
  @Input() loadings: Loading[];

  constructor() {}

  ngOnInit() {}

  getAverageProgress(): number {
    const sum = this.loadings.reduce((acc, curr) => acc + curr.progress, 0);
    const avg = sum / this.loadings.length;
    // console.log("SUM", sum, "length", this.loadings.length, "AVG", avg);
    console.log("SUM", sum);
    return avg;
  }

  getMinProgress(): number {
    return this.loadings.length > 0
      ? Math.min(...this.loadings.map(l => l.progress))
      : 0;
  }
}

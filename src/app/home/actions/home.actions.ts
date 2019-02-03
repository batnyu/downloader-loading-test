import { Action } from "@ngrx/store";
import { Download } from "../models/home.models";

export enum HomeActionTypes {
  DownloadFile = "[Home] Download file",
  DownloadFileSuccess = "[Home] Download file Success",
  DownloadFileFail = "[Home] Download file Fail",
  DownloadMultipleFiles = "[Home] Download Multiple Files",
  DownloadMultipleFilesSuccess = "[Home] Download Multiple Files Success",
  DownloadMultipleFilesFail = "[Home] Download Multiple Files Fail"
}

export class DownloadFile implements Action {
  readonly type = HomeActionTypes.DownloadFile;

  constructor(public payload: Download) {}
}

export class DownloadFileSuccess implements Action {
  readonly type = HomeActionTypes.DownloadFileSuccess;

  constructor(
    public payload: {
      download: Download;
      message: string;
    }
  ) {}
}

export class DownloadFileFail implements Action {
  readonly type = HomeActionTypes.DownloadFileFail;

  constructor(
    public payload: {
      download: Download;
      error: any;
    }
  ) {}
}

export class DownloadMultipleFiles implements Action {
  readonly type = HomeActionTypes.DownloadMultipleFiles;

  constructor(public payload: Download[]) {}
}

export class DownloadMultipleFilesSuccess implements Action {
  readonly type = HomeActionTypes.DownloadMultipleFilesSuccess;

  constructor(public payload: string) {}
}

export class DownloadMultipleFilesFail implements Action {
  readonly type = HomeActionTypes.DownloadMultipleFilesFail;

  constructor(public payload: any) {}
}

export type HomeActions =
  | DownloadFile
  | DownloadFileSuccess
  | DownloadFileFail
  | DownloadMultipleFiles
  | DownloadMultipleFilesSuccess
  | DownloadMultipleFilesFail;

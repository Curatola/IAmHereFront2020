import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavParamsService {
  private params: {[key: string]: any};
  constructor() { }

  public setParams(params: {[key: string]: any}): void {
    this.params = params;
  }

  public get(key: string): any {
    return this.params[key];
  }
}

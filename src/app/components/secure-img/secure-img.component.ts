import { Component, OnChanges, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-secure-img',
  templateUrl: './secure-img.component.html',
  styleUrls: ['./secure-img.component.scss'],
})
export class SecureImgComponent implements OnChanges  {
  // This code block just creates an rxjs stream from the src
  // this makes sure that we can handle source changes
  // or even when the component gets destroyed
  // So basically turn src into src$
  @Input() private src: string;
  @Input() spinnerColor: string;
  private src$ = new BehaviorSubject(this.src);
  loaded = false;

  ngOnChanges(): void {
    this.src$.next(this.src);
  }

  // this stream will contain the actual url that our img tag will load
  // everytime the src changes, the previous call would be canceled and the
  // new resource would be loaded
  dataUrl$ = this.src$.pipe(switchMap (url => this.loadImage(url)))

  // we need HttpClient to load the image
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  private loadImage(url: string): Observable<SafeUrl> {
    return this.http
        .get(url, { responseType: 'blob', withCredentials: true })
        .pipe(map(blob => {
          this.loaded = true;
          return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        }));
  }
}

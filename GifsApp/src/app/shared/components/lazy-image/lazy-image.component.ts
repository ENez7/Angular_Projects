import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  private hasBeenLoaded: boolean = false;
  ngOnInit(): void {
      if (!this.url) throw new Error('URL property is required');
  }

  onLoad() {
    setTimeout(() => {
      this.hasBeenLoaded = true;
    }, 1000);  // setTimeout is only for demonstration and can be removed
  }

  getState() {
    return this.hasBeenLoaded;
  }
}

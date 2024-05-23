import { Component, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-svg-map',
  standalone: true,
  imports: [],
  templateUrl: './svg-map.component.html',
  styleUrl: './svg-map.component.css'
})
export class SvgMapComponent implements AfterViewInit {
  @ViewChild('svgObject', { static: true }) svgObject!: ElementRef;
  @Output() countrySelected = new EventEmitter<string>();
  defaultFillColor = '#ececec';
  defaultStroke = "black";
  defaultLineCap = "round";
  defaultStrokeWidth = ".2";

  ngAfterViewInit(): void {
    const svgElement = this.svgObject.nativeElement;
    svgElement.addEventListener('load', () => {
      const svgDoc = svgElement.contentDocument;
      if (svgDoc) {
        const paths = svgDoc.querySelectorAll('path');
        paths.forEach((path: SVGPathElement) => {
          path.style.fill = this.defaultFillColor;
          path.style.stroke = this.defaultStroke;
          path.style.strokeLinecap = this.defaultLineCap;
          path.style.strokeWidth = this.defaultStrokeWidth;
          path.addEventListener('mouseenter', (event) => this.onCountryEnter(event));
          path.addEventListener('mouseleave', (event) => this.onCountryLeave(event));
        });
      }
    });
  }
      
  onCountryEnter(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    target.style.fill = 'lightblue';
    const countryId = target.id;
    this.countrySelected.emit(countryId);
  }

  onCountryLeave(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    target.style.fill = this.defaultFillColor;
    this.countrySelected.emit('')
  }
}

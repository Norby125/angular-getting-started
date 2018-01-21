import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() public rating: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
    public starWidth: number;

    ngOnChanges(changes: SimpleChanges): void {
        this.starWidth = this.rating * 86 / 5;
    }
    public onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }

}
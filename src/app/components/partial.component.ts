/*
 * Renders a particular partial of the harmonic series, including
 * its amplitude control and its sine wave curve.
 */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { List } from 'immutable';
import { calculateSineCurve } from '../curves';

// How many samples to visualize in each curve.
const SAMPLE_COUNT = 650;
// The "sample rate frequency" used for visualization. Controls how much
// of the waves are shown.
const SAMPLE_RATE = 44100; 

@Component({
  selector: 'hs-partial',
  templateUrl: './partial.component.html',
  styleUrls: ['./partial.component.css'],
  // This is a dumb, stateless component with immutable inputs. We can use
  // OnPush change detection.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartialComponent implements OnChanges {
  @Input() strong = false;
  @Input() gain: number;
  @Input() frequency: number;
  @Output() gainChange = new EventEmitter();
  data: List<number>;

  ngOnChanges() {
     this.data = <List<number>>calculateSineCurve(
      this.frequency,
      this.gain,
      SAMPLE_COUNT,
      SAMPLE_RATE
    );
  }

}

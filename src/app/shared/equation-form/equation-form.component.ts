import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { CalculateService } from '../service/calculate.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-equation-form',
  templateUrl: './equation-form.component.html',
  styleUrls: ['./equation-form.component.scss'],
})
export class EquationFormComponent implements OnInit {

  form: FormGroup;
  result: string;
  currentOrientation;

  constructor(private fb: FormBuilder,
              private toastController: ToastController,
              private calculateService: CalculateService,
              private cdr: ChangeDetectorRef,
              public screenOrientation: ScreenOrientation) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      a: [],
      b: [],
      c: []
    });

    this.form.valueChanges.subscribe(() => {
      this.result = this.getMessageString(this.calculateService.calculate(this.form.value.a, this.form.value.b, this.form.value.c));
    });

    this.form.patchValue({});

    const that = this;

    this.screenOrientation.onChange().subscribe((orientation) => {
      that.currentOrientation = that.screenOrientation.type;
      this.cdr.detectChanges();
    });
  }

  onSubmit() {
    this.showResult(
        this.calculateService.calculate(this.form.value.a, this.form.value.b, this.form.value.c)
    );
  }

  private getMessageString(result: number[]): string {
    return result.map((resultItem, index) => {
      if (isNaN(resultItem)) {
        return `x${index + 1} не удалось вычислить`;
      } else {
        return `x${index + 1} = ${resultItem}`;
      }
    }).join('\n');
  }

  private async showResult(result: number[]) {
    const message = this.getMessageString(result);

    const toast = await this.toastController.create({
      message,
      duration: 2000
    });

    this.result = message;

    await toast.present();
  }
}

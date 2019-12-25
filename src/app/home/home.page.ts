import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { CalculateService } from '../shared/service/calculate.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {

  form: FormGroup;
  result: string;
  currentOrientation;

  constructor(private fb: FormBuilder,
              private toastController: ToastController,
              private calculateService: CalculateService,
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

    this.screenOrientation.onChange().subscribe(() => {
      that.currentOrientation = that.screenOrientation.type;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
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

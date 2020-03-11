import { NgModule } from '@angular/core';
import { CalculateService, LoggedCalculateService } from './service/calculate.service';
import { Logger, SqlLiteLogger } from './service/logger.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { EquationFormComponent } from './equation-form/equation-form.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from './dao/database.service';

@NgModule({
  declarations: [EquationFormComponent],
  entryComponents: [],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    {provide: CalculateService, useClass: LoggedCalculateService},
    {provide: Logger, useClass: SqlLiteLogger},
    SQLite,
    DatabaseService
  ],
  exports: [EquationFormComponent]
})
export class SharedModule {
}

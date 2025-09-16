import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MnzModule } from './mnz.module';
// import { CrisisListComponent } from './crisis-list/crisis-list.component';
// import { HeroesListComponent } from './heroes-list/heroes-list.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { TypesettingComponent } from './typesetting/typesetting.component';
// import { PreferenceComponent } from './preference/preference.component';
// import { TypesettingItemComponent } from './typesetting/typesetting-item/typesetting-item.component';
// import { EditionInfoComponent } from './typesetting/edition-info/edition-info.component';
// import { ActivityItemComponent } from './typesetting/activity-item/activity-item.component';
// import { MetadataInfoComponent } from './typesetting/metadata-info/metadata-info.component';
// import { LayoutOpeningComponent } from './typesetting/layout-opening/layout-opening.component';
// import { LayoutOpeningItemComponent } from './typesetting/layout-opening/layout-opening-item/layout-opening-item.component';
// import { LayoutSubmitComponent } from './typesetting/layout-submit/layout-submit.component';
// import { LayoutSubmitNotifyComponent } from './typesetting/layout-submit-notify/layout-submit-notify.component';
// import { TaskInfoComponent } from './task-info/task-info.component';
// import { MaterialInfoComponent } from './material-info/material-info.component';
// import { UploadFolioItemComponent } from './task-info/upload-folio-item/upload-folio-item.component';
// import { MaterialInfoUploadfileComponent } from './material-info-uploadfile/material-info-uploadfile.component';
// import { OpenFolioItemComponent } from './task-info/open-folio-item/open-folio-item.component';
// import { FolioItemFormComponent } from './task-info/folio-item-form/folio-item-form.component';
// import { ChangeOnhandComponent } from './task-info/change-onhand/change-onhand.component';

import { TodayPipe } from '../../pipes/today.pipe';
import { DateTimePipe } from '../../pipes/datetime.pipe';
import { FilterCallbackPipe } from '../../pipes/filter-callback.pipe';

const COMPONENTS = [
  // PageNotFoundComponent,
  // CrisisListComponent,
  // HeroesListComponent,
  // TypesettingComponent,
  // TypesettingItemComponent,
  // ActivityItemComponent,
  // PreferenceComponent,
  // EditionInfoComponent,
  // MetadataInfoComponent,
  // LayoutOpeningComponent,
  // LayoutOpeningItemComponent,
  // LayoutSubmitComponent,
  // LayoutSubmitNotifyComponent,
  // TaskInfoComponent,
  // MaterialInfoComponent,
  // UploadFolioItemComponent,
  // MaterialInfoUploadfileComponent,
  // OpenFolioItemComponent,
  // FolioItemFormComponent,
  // ChangeOnhandComponent
];

const PIPES = [
  TodayPipe,
  DateTimePipe,
  FilterCallbackPipe
];

@NgModule({
  imports: [
    DragDropModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MnzModule
  ],
  declarations: [...COMPONENTS, ...PIPES],
  // declarations: [...COMPONENTS, ...PIPES],
  exports: [DragDropModule, CommonModule, FormsModule, ReactiveFormsModule, MnzModule, ...PIPES],
})
export class CustomComponentModule { }


import {NgModule} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzAlertModule} from "ng-zorro-antd/alert";
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

const NzCommonModule = [
  NzIconModule,
  NzGridModule,
  NzSpaceModule,
  NzIconModule,
  NzButtonModule,
  NzInputModule,
  NzDrawerModule,
  NzDropDownModule,
  NzSelectModule,
  NzAlertModule,
  NzTreeModule,NzTreeViewModule,NzTreeSelectModule,
  NzCarouselModule,NzDatePickerModule,NzListModule,
  NzTabsModule,NzInputNumberModule,NzBreadCrumbModule,
  NzRadioModule,NzSwitchModule,
  NzMessageModule,
  NzTagModule,
  NzCollapseModule,
  NzAffixModule,
  NzDescriptionsModule,
  NzAutocompleteModule,
  NzImageModule,
  NzBadgeModule,
  NzDividerModule,
  NzAvatarModule,
  NzDividerModule,
  NzTimePickerModule,
  NzDatePickerModule,
  NzTableModule,
  NzCheckboxModule,
  NzProgressModule,
  NzUploadModule,
  NzPopoverModule,
  NzToolTipModule,
  NzModalModule,
  NzPopconfirmModule,
  NzCardModule,
  NzFormModule,
  NzLayoutModule,
  NzPageHeaderModule,
];


const PIPES: [] = [
];

const PROVIDERS = [
  NzModalService,
  NzNotificationService
]

@NgModule({
  imports: [
    ScrollingModule,
    DragDropModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCommonModule,
  ],
  declarations: [...PIPES],
  exports: [...NzCommonModule, DragDropModule, CommonModule, FormsModule, ReactiveFormsModule, ...PIPES],
  providers: [...PROVIDERS]
})
export class MnzModule {
}

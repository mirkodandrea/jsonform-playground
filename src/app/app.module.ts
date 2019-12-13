import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormsModule } from '@angular/forms';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { ArrayTypeComponent } from './array.type';
import { ObjectTypeComponent } from './object.type';
import { MultiSchemaTypeComponent } from './multischema.type';
import { NullTypeComponent } from './null.type';

import { DatatableTypeComponent } from './datatable.type';
import { RichtextTypeComponent } from './richtext.type';
import { ButtonTypeComponent } from './button.type';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    
    BrowserAnimationsModule,
    NgJsonEditorModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FormlyBootstrapModule,
    NgxDatatableModule,
    
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'null', message: 'should be null' },
        { name: 'uniqueItems', message: 'should NOT have duplicate items' }        
      ],
      types: [
        {
          name: 'button',
          component: ButtonTypeComponent,
          wrappers: ['form-field'],
          defaultOptions: {
            templateOptions: {
              btnType: 'default',
              type: 'button',
            },
          },
        },
      { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'enum', extends: 'select' },
        { name: 'null', component: NullTypeComponent, wrappers: ['form-field'] },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'multischema', component: MultiSchemaTypeComponent },
        {
          name: 'datatable',
          component: DatatableTypeComponent,
          defaultOptions: {
            templateOptions: {
              columnMode: 'force',
              rowHeight: 'auto',
              headerHeight: '40',
              footerHeight: '40',
              limit: '10',
              scrollbarH: 'true',
              reorderable: 'reorderable',
            },
          },
        },
        {
          name: 'richtext',
          component: RichtextTypeComponent,
          defaultOptions: {
            templateOptions: {
            },
          },
        },
      ]
    }),
    AngularEditorModule
  ],

  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ArrayTypeComponent,
    ObjectTypeComponent,
    MultiSchemaTypeComponent,
    NullTypeComponent,
    DatatableTypeComponent,
    RichtextTypeComponent,
    ButtonTypeComponent
  ],
})
export class AppModule { }


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

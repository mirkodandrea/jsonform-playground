import { Component, OnInit } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as uuid from 'uuid';

@Component({
  selector: 'formly-field-richtext',
  template: `
  <label *ngIf="field.title"> {{field.title }} </label>
  <angular-editor [id]="_id" [formControl]="formControl" [config]="config">
  {{this | json}}
`,
})

export class RichtextTypeComponent extends FieldType implements OnInit {
  public config: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      
      minHeight: '10rem',
      fonts: [
        /*
        {class: 'gill-sans-mt', name: 'Gill Sans MT'},
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        */
      ],
      toolbarHiddenButtons: [
        [
          'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 
          'indent', 'outdent', 'insertImage', 'insertVideo', 
          'link', 'unlink', 'insertUnorderedList',
          'insertOrderedList', 'toggleEditorMode', 
          'textColor', 'backgroundColor', 'fontSize', 'heading', 'fontName'
        ]
      ]
  }
  public _id: string;

  ngOnInit() {
    this._id = 'json_richtext_' + uuid.v4();
    console.log(this);
  }
}
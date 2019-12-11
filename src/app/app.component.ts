import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JsonEditorComponent, JsonEditorOptions } from "ang-jsoneditor";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { delay, debounceTime } from "rxjs/operators";
import { isEqual, cloneDeep } from "lodash";

@Component({
  selector: "formly-app-example",
  templateUrl: "./app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  form: FormGroup;
  @ViewChild("editor", null) editor: JsonEditorComponent;
  jsoneditoroptions = new JsonEditorOptions();

  private _jsonSchema: any = {};
  public jsonSchema: any = {};

  private model$: BehaviorSubject<any>;
  public set model(data: any) {
    if (!this.model$) {
      this.model$ = new BehaviorSubject(data);
      this.modelObserver();
    } else {
      this.model$.next(data);
    }
  }
  public get model() {
    const data = this.model$ ? this.model$.getValue() : {};
    return data;
  }

  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  constructor(private formlyJsonschema: FormlyJsonschema) {
    this.loadExample();
    this.jsoneditoroptions.mode = "code";
  }

  modelObserver() {
    if (this.model$) {
      this.model$.pipe(debounceTime(1000)).subscribe(model => {
        console.log("model", model);
      });
    }
  }

  updateModel(model: any) {
    console.log("update model", model);
    this.model = model || {};
  }

  async loadExample() {
    let json = JSON.parse(localStorage.getItem('jsonform'))
    if(!json){
      const response = await fetch("assets/richtext.json");
      json = await response.json();
    }

    this.jsonSchema = cloneDeep(json);
    this._jsonSchema = cloneDeep(json);
    this.applySchema();
  }

  onModelChange() {
    this.model$.next(this.model);
    this.jsonSchema = cloneDeep(this.jsonSchema);
    this.jsonSchema.model = this.model;

  }

  applySchema() {
    console.log('applying', this._jsonSchema);
    this.jsonSchema = cloneDeep(this._jsonSchema);
    const json = cloneDeep(this._jsonSchema);
   
    let schema = json.schema;
    if(!(json.schema instanceof Array)){
      schema = [schema];
    }
    this.form = new FormGroup({});
    this.options = {};
    
    
    this.fields = schema.map(m => {
        if(
          m.type==='array' || 
          m.type==='object'
        ){
          const schemaObj = this.formlyJsonschema.toFieldConfig(m);
          console.log(schemaObj);
          return schemaObj; 
        }else{
          return m;
        }
      });
  

    if (!isEqual(this.model, json.model)) {
      this.model = json.model;
    }

    localStorage.setItem('jsonform', JSON.stringify(this.jsonSchema));
  }

  onJsonChange($event) {
    const value = $event.valueOf()
    if(value.model && value.schema){
      this._jsonSchema = value;
    }
  }

  ngAfterViewInit() {}
}

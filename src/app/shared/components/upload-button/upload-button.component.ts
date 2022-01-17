import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {

  @Input('id') public id? : any;
  @Input('size') public size? : 'lg' | 'sm';
  @Input('label') public label : string = 'Choose Image';

  @Output('imageChange')
  public imageChange = new EventEmitter<{
    id?: string,
    files: FileList
  }>();

  constructor() { }

  ngOnInit(): void {
  }

  onImageChange(event: any){
    this.imageChange.emit({
      id: this.id,
      files: event.target.files
    })
  }

}

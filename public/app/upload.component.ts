import {Component, ElementRef, ViewChild} from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'my-upload',
    templateUrl: 'upload.component.html',
    styleUrls: ['upload.component.css'],
    providers: []
})
export class UploadComponent {
    fileList: any;
    file: File;
    fileName: string;
    message: string;
    disableButton: boolean = true;

    @ViewChild('fileInput') myFileInput: ElementRef;

    constructor(private http: Http) {}

    fileChange(event) {
        this.fileList = event.target.files;
        if (this.fileList.length > 0) {
            this.file = this.fileList[0];
            this.fileName = this.myFileInput.nativeElement.files[0].name;

            let fileNameCheck = new RegExp(/eventresult_[0-9]{8}\.csv/);

            if (fileNameCheck.test(this.fileName)) {
                this.disableButton = false;
                this.message = null;
            } else {
                this.disableButton = true;
                this.message = "File name is not valid! Make sure it is similar to 'eventresult_12345678.csv'";
            }
        } else {
            this.disableButton = true;
        }
    }

    fileUploadButton() {
        let formData: FormData = new FormData();
        formData.append('uploadFile', this.file, this.file.name);
        formData.append('test', 'more test', 'even more test');

        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post('/api/upload', formData, options)
            .map(res => res.json())
            .subscribe(
                data => this.message = data.message,
                error => console.log(error)
            );

        console.log(formData);
        // this.disableButton = true;
    }
}
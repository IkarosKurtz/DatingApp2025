import { Component, input, output, signal } from "@angular/core";

@Component({
  selector: "app-image-upload",
  imports: [],
  templateUrl: "./image-upload.html",
  styleUrl: "./image-upload.css",
})
export class ImageUpload {
  private fileToUpload: File | null = null;
  protected imageSource = signal<string | ArrayBuffer | null | undefined>(null);
  protected isDragging = false;
  public uploadFile = output<File>();
  public loading = input<boolean>(false);

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => this.imageSource.set(e.target?.result);
    reader.readAsDataURL(file);
  }

  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.previewImage(file);
      this.fileToUpload = file;
    }
  }

  public onCancel() {
    this.fileToUpload = null;
    this.imageSource.set(null);
  }

  public onUploadFile() {
    if (this.fileToUpload) {
      this.uploadFile.emit(this.fileToUpload);
    }
  }
}

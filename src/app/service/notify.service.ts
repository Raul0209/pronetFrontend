import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

//Servicio para manejar notificaciones
export class NotifyService {

  constructor(private toastr: ToastrService) { }


  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }

  showError(message: string, title: string) {
    this.toastr.error(message,title)
  }

}

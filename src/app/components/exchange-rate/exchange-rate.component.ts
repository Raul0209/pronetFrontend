import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Dates } from 'src/app/models/date.model';
import { NotifyService } from 'src/app/service/notify.service';
import { SoapService } from 'src/app/service/soap.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})

export class ExchangeRateComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private soapService: SoapService,
    private _notifyService: NotifyService
  ) {
    this.params = new Dates("", "")
  }

  ngOnInit() {
    this.obtenerPromedios();
  }

  public params: any;
  public data: any = []
  public isLoading: boolean = false
  public showInfo: boolean = false;
  public info: any
  closeResult = '';


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  //Manejamos los eventos para los cierres del modal
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.showInfo = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.showInfo = false;
    });
  }

  obtenerPromedioTipoCambio() {

    //Le damos formato a las fechas obtenidas
    var finCompleta: string = this.params.fechafin.year + "-" + this.params.fechafin.month + "-" + this.params.fechafin.day;
    var initCompleta: string = this.params.fechainit.year + "-" + this.params.fechainit.month + "-" + this.params.fechainit.day;
    this.params.fechafin = finCompleta
    this.params.fechainit = initCompleta

    this.isLoading = true;
    this.soapService.getPromedio(this.params).subscribe(
      response => {
        this.isLoading = false;
        if (response.promedio) {
          this._notifyService.showSuccess("Consulta almacenada correctamente", "");
          this.obtenerPromedios();
          this.showInfo = true;
          this.info= response.promedio;
        }

      },
      error => {
        this.isLoading = false;
        console.log(error);
        this._notifyService.showError("Erroral ejecutar la peticion", "")

      }
    )
  }

  //Obtenemos datos para llenar la tabla
  obtenerPromedios() {
    this.soapService.getPromedios().subscribe(
      response => {
        if (response.noPromedios) {
          this._notifyService.showWarning("No se han encontrado registros en el sistema", "")
        }

        if (response.promedios) {
          this.data = response.promedios;
        }
      },
      error => {
        this._notifyService.showError("Erroral ejecutar la peticion", "")
      }
    )
  }

  //Manejamos el cierre del modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';
    } else {
      this.obtenerPromedioTipoCambio();
      return `with: ${reason}`;
    }
  }

}

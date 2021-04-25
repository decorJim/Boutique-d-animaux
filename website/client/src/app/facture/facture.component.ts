import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animal } from '../../../../common/tables/Animal';
import { Proprietaire } from '../../../../common/tables/Proprietaire';
import { Facture } from '../../../../common/tables/Facture';
import { CommunicationService } from '../communication.service';


@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  constructor(private communicationService:CommunicationService) { }

  ArrayAnimal: Animal[] = [];
  owners:Proprietaire[]=[];
  animals: any[] = [];
  bills:Facture[]=[];
  public duplicateError: boolean = false;

  @ViewChild("newNoOwner") newNoOwner:ElementRef;
  @ViewChild("newNoAnimal") newNoAnimal:ElementRef;
  @ViewChild("newNoEmploye") newNoEmploye:ElementRef;
  @ViewChild("newDate") newDate:ElementRef;
  @ViewChild("newTotal") newTotal:ElementRef;

  @ViewChild("newPaye") newPaye:ElementRef;
  @ViewChild("newPaymentType") newPaymentType:ElementRef;
  @ViewChild("selectedOwner") selectedOwner:ElementRef;

  
  ngOnInit() {
    this.getOwners();
    this.getAnimals();
    this.getBills();
  }

  public selectByOwner(owner:string) {
    if(owner=="all") {
      this.getBills();
      return;
    }
    for( var i of this.owners) {
      if(i.nom==owner) {
        this.communicationService.getBillsOwner(i.noproprietaire).subscribe((bills:Facture[])=>{
          this.bills=bills;
        });
        break;
      }
    }
   
  }

  public getOwners():void {
    this.communicationService.getOwners().subscribe((owners:Proprietaire[])=>{
       this.owners=owners;
    });
  }

  public getAnimals(): void {
    this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
      this.ArrayAnimal = animals;
    });
  }

  public getBills():void {
    this.communicationService.getBills().subscribe((bills:Facture[])=>{
       this.bills=bills;
    });
  }

  public addBill():void {
      const bill:Facture={
      noproprietaire:this.newNoEmploye.nativeElement.innerText as number, 
	    noanimal:this.newNoAnimal.nativeElement.innerText as number,
	    noemploye:this.newNoEmploye.nativeElement.innerText as number,
	    datefacture:this.newDate.nativeElement.innerText,
	    total:this.newTotal.nativeElement.innerText as number,
	    paye:this.newPaye.nativeElement.innerText as Boolean,
	    typedepaiement:this.newPaymentType.nativeElement.innerText,
    }

    this.communicationService.addBill(bill).subscribe((res:any)=>{
      this.refresh();
    });
  }

  public deleteBill(noOwner:number,noAnimal:number,noEmploye:number):void {
    this.communicationService.deleteBill(noOwner,noAnimal,noEmploye).subscribe((res:any)=>{
      this.refresh();
    });
  }

  public updateBill(i:number) {
    this.communicationService.updateBill(this.bills[i]).subscribe((res)=>{
      this.refresh();
    });
  }

  public changeBilldate(event:any,i:number) {
    const editField=event.target.textContent;
    this.bills[i].datefacture=editField;
  }

  public changeBilltotal(event:any,i:number) {
    const editText=event.target.textContent;
    this.bills[i].total=editText;
  }

  public changeBillpaye(event:any,i:number) {
    const editField=event.target.textContent;
    this.bills[i].paye=editField;
  }

  public changeBilltypepayment(event:any,i:number) {
    const editField=event.target.textContent;
    this.bills[i].typedepaiement=editField;
  }

  public refresh():void {
    this.getBills();
    this.newNoOwner.nativeElement.innerText = "";
    this.newNoAnimal.nativeElement.innerText = "";
    this.newNoEmploye.nativeElement.innerText = "";
    this.newDate.nativeElement.innerText = "";
    this.newTotal.nativeElement.innerText = "";
    this.newPaye.nativeElement.innerText = "";
    this.newPaymentType.nativeElement.innerText="";
  }

}





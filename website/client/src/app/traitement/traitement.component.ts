
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animal } from '../../../../common/tables/Animal';
import { Examen } from '../../../../common/tables/Examen';
import { Facture } from '../../../../common/tables/Facture';
import { Proprietaire } from '../../../../common/tables/Proprietaire';
import { Traitement } from '../../../../common/tables/Traitement';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent implements OnInit {

  constructor(private communicationService:CommunicationService) { }

  treatments:Traitement[]=[];
  tempTreatment:Traitement[]=[];
  examens:Examen[];
  ArrayAnimal: Animal[] = [];
  owners:Proprietaire[]=[];
  animals: any[] = [];
  bills:Facture[]=[];
  public duplicateError: boolean = false;

  newExam:number;
  newOwner:number;
  newAnimal:number;

 
  @ViewChild("newNoExam") newNoExam:ElementRef;
  @ViewChild("newExamDate") newExamDate:ElementRef;
  @ViewChild("newQuantity") newQuantity:ElementRef;
  @ViewChild("newStartingDate") newStartingDate:ElementRef;
  @ViewChild("newEndingDate") newEndingDate:ElementRef;
  @ViewChild("newOwnerNo") newOwnerNo:ElementRef;
  @ViewChild("newAnimalNo") newAnimalNo:ElementRef;
  @ViewChild("newEmployeeNo") newEmployeeNo:ElementRef;
  @ViewChild("newTreatmentTypeNo") newTreatmentTypeNo:ElementRef;

  
  ngOnInit() {
    this.getExamen();
    this.getTreatments();
    this.getOwners();
    this.getAnimals();
    this.getBills();
  }

  public setOwnerNo(num:number):void {
    this.newOwner=num;
  }

  public setAnimalNo(num:number):void {
    this.newAnimal=num;
  }

  public fillAnimals() {  
    this.animals=[];
    for( var i of this.tempTreatment) {
      for(var j of this.ArrayAnimal) {
        if(i.noanimal==j.noanimal) {
         this.animals.push(j);
        }  
       }
    }
  }

  public selectByAnimal(noanimal:any) {
      if(noanimal=="all" as any) {
        this.treatments=this.tempTreatment;
        return;
      }
      else {
      for( var i of this.tempTreatment) {
        if(i.noanimal==noanimal) {
          this.communicationService.getTreatmentAnimal(i.noanimal).subscribe((treatments:Traitement[])=>{
              this.treatments=treatments;
              return;
          });
        }
      }
      this.treatments=[];
    }
  }
    
  public getExamen():void {
    this.communicationService.getExamens().subscribe((examens:Examen[])=>{
      this.examens=examens;
      console.log(this.examens);
    });
  }

  public getTreatments():void {
    this.communicationService.getTreatments().subscribe((treatments:Traitement[])=>{
      this.treatments=treatments;
      this.tempTreatment=treatments;
    })
  }

  public getOwners():void {
    this.communicationService.getOwners().subscribe((owners:Proprietaire[])=>{
       this.owners=owners;
    });
  }

  public getAnimals(): void {
    this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
      this.ArrayAnimal = animals;
      this.fillAnimals();
    }
    );
  }

  public getBills():void {
    this.communicationService.getBills().subscribe((bills:Facture[])=>{
       this.bills=bills;
    });
  }

  public addTreatment():void { 
      const treatment:Traitement={
        noexamen:this.newNoExam.nativeElement.innerText as number,
        dateexamen:this.newExamDate.nativeElement.innerText,
        quantite:this.newQuantity.nativeElement.innerText as number,
        datedebut:this.newStartingDate.nativeElement.innerText,
        datefin:this.newEndingDate.nativeElement.innerText,
      	// noproprietaire:this.newOwnerNo.nativeElement.innerText as number,
        noproprietaire:this.newOwner,
      	//noanimal:this.newAnimalNo.nativeElement.innerText as number,
        noanimal:this.newAnimal,
	      noemploye:this.newAnimalNo.nativeElement.innerText as number,
        notypetraitement:this.newTreatmentTypeNo.nativeElement.innerText as number
      }


      // console.log(treatment.noproprietaire);

      for( var i of this.examens) {
        if(treatment.noexamen==i.noexamen) {
          this.communicationService.addTreatment(treatment).subscribe((res:any)=>{
            console.log(res);
            this.refresh();
          });
          break;
        }
      }
  }

  public deleteTreatment(i:number):void {
    const noExamen=this.treatments[i].noexamen;
    this.communicationService.deleteTreatment(noExamen).subscribe((res:any)=>{
      this.refresh();
    });
  }

  public updateTreatment(i:number):void {
    this.communicationService.updateTreatment(this.treatments[i]).subscribe((res:any)=>{
      this.refresh();
    });
  }

  public changeTreatmentdate(event:any,i:number) {
    const editField=event.target.textContent;
    this.treatments[i].dateexamen=editField;
  }

  public changeTreatmentquantity(event:any,i:number) {
    const editText=event.target.textContent;
    this.treatments[i].quantite=editText;
  }

  public changeStartingdate(event:any,i:number) {
    const editField=event.target.textContent;
    this.treatments[i].datedebut=editField;
  }

  public changeDatefin(event:any,i:number) {
    const editField=event.target.textContent;
    this.treatments[i].datefin=editField;
  }


  private refresh():void 
  { 
    this.getTreatments();
    this.newNoExam.nativeElement.innerText="";
    this.newExamDate.nativeElement.innerText="";
    this.newQuantity.nativeElement.innerText="";
    this.newStartingDate.nativeElement.innerText="";
    this.newEndingDate.nativeElement.innerText="";
    this.newOwnerNo.nativeElement.innerText="";
    this.newAnimalNo.nativeElement.innerText="";
    this.newEmployeeNo.nativeElement.innerText="";
    this.newTreatmentTypeNo.nativeElement.innerText="";
  }

}



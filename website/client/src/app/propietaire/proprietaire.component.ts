import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animal } from '../../../../common/tables/Animal';
import { Proprietaire } from '../../../../common/tables/Proprietaire';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.css']
})
export class ProprietaireComponent implements OnInit {

  constructor(private communicationService:CommunicationService) {
  }

  @ViewChild("newHotelNb") newHotelNb: ElementRef;
  @ViewChild("newHotelName") newHotelName: ElementRef;
  @ViewChild("newHotelCity") newHotelCity: ElementRef;

  @ViewChild("newNoOwner") newNoOwner:ElementRef;
  @ViewChild("newName") newName:ElementRef;
  @ViewChild("newAdress") newAdress:ElementRef;
  @ViewChild("newTel") newTel:ElementRef;
  @ViewChild("newNoClinique") newNoClinique:ElementRef;



  ArrayAnimal: Animal[] = [];
  owners:Proprietaire[]=[];
  animals: any[] = [];
  public duplicateError: boolean = false;

 ngOnInit() {
   this.getOwners();
 }


 /************ OWNER *********************** */
 public getOwners():void {
   this.communicationService.getOwners().subscribe((owners:Proprietaire[])=>{
      this.owners=owners;
      console.log(this.owners);
   });
 }

 public insertOwner():void {
   const noOwner=this.newNoOwner.nativeElement.innerText as number;
   const noClinique=this.newNoClinique.nativeElement.innerText as number;
   const owner:Proprietaire= {
       noproprietaire:noOwner,
       nom:this.newName.nativeElement.innerText,
       adresse:this.newAdress.nativeElement.innerText,
       notelephone:this.newTel.nativeElement.innerText,
       noclinique:noClinique,
   }
   this.communicationService.insertOwner(owner).subscribe((res:string)=>{
    try{ 
      console.log(res);
      this.refresh();
    }catch(error){
      console.log(error);
    }
   });
 }

 public deleteOwner(noOwner:number) {
  this.communicationService.deleteOwner(noOwner).subscribe((res:any)=>{
    this.refresh();
  });
 }
 
 private refresh() {
   this.getOwners();
   this.newNoOwner.nativeElement.innerText = "";
   this.newName.nativeElement.innerText = "";
   this.newAdress.nativeElement.innerText = "";
   this.newTel.nativeElement.innerText = "";
   this.newNoClinique.nativeElement.innerText = "";
 }

 /*
 public updateHotel(i: number) {
   this.communicationService.updateHotel(this.ArrayAnimal[i]).subscribe((res: any) => {
     this.refresh();
   });
 }
 */


}

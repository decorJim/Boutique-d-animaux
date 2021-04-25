import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animal } from '../../../../common/tables/Animal';
import { CommunicationService } from '../communication.service';
import {Proprietaire} from '../../../../common/tables/Proprietaire';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  constructor(private communicationService:CommunicationService) {
   }

   @ViewChild("newHotelNb") newHotelNb: ElementRef;
   @ViewChild("newHotelName") newHotelName: ElementRef;
   @ViewChild("newHotelCity") newHotelCity: ElementRef;
   @ViewChild("newNoAnimal") newNoAnimal: ElementRef;
   @ViewChild("newName") newName: ElementRef;
   @ViewChild("newTypeAnimal") newTypeAnimal:ElementRef;
   @ViewChild("newSpecie") newSpecie:ElementRef;
   @ViewChild("newSize") newSize:ElementRef;
   @ViewChild("newWeigth") newWeigth:ElementRef;
	 @ViewChild("newDescription") newDescription:ElementRef;
   @ViewChild("newBirthDate") newBirthDate:ElementRef;
   @ViewChild("newInscriptionDate") newInscriptionDate:ElementRef;
   @ViewChild("newState") newState:ElementRef;
   @ViewChild("newOwner") newOwner:ElementRef;
  


   ArrayAnimal: Animal[] = [];
   owners:Proprietaire[]=[];
   animals: any[] = [];
   public duplicateError: boolean = false;
   newOwnerNo:number;

  ngOnInit() {
    this.getAnimals();
    this.getOwners();
  }

  public setOwnerNo(num:number):void {
    this.newOwnerNo=num;
  }

  public insertAnimal(): void {
    const noAnimal=this.newNoAnimal.nativeElement.innerText as number;
    const size=this.newSize.nativeElement.innerText as number;
    const weight=this.newWeigth.nativeElement.innerText as number;
   

    const animal: Animal = {
      noanimal:noAnimal,
      nom:this.newName.nativeElement.innerText, 
      typeanimal:this.newTypeAnimal.nativeElement.innerText,
      espece:this.newSpecie.nativeElement.innerText,
      taille:size,
      poid:weight,
      description:this.newDescription.nativeElement.innerText,
      datedenaissance:this.newBirthDate.nativeElement.innerText,
      dateinscription:this.newInscriptionDate.nativeElement.innerText,
      etat:this.newState.nativeElement.innerText,
      noproprietaire:this.newOwnerNo,
   };

   console.log(animal.noproprietaire);
   this.communicationService.insertAnimal(animal).subscribe((res:string) => {
      try{ 
        console.log(res);
        this.refresh();
      }catch(error){
        console.log(error);
      }
     });
    
  }

  public getOwners():void {
    this.communicationService.getOwners().subscribe((owners:Proprietaire[])=>{
       this.owners=owners;
       console.log(this.owners);
    });
  }
  
  public getAnimals(): void {
    this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
      this.ArrayAnimal = animals;
    });
  }

  
  public deleteAnimal(i:number):void {
    console.log('delete');
    const noAnimal=this.ArrayAnimal[i].noanimal;
    this.communicationService.deleteAnimal(noAnimal).subscribe((res:any)=>{
      this.refresh();
    });
  }

  public updateAnimal(i: number) {
    console.log(this.ArrayAnimal[i]);
    this.communicationService.updateAnimal(this.ArrayAnimal[i]).subscribe((res: any) => {
      this.refresh();
    });
  }

  public changeAnimalName(event: any, i: number) {
    const editField = event.target.textContent;
    this.ArrayAnimal[i].nom = editField;
  }

  public changeAnimalType(event:any,i:number) {
    const editField=event.target.textContent;
    this.ArrayAnimal[i].typeanimal=editField;
  }

  public changeAnimalSpecie(event:any,i:number) {
    const editField=event.target.textContent;
    this.ArrayAnimal[i].espece=editField;
  }

  public changeAnimalSize(event:any,i:number) {
    const editField=event.target.textContent;
    this.ArrayAnimal[i].taille=editField;
  }

  public changeAnimalWeight(event:any,i:number) {
    const editField=event.target.textContent;
    this.ArrayAnimal[i].poid=editField;
  }

  public changeAnimalDescription(event:any,i:number) {
    const editField=event.target.textContent;
    this.ArrayAnimal[i].description=editField;
  }

  public changeAnimalBirthdate(event:any,i:number) {
    const editField=event.target.textContent;
    this.ArrayAnimal[i].datedenaissance=editField;
  }

  public changeAnimalInscriptiondate(event:any,i:number) {
    const editField=event.target.textContent;
    this.ArrayAnimal[i].dateinscription=editField;
  }

  public changeAnimalState(event:any,i:number) {
    const editField=event.target.textContent;
    this.ArrayAnimal[i].etat=editField;
  }


  public selectByOwner(owner:string) {
    if(owner=="all") {
      this.getAnimals();
      return;
    }
    for( var i of this.owners) {
      if(i.nom==owner) {
        this.communicationService.getAnimalsOwner(i.noproprietaire).subscribe((animals:Animal[])=>{
          this.ArrayAnimal=animals;
        });
        break;
      }
    }
   
  }

  public pickOwner(noOwner:number){
     console.log(noOwner);
  }


  private refresh() {
    this.getAnimals();
    this.newNoAnimal.nativeElement.innerText = "";
    this.newName.nativeElement.innerText = "";
    this.newTypeAnimal.nativeElement.innerText = "";
    this.newSpecie.nativeElement.innerText = "";
    this.newSize.nativeElement.innerText = "";
    this.newWeigth.nativeElement.innerText = "";
    this.newDescription.nativeElement.innerText = "";
    this.newBirthDate.nativeElement.innerText = "";
    this.newInscriptionDate.nativeElement.innerText = "";
    this.newState.nativeElement.innerText = "";
    this.newOwner.nativeElement.innerText = "";
  }

 

  

}

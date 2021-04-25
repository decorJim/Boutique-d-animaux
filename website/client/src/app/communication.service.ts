import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Hotel } from "../../../common/tables/Hotel";
import { Room } from "../../../common/tables/Room";
import { Guest } from "../../../common/tables/Guest";
import {Animal} from "../../../common/tables/Animal";
import { Proprietaire } from "../../../common/tables/Proprietaire";
import { Facture } from "../../../common/tables/Facture";
import { Traitement } from "../../../common/tables/Traitement";
import { Examen } from "../../../common/tables/Examen";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public getHotels(): Observable<Hotel[]> {
    return this.http
      .get<Hotel[]>(this.BASE_URL + "/hotels")
      .pipe(catchError(this.handleError<Hotel[]>("getHotels")));
  }


  /**************************** */

  // get all animals
  public getAnimals(): Observable<Animal[]> {
    return this.http
      .get<Animal[]>(this.BASE_URL + '/animals')
      .pipe(catchError(this.handleError<Animal[]>("getAnimal")));
  }

  // post animal
  public insertAnimal(animal:Animal):Observable<string> {
    return this.http.post<string>(this.BASE_URL + '/animals/insert/',animal);
  }

  // delete animal
  public deleteAnimal(noAnimal:number):Observable<number> {
    return this.http
    .post<number>(this.BASE_URL+'/animals/delete/'+ noAnimal,{})
    .pipe(catchError(this.handleError<number>("deleteAnimal")));
  }

  public getAnimalsOwner(owner:number):Observable<Animal[]> {
    return this.http
    .get<Animal[]>(this.BASE_URL+'/animals/selected/'+owner,{})
    .pipe(catchError(this.handleError<Animal[]>("getAnimals")))
  }

  // update animal
  public updateAnimal(animal: Animal): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/animals/update", animal)
      .pipe(catchError(this.handleError<number>("updateAnimal")));
  }

  // get all owners
  public getOwners():Observable<Proprietaire[]> {
    return this.http
    .get<Proprietaire[]>(this.BASE_URL+'/proprietaires')
    .pipe(catchError(this.handleError<Proprietaire[]>("getOwner")));
  }

  // insert owner
  public insertOwner(owner:Proprietaire):Observable<string> {
    return this.http.post<string>(this.BASE_URL+'/proprietaires/insert/',owner);
  }

  // delete owner
  public deleteOwner(noOwner:number):Observable<number> {
    return this.http
    .post<number>(this.BASE_URL+'/proprietaires/delete/'+noOwner,{})
    .pipe(catchError(this.handleError<number>("deleteOwner")));
  }

  // get all factures
  public getBills():Observable<Facture[]> {
    return this.http
    .get<Facture[]>(this.BASE_URL+'/factures')
    .pipe(catchError(this.handleError<Facture[]>("getBill")));
  }

  // add a bill
  public addBill(bill:Facture):Observable<string> {
    return this.http.post<string>(this.BASE_URL+'/factures/insert/',bill);
  }

  // delete a bill
  public deleteBill(noOwner:number,noAnimal:number,noEmploye:number):Observable<number> {
    
    return this.http
    .post<number>(this.BASE_URL+'/factures/delete/',{noOwner,noAnimal,noEmploye})
    .pipe(catchError(this.handleError<number>("deleteBill")));
  }

  // update a bill
  public updateBill(bill:Facture):Observable<number> {
    return this.http
    .put<number>(this.BASE_URL+'/factures/update',bill)
    .pipe((catchError(this.handleError<number>("updateAnimal"))));
  }

  // get bills of owner
  public getBillsOwner(owner:number):Observable<Facture[]> {
    return this.http
    .get<Facture[]>(this.BASE_URL+'/factures/selected/'+owner,{})
    .pipe(catchError(this.handleError<Facture[]>("getBill")));
  }

  public getExamens():Observable<Examen[]>{
    return this.http
    .get<Examen[]>(this.BASE_URL+'/examens')
    .pipe(catchError(this.handleError<Examen[]>("getExamen")));
  }

  public getTreatments():Observable<Traitement[]> {
    return this.http
    .get<Traitement[]>(this.BASE_URL+'/traitements')
    .pipe(catchError(this.handleError<Traitement[]>("getTreatment")));
  }

  public addTreatment(treatment:Traitement):Observable<number> {
    return this.http
    .post<number>(this.BASE_URL+'/traitements/insert',treatment)
    .pipe(catchError(this.handleError<number>("insertHotel")));
  }

  public deleteTreatment(noTreatment:number):Observable<number> {
    return this.http
    .post<number>(this.BASE_URL+'/traitements/delete/'+noTreatment,{})
    .pipe(catchError(this.handleError<number>("deleteTreatment")));
  }

  public updateTreatment(treatment:Traitement):Observable<number> {
    return this.http
    .put<number>(this.BASE_URL+'/traitements/update',treatment)
    .pipe(catchError(this.handleError<number>("updateTreatment")));
  }

  public getTreatmentAnimal(noanimal:number):Observable<Traitement[]> {
    return this.http
    .get<Traitement[]>(this.BASE_URL+'/traitements/selected/'+noanimal,{})
    .pipe(catchError(this.handleError<Traitement[]>("getTreatment")));
  }

  /***************************** */

  public getRooms(hotelNb: string): Observable<Room[]> {
    return this.http
      .get<Room[]>(this.BASE_URL + `/rooms?hotelNb=${hotelNb}`)
      .pipe(catchError(this.handleError<Room[]>("getRooms")));
  }


  public getGuests(hotelNb: string, roomNb: string): Observable<Guest[]> {
    return this.http
      .get<Guest[]>(this.BASE_URL + `/guests/${hotelNb}/${roomNb}`)
      .pipe(catchError(this.handleError<Guest[]>("getGuests")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}

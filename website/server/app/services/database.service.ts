import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Animal } from "../../../common/tables/Animal";
import { Proprietaire } from "../../../common/tables/Proprietaire";
import { Facture } from "../../../common/tables/Facture";
import { Traitement } from "../../../common/tables/Traitement";
// import { connect } from "net";


@injectable()
export class DatabaseService {

  // TODO: A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "VetoSansFrontieresDB",
    password: "vic98989", // mettre password de database pour faire fonctionner
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= DEBUG =======
  /*public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM HOTELDB.${tableName};`);
    client.release()
    return res;
  }
*/
  
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM VetoSansFrontieresDB.${tableName};`);
    client.release()
    return res;
  }



  // ======= HOTEL =======
 

  // get hotels that correspond to certain caracteristics
  public async filterHotels(hotelNb: string, hotelName: string, city: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const searchTerms: string[] = [];
    if (hotelNb.length > 0) searchTerms.push(`hotelNb = '${hotelNb}'`);
    if (hotelName.length > 0) searchTerms.push(`name = '${hotelName}'`);
    if (city.length > 0) searchTerms.push(`city = '${city}'`);

    let queryText = "SELECT * FROM HOTELDB.Hotel";
    if (searchTerms.length > 0) queryText += " WHERE " + searchTerms.join(" AND ");
    queryText += ";";

    const res = await client.query(queryText);
    client.release()
    return res;
  }
/***************************************************************************************************************** */
  // filtre animal
  public async filterAnimal(owner:number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const searchTerms:string[]=[];

    let queryText = "SELECT * FROM VetoSansFrontieresDB.Animal";

    if(owner>0) {
      searchTerms.push(`noproprietaire = '${owner}'`);
    }

    if (searchTerms.length > 0) {
       queryText += " WHERE " + searchTerms.join(" AND ");
    }
    queryText += ";";

    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async createAnimal(animal:Animal): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const queryText: string = `INSERT INTO VetoSansFrontieresDB.Animal VALUES('${animal.noanimal}','${animal.nom}','${animal.typeanimal}','${animal.espece}',
      '${animal.taille}','${animal.poid}','${animal.description}','${animal.datedenaissance}','${animal.dateinscription}','${animal.etat}','${animal.noproprietaire}');`;
    try {
      const res = await client.query(queryText);
      client.release();
      return res;
    }
    catch(error) {
      return error;
    }

  }

  public async deleteAnimal(noAnimal:number):Promise<pg.QueryResult> {
    console.log(noAnimal);
    const client=await this.pool.connect();
    const res=await client.query(`DELETE FROM VetoSansFrontieresDB.Animal WHERE noanimal = '${noAnimal}';`);
    client.release();
    return res;
  }

  public async selectedAnimalsOwner(noOwner:number):Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    let queryText = `SELECT * FROM VetoSansFrontieresDB.Animal WHERE noproprietaire=${noOwner};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async updateAnimal(animal: Animal): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let toUpdateValues = [];

    if(animal.nom.length>0) {
      toUpdateValues.push(`nom='${animal.nom}'`);
    }
    if(animal.typeanimal.length>0) {
      toUpdateValues.push(`typeanimal='${animal.typeanimal}'`);
    }
    if(animal.espece.length>0) {
      toUpdateValues.push(`espece='${animal.espece}'`);
    }
    if(animal.taille>0) {
      toUpdateValues.push(`taille='${animal.taille}'`);
    }
    if(animal.poid>0) {
      toUpdateValues.push(`poid='${animal.poid}'`);
    }
    if(animal.description.length>0) {
      toUpdateValues.push(`description='${animal.description}'`);
    }
    if(animal.datedenaissance!=null) {
      toUpdateValues.push(`datedenaissance='${animal.datedenaissance}'`);
    }
    if(animal.dateinscription!=null) {
      toUpdateValues.push(`dateinscription='${animal.dateinscription}'`);
    }
    if(animal.etat.length>0) {
      toUpdateValues.push(`etat='${animal.etat}'`);
    }

    const queryText=`UPDATE VetoSansFrontieresDB.Animal SET ${toUpdateValues.join(", ")}
    WHERE noanimal='${animal.noanimal}' AND noproprietaire='${animal.noproprietaire}';`;

    const res = await client.query(queryText);
    client.release()
    return res;
  }



  /**************************** OWNER *****************************/
  
  public async filterOwner(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM VetoSansFrontieresDB.Proprietaire;";
   
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async createOwner(owner:Proprietaire): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const queryText: string = `INSERT INTO VetoSansFrontieresDB.Proprietaire VALUES('${owner.noproprietaire}','${owner.nom}','${owner.adresse}','${owner.notelephone}',
      '${owner.noclinique}');`;
    try {
      const res = await client.query(queryText);
      client.release();
      return res;
    }
    catch(error) {
      return error;
    }
  }

  public async deleteOwner(noOwner:number):Promise<pg.QueryResult> {
      const client=await this.pool.connect();
      const queryText:string=`DELETE FROM VetoSansFrontieresDB.Proprietaire WHERE noproprietaire='${noOwner}';`;
      const res=await client.query(queryText);
      client.release();
      return res;
  }

  /********************************* BILLS ****************************** */

  public async filterBill(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM VetoSansFrontieresDB.Facture;";
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async createBill(bill:Facture):Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    const queryText:string=`INSERT INTO VetoSansFrontieresDB.Facture VALUES('${bill.noproprietaire}','${bill.noanimal}','${bill.noemploye}','${bill.datefacture}',
    '${bill.total}','${bill.paye}','${bill.typedepaiement}');`;

    try {
      const res=await client.query(queryText);
      client.release();
      console.log(res);
      return res;
    }
    catch(error) {
       return error;
    }

  }

  public async deleteBill(noOwner:number,noAnimal:number,noEmploye:number):Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    const queryText:string=`DELETE FROM VetoSansFrontieresDB.Facture WHERE noproprietaire='${noOwner}' AND noAnimal='${noAnimal}' AND
    noEmploye='${noEmploye}';`;
    const res=await client.query(queryText);
    client.release();
    return res;
  }

  public async updateBill(bill:Facture):Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    let toUpdateValues = [];

    toUpdateValues.push(`datefacture='${bill.datefacture}'`);
    toUpdateValues.push(`total='${bill.total}'`);
    toUpdateValues.push(`paye='${bill.paye}'`);
    toUpdateValues.push(`typedepaiement='${bill.typedepaiement}'`);

    try {
    const queryText=`UPDATE VetoSansFrontieresDB.Facture SET ${toUpdateValues.join(", ")}
    WHERE noproprietaire='${bill.noproprietaire}' AND noanimal='${bill.noanimal}' AND
    noemploye='${bill.noemploye}';`;

    const res=await client.query(queryText);
    client.release();
    return res;
    }
    catch(error) {
      return error;
    }
   
  }

  public async selectedBillOwner(owner:string):Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    let queryText = `SELECT * FROM VetoSansFrontieresDB.Facture WHERE noproprietaire=${owner};`;
    const res = await client.query(queryText);
    client.release();
    return res;

  }

  /************************************ treatment ********************************/

  public async filterExam():Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    let queryText=`SELECT * FROM VetoSansFrontieresDB.Examen;`;
    const res= await client.query(queryText);
    client.release();
    return res;
  }


  public async filterTreatment():Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    let queryText=`SELECT * FROM VetoSansFrontieresDB.Traitement;`;
    const res= await client.query(queryText);
    client.release();
    return res;
  }


  public async createTreatment(treatment:Traitement):Promise<pg.QueryResult> {
    console.log("anal zouaq");
    const client=await this.pool.connect();

    let queryText=`INSERT INTO VetoSansFrontieresDB.Traitement VALUES('${treatment.noexamen}','${treatment.dateexamen}',
    '${treatment.quantite}','${treatment.datedebut}','${treatment.datefin}','${treatment.noproprietaire}',
    '${treatment.noanimal}','${treatment.noemploye}','${treatment.notypetraitement}');`;

    const res= await client.query(queryText);
    client.release();
    return res;
  }

  public async deleteTreatment(noTreatment:number):Promise<pg.QueryResult> {

    const client=await this.pool.connect();
    const queryText:string=`DELETE FROM VetoSansFrontieresDB.Traitement WHERE noexamen='${noTreatment}';`;
    const res=await client.query(queryText);
    client.release();
    return res;
  }

  public async updateTreatment(treatment:Traitement):Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    let toUpdateValues = [];

    toUpdateValues.push(`dateexamen='${treatment.dateexamen}'`);
    toUpdateValues.push(`quantite='${treatment.quantite}'`);
    toUpdateValues.push(`datedebut='${treatment.datedebut}'`);
    toUpdateValues.push(`datefin='${treatment.datefin}'`);

    const queryText=`UPDATE VetoSansFrontieresDB.Facture SET ${toUpdateValues.join(", ")}
    WHERE noexamen='${treatment.noexamen}' AND noproprietaire='${treatment.noproprietaire}' AND
    noanimal='${treatment.noanimal}' AND noemploye='${treatment.noemploye}' AND 
    notypetraitement='${treatment.notypetraitement}';`;

    const res=await client.query(queryText);
    client.release();
    return res;
  }

  public async selectedTreatmentsAnimal(noanimal:number):Promise<pg.QueryResult> {
    console.log(noanimal);
    const client=await this.pool.connect();
    let queryText = `SELECT * FROM VetoSansFrontieresDB.Traitement WHERE noanimal=${noanimal};`;
    try {
    const res = await client.query(queryText);
    client.release();
    return res;
    }
    catch(error) {
      return error;
    }
  }


  
/**************************************************************************************************************** */

  // get the hotel names and numbers so so that the user can only select an existing hotel
  public async getHotelNamesByNos(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query("SELECT hotelNb, name FROM HOTELDB.Hotel;");
    client.release()
    return res;
  }

  /*
  public async getAnimalNamesByNos(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query("SELECT noAnimal, nom FROM HOTELDB.Hotel;");
    client.release()
    return res;
  }
  */


  // ======= ROOMS =======


  public async filterRooms(
    hotelNb: string,
    roomNb: string = "",
    roomType: string = "",
    price: number = -1
    ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    if (!hotelNb || hotelNb.length === 0) throw new Error("Invalid filterRooms request");
    
    let searchTerms = [];
    searchTerms.push(`hotelNb = '${hotelNb}'`);

    if (roomNb.length > 0) searchTerms.push(`hotelNb = '${hotelNb}'`);
    if (roomType.length > 0) searchTerms.push(`type = '${roomType}'`);
    if (price >= 0) searchTerms.push(`price = ${price}`);

    let queryText = `SELECT * FROM HOTELDB.Room WHERE ${searchTerms.join(" AND ")};`;
    const res = await client.query(queryText);
    client.release()
    return res;
  }


  // ======= GUEST =======
  
  public async getGuests(hotelNb: string, roomNb: string): Promise<pg.QueryResult> {
    if (!hotelNb || hotelNb.length === 0) throw new Error("Invalid guest hotel no");
    
    const client = await this.pool.connect();
    const queryExtension = roomNb ? ` AND b.roomNb = '${roomNb}'` : "";
    const query: string = `SELECT * FROM HOTELDB.Guest g JOIN HOTELDB.Booking b ON b.guestNb = g.guestNb WHERE b.hotelNb = '${hotelNb}'${queryExtension};`;

    const res = await client.query(query);
    client.release()
    return res;
  }

  // ======= BOOKING =======
 
}

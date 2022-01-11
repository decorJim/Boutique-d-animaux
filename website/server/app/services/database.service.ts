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
    database: "boutiqueDB",
    password: "-------", // METTRE MOT DE PASSE POUR CONNECTER AVEC PGADMIN **********++++++++++++
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= DEBUG =======
  
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM boutiqueDB.${tableName};`);
    client.release()
    return res;
  }

/***************************************************************************************************************** */
  // filtre animal
  public async filterAnimal(owner:number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const searchTerms:string[]=[];

    let queryText = "SELECT * FROM boutiqueDB.Animal";

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

    const queryText: string = `INSERT INTO boutiqueDB.Animal VALUES('${animal.noanimal}','${animal.nom}','${animal.typeanimal}','${animal.espece}',
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
    const res=await client.query(`DELETE FROM boutiqueDB.Animal WHERE noanimal = '${noAnimal}';`);
    client.release();
    return res;
  }

  public async selectedAnimalsOwner(noOwner:number):Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    let queryText = `SELECT * FROM boutiqueDB.Animal WHERE noproprietaire=${noOwner};`;
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

    const queryText=`UPDATE boutiqueDB.Animal SET ${toUpdateValues.join(", ")}
    WHERE noanimal='${animal.noanimal}' AND noproprietaire='${animal.noproprietaire}';`;

    const res = await client.query(queryText);
    client.release()
    return res;
  }



  /**************************** OWNER *****************************/
  
  public async filterOwner(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM boutiqueDB.Proprietaire;";
   
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async createOwner(owner:Proprietaire): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const queryText: string = `INSERT INTO boutiqueDB.Proprietaire VALUES('${owner.noproprietaire}','${owner.nom}','${owner.adresse}','${owner.notelephone}',
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
      const queryText:string=`DELETE FROM boutiqueDB.Proprietaire WHERE noproprietaire='${noOwner}';`;
      const res=await client.query(queryText);
      client.release();
      return res;
  }

  /********************************* BILLS ****************************** */

  public async filterBill(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM boutiqueDB.Facture;";
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async createBill(bill:Facture):Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    const queryText:string=`INSERT INTO boutiqueDB.Facture VALUES('${bill.noproprietaire}','${bill.noanimal}','${bill.noemploye}','${bill.datefacture}',
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
    const queryText:string=`DELETE FROM boutiqueDB.Facture WHERE noproprietaire='${noOwner}' AND noAnimal='${noAnimal}' AND
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
    const queryText=`UPDATE boutiqueDB.Facture SET ${toUpdateValues.join(", ")}
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
    let queryText = `SELECT * FROM boutiqueDB.Facture WHERE noproprietaire=${owner};`;
    const res = await client.query(queryText);
    client.release();
    return res;

  }

  /************************************ treatment ********************************/

  public async filterExam():Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    let queryText=`SELECT * FROM boutiqueDB.Examen;`;
    const res= await client.query(queryText);
    client.release();
    return res;
  }


  public async filterTreatment():Promise<pg.QueryResult> {
    const client=await this.pool.connect();
    let queryText=`SELECT * FROM boutiqueDB.Traitement;`;
    const res= await client.query(queryText);
    client.release();
    return res;
  }


  public async createTreatment(treatment:Traitement):Promise<pg.QueryResult> {
    const client=await this.pool.connect();

    let queryText=`INSERT INTO boutiqueDB.Traitement VALUES('${treatment.noexamen}','${treatment.dateexamen}',
    '${treatment.quantite}','${treatment.datedebut}','${treatment.datefin}','${treatment.noproprietaire}',
    '${treatment.noanimal}','${treatment.noemploye}','${treatment.notypetraitement}');`;

    const res= await client.query(queryText);
    client.release();
    return res;
  }

  public async deleteTreatment(noTreatment:number):Promise<pg.QueryResult> {

    const client=await this.pool.connect();
    const queryText:string=`DELETE FROM boutiqueDB.Traitement WHERE noexamen='${noTreatment}';`;
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

    const queryText=`UPDATE boutiqueDB.Facture SET ${toUpdateValues.join(", ")}
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
    let queryText = `SELECT * FROM boutiqueDB.Traitement WHERE noanimal=${noanimal};`;
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

  /*
  public async getAnimalNamesByNos(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query("SELECT noAnimal, nom FROM HOTELDB.Hotel;");
    client.release()
    return res;
  }
  */

 
}

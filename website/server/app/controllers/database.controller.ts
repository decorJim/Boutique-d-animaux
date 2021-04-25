import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Hotel } from "../../../common/tables/Hotel";
import { HotelPK } from "../../../common/tables/HotelPK";
import { Room } from "../../../common/tables/Room";
import { Guest } from "../../../common/tables/Guest";
import { Examen } from "../../../common/tables/Examen";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Animal } from "../../../common/tables/Animal";
import { Proprietaire } from "../../../common/tables/Proprietaire";
import { Facture } from "../../../common/tables/Facture";
import { Traitement } from "../../../common/tables/Traitement";


@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    // ======= HOTEL ROUTES =======
    // ex http://localhost:3000/database/hotel?hotelNb=3&name=LeGrandHotel&city=laval
    router.get("/hotels", (req: Request, res: Response, _: NextFunction) => {
      var hotelNb = req.params.hotelNb ? req.params.hotelNb : "";
      var hotelName = req.params.name ? req.params.name : "";
      var hotelCity = req.params.city ? req.params.city : "";

      this.databaseService
        .filterHotels(hotelNb, hotelName, hotelCity)
        .then((result: pg.QueryResult) => {
          const hotels: Hotel[] = result.rows.map((hotel: Hotel) => ({
            hotelnb: hotel.hotelnb,
            name: hotel.name,
            city: hotel.city,
          }));
          res.json(hotels);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });
/******************************************************************************************************* */
    // route to get animals 
    router.get("/animals", (req: Request, res: Response) => {
      var owner=req.params.noproprietaire;
      this.databaseService
        .filterAnimal(owner)
        .then((result: pg.QueryResult) => {
          const animals: Animal[] = result.rows.map((animal: Animal) => ({
            noanimal: animal.noanimal,
            nom: animal.nom,
            typeanimal:animal.typeanimal,
	          espece: animal.espece,
          	taille: animal.taille,
          	poid:animal.poid,
          	description:animal.description,
          	datedenaissance:animal.datedenaissance,
          	dateinscription:animal.dateinscription,
           	etat:animal.etat,
            noproprietaire: animal.noproprietaire,
          }));
          res.json(animals);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.post(
      "/animals/insert/",
      (req: Request, res: Response) => {
        const animal: Animal = {
          noanimal:req.body.noanimal,
	        nom:req.body.nom,
	        typeanimal:req.body.typeanimal,
	        espece:req.body.espece,
	        taille:req.body.taille,
	        poid:req.body.poid, 
	        description:req.body.description,
         	datedenaissance:req.body.datedenaissance,
        	dateinscription:req.body.dateinscription,
        	etat:req.body.etat,
        	noproprietaire:req.body.noproprietaire
        };

        this.databaseService
          .createAnimal(animal)
          .then((result:pg.QueryResult)=>{
            res.json(result.rowCount);
          })
          .catch((e:Error)=>{
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.post(
      "/animals/delete/:noAnimal",
      (req: Request, res: Response, _: NextFunction) => {
        const noAnimal: number = req.params.noAnimal as number;
        this.databaseService
          .deleteAnimal(noAnimal)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.put(
      "/animals/update",
      (req:Request,res:Response)=>{
         const animal={
           noanimal:req.body.noanimal,
           nom:req.body.nom,
           typeanimal:req.body.typeanimal,
           espece:req.body.espece,
	         taille:req.body.taille,
           poid:req.body.poid,
	         description:req.body.description,
	         datedenaissance:req.body.datedenaissance,
	         dateinscription:req.body.dateinscription,
	         etat:req.body.etat,
        	 noproprietaire:req.body.noproprietaire,
         }
         this.databaseService
         .updateAnimal(animal)
         .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
         })
         .catch((e: Error) => {
          console.error(e.stack);
          res.json(-1);
         });
      }
    );

    router.get("/animals/selected/:ownerNo", (req: Request, res: Response) => {
      this.databaseService
      .selectedAnimalsOwner(req.params.ownerNo)
      .then((result: pg.QueryResult) => {
        const animals: Animal[] = result.rows.map((animal:Animal) => ({
          noanimal:animal.noanimal,
          nom:animal.nom,
          typeanimal:animal.typeanimal,
          espece:animal.espece,
          taille:animal.taille,
          poid:animal.poid,
          description:animal.description,
          datedenaissance:animal.datedenaissance,
          dateinscription:animal.dateinscription,
          etat:animal.etat,
          noproprietaire:animal.noproprietaire,
        }));
        res.json(animals);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
    });
    

    // routes to get owners
    router.get("/proprietaires", (req: Request, res: Response) => {
            this.databaseService
            .filterOwner()
            .then((result: pg.QueryResult) => {
              const owners: Proprietaire[] = result.rows.map((owner:Proprietaire) => ({
                noproprietaire: owner.noproprietaire,
                nom: owner.nom,
                adresse:owner.adresse,
                notelephone: owner.notelephone,
                noclinique: owner.noclinique,
              }));
              res.json(owners);
            })
            .catch((e: Error) => {
              console.error(e.stack);
            });
    });

    router.post(
      "/proprietaires/insert/",
      (req: Request, res: Response) => {
        const owner: Proprietaire = {
          noproprietaire:req.body.noproprietaire,
          nom:req.body.nom,
          adresse:req.body.adresse,
          notelephone:req.body.notelephone,
          noclinique:req.body.noclinique,
        };

        this.databaseService
          .createOwner(owner)
          .then((result:pg.QueryResult)=>{
            res.json(result.rowCount);
          })
          .catch((e:Error)=>{
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.post(
      "/proprietaires/delete/:noOwner",
      (req: Request, res: Response, _: NextFunction) => {
        console.log(req.params.noOwner);
        const noOwner: number = req.params.noOwner as number;
        this.databaseService
          .deleteOwner(noOwner)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


  // routes to get bills
  router.get("/factures", (req: Request, res: Response) => {
    this.databaseService
    .filterBill()
    .then((result: pg.QueryResult) => {
      const bills: Facture[] = result.rows.map((bill:Facture) => ({
        noproprietaire:bill.noproprietaire,
      	noanimal:bill.noanimal,
      	noemploye:bill.noemploye,
	      datefacture:bill.datefacture, 
      	total:bill.total,
      	paye:bill.paye, 
	      typedepaiement:bill.typedepaiement,
      }));
      res.json(bills);
    })
    .catch((e: Error) => {
      console.error(e.stack);
    });
});

router.post(
  "/factures/insert/",
  (req: Request, res: Response) => {
    const bill: Facture = {
      noproprietaire:req.body.noproprietaire,
      noanimal:req.body.noanimal,
      noemploye:req.body.noemploye,
      datefacture:req.body.datefacture,
      total:req.body.total,
      paye:req.body.paye,
      typedepaiement:req.body.typedepaiement,
    };

    this.databaseService
      .createBill(bill)
      .then((result:pg.QueryResult)=>{
        res.json(result.rowCount);
      })
      .catch((e:Error)=>{
        console.log(e);
        console.error(e.stack);
        res.json(-1);
      });
  }
);

router.post(
  "/factures/delete/",
  (req: Request, res: Response, _: NextFunction) => {
    const noOwner: number = req.body.noOwner as number;
    const noAnimal: number = req.body.noAnimal as number;
    const noEmploye: number = req.body.noEmploye as number;
    this.databaseService
      .deleteBill(noOwner,noAnimal,noEmploye)
      .then((result: pg.QueryResult) => {
        res.json(result.rowCount);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
  }
);

router.put(
  "/factures/update",
  (req:Request,res:Response)=>{
     const facture={
      noproprietaire:req.body.noproprietaire,
      noanimal:req.body.noanimal,
      noemploye:req.body.noemploye,
      datefacture:req.body.datefacture,
      total:req.body.total as number,
      paye:req.body.paye,
      typedepaiement:req.body.typedepaiement,
     }
     this.databaseService
     .updateBill(facture)
     .then((result: pg.QueryResult) => {
      res.json(result.rowCount);
     })
     .catch((e: Error) => {
      console.error(e.stack);
      res.json(-1);
     });
  }
);

router.get("/factures/selected/:ownerNo", (req: Request, res: Response) => {
  this.databaseService
  .selectedBillOwner(req.params.ownerNo)
  .then((result: pg.QueryResult) => {
    const bills: Facture[] = result.rows.map((bill:Facture) => ({
      noproprietaire:bill.noproprietaire,
      noanimal:bill.noanimal,
      noemploye:bill.noemploye,
      datefacture:bill.datefacture, 
      total:bill.total,
      paye:bill.paye, 
      typedepaiement:bill.typedepaiement,
    }));
    res.json(bills);
  })
  .catch((e: Error) => {
    console.error(e.stack);
  });
});

router.get("/examens", (req: Request, res: Response) => {
  this.databaseService
  .filterTreatment()
  .then((result: pg.QueryResult) => {
    const examens: Examen[] = result.rows.map((examen:Examen) => ({
      noexamen:examen.noexamen, 
	    dateexamen:examen.dateexamen,
	    heure:examen.heure,
	    nomveterinaire:examen.nomveterinaire, 
	    description:examen.description,
	    noanimal:examen.noanimal,
    }));
    res.json(examens);
  })
  .catch((e: Error) => {
    console.error(e.stack);
  });
});


/************************ traitement *****************/
router.get("/traitements", (req: Request, res: Response) => {
  this.databaseService
  .filterTreatment()
  .then((result: pg.QueryResult) => {
    const treatments: Traitement[] = result.rows.map((treatment:Traitement) => ({
      noexamen:treatment.noexamen,
      dateexamen:treatment.dateexamen,
      quantite:treatment.quantite,
      datedebut:treatment.datedebut,
      datefin:treatment.datefin,
      noproprietaire:treatment.noproprietaire,
      noanimal:treatment.noanimal,
      noemploye:treatment.noemploye,
      notypetraitement:treatment.notypetraitement
    }));
    res.json(treatments);
  })
  .catch((e: Error) => {
    console.error(e.stack);
  });
});

router.post(
  "/traitements/insert/",
  (req: Request, res: Response) => {
    const treatment: Traitement = {
      noexamen:req.body.noexamen,
      dateexamen:req.body.dateexamen,
      quantite:req.body.quantite,
      datedebut:req.body.datedebut,
      datefin:req.body.datefin,
    	noproprietaire:req.body.noproprietaire,
	    noanimal:req.body.noanimal,
	    noemploye:req.body.noemploye,
      notypetraitement:req.body.notypetraitement, 
    };

    this.databaseService
      .createTreatment(treatment)
      .then((result:pg.QueryResult)=>{
        res.json(result.rowCount);
      })
      .catch((e:Error)=>{
        console.log(e);
        console.error(e.stack);
        res.json(-1);
      });
  }
);

router.post(
  '/traitements/delete/:noTraitement',
  (req:Request,res:Response)=>{
    const noTreatment: number = req.params.noTraitement as number;
    this.databaseService
      .deleteTreatment(noTreatment)
      .then((result: pg.QueryResult) => {
        res.json(result.rowCount);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
  }
);

router.put(
  "/traitements/update",
  (req: Request, res: Response, _: NextFunction) => {
    const treatment: Traitement = {
      noexamen:req.body.noexamen,
      dateexamen:req.body.dateexamen,
      quantite:req.body.quantite,
      datedebut:req.body.datedebut,
      datefin:req.body.datefin,
      noproprietaire:req.body.noproprietaire,
      noanimal:req.body.noanimal,
      noemploye:req.body.noemploye,
      notypetraitement:req.body.notypetraitement 
    };

    this.databaseService
      .updateTreatment(treatment)
      .then((result: pg.QueryResult) => {
        res.json(result.rowCount);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
  }
);

router.get("/traitements/selected/:noanimal", (req: Request, res: Response) => {
  this.databaseService
  .selectedTreatmentsAnimal(req.params.noanimal)
  .then((result: pg.QueryResult) => {
    const treatments: Traitement[] = result.rows.map((treatment:Traitement) => ({
      noexamen:treatment.noexamen,
      dateexamen:treatment.dateexamen,
      quantite:treatment.quantite,
      datedebut:treatment.datedebut,
      datefin:treatment.datefin,
      noproprietaire:treatment.noproprietaire,
      noanimal:treatment.noanimal,
      noemploye:treatment.noemploye,
      notypetraitement:treatment.notypetraitement 
    }));
    console.log(treatments);
    res.json(treatments);
  })
  .catch((e: Error) => {
    console.error(e.stack);
  });
});




/************************************************************************ */
    router.get(
      "/hotels/hotelNb",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getHotelNamesByNos()
          .then((result: pg.QueryResult) => {
            const hotelsNbsNames = result.rows.map((hotel: HotelPK) => ({
              hotelnb: hotel.hotelnb,
              name: hotel.name,
            }));
            res.json(hotelsNbsNames);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );



    // ======= ROOMS ROUTES =======
    router.get("/rooms", (req: Request, res: Response, _: NextFunction) => {
      const hotelNb = req.query.hotelNb ? req.query.hotelNb : "";
      const roomNb = req.query.roomNb ? req.query.roomNb : "";
      const roomType = req.query.type ? req.query.type : "";
      const roomPrice = req.query.price ? parseFloat(req.query.price) : -1;

      this.databaseService
        .filterRooms(hotelNb, roomNb, roomType, roomPrice)
        .then((result: pg.QueryResult) => {
          const rooms: Room[] = result.rows.map((room: Room) => ({
            hotelnb: room.hotelnb,
            roomnb: room.roomnb,
            type: room.type,
            price: parseFloat(room.price.toString()),
          }));

          res.json(rooms);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });


    // ======= GUEST ROUTES =======
    
    router.get(
      "/guests/:hotelNb/:roomNb",
      (req: Request, res: Response, _: NextFunction) => {
        const hotelNb: string = req.params.hotelNb;
        const roomNb: string = req.params.roomNb;

        this.databaseService
        .getGuests(hotelNb, roomNb)
        .then((result: pg.QueryResult) => {
          const guests: Guest[] = result.rows.map((guest: any) => ({
            guestnb: guest.guestnb,
            nas: guest.nas,
            name: guest.name,
            gender: guest.gender,
            city: guest.city,
          }));
          res.json(guests);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.json(-1);
        });
      }
    );


    // ======= GENERAL ROUTES =======
    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}

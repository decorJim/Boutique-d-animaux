export interface Facture {
	noproprietaire:number; 
	noanimal:number;
	noemploye:number; 
	datefacture:Date; 
	total:number;
	paye:Boolean; 
	typedepaiement:string;
}
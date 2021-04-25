SET search_path=VetoSansFrontieresDB;

CREATE SCHEMA IF NOT EXISTS VetoSansFrontieresDB;

CREATE TABLE IF NOT EXISTS CliniqueVeterinaire(
  noClinique NUMERIC NOT NULL, 
  nom VARCHAR(20) NOT NULL,
  rue VARCHAR(20) NOT NULL, 
  ville VARCHAR(20) NOT NULL, 
  province VARCHAR(20) NOT NULL, 
  codePostal VARCHAR(20) NOT NULL,
  noTelephone NUMERIC NOT NULL, 
  noTelecopieur NUMERIC NOT NULL, 
  PRIMARY KEY(noClinique)
);

CREATE TABLE IF NOT EXISTS Employe(
  noEmploye NUMERIC NOT NULL,
  age NUMERIC NOT NULL,
  nom VARCHAR(20) NOT NULL, 
  prenom VARCHAR(20) NOT NULL, 
  adresse VARCHAR(20) NOT NULL, 
  noTelephone NUMERIC NOT NULL, 
  dateDeNaissance DATE NOT NULL, 
  sexe CHAR(1) NOT NULL, 
  NAS NUMERIC NOT NULL , 
  fonction VARCHAR(20) NOT NULL, 
  salaire NUMERIC NOT NULL, 
  noClinique NUMERIC NOT NULL,
  PRIMARY KEY(noEmploye),
  FOREIGN KEY(noClinique) REFERENCES CliniqueVeterinaire(noClinique)
);

CREATE TABLE IF NOT EXISTS Proprietaire(
    noProprietaire NUMERIC NOT NULL, 
	nom VARCHAR(20) NOT NULL,
	adresse VARCHAR(20) NOT NULL, 
	noTelephone NUMERIC NOT NULL, 
	noClinique NUMERIC NOT NULL,
	PRIMARY KEY(noProprietaire),
	FOREIGN KEY(noClinique) REFERENCES CliniqueVeterinaire(noClinique)
);

CREATE TABLE IF NOT EXISTS Animal(
    noAnimal NUMERIC NOT NULL, 
	nom VARCHAR(20) NOT NULL, 
	typeAnimal VARCHAR(10) NOT NULL, 
	espece VARCHAR(20) NOT NULL, 
	taille NUMERIC NOT NULL, 
	poid NUMERIC NOT NULL, 
	description VARCHAR(20) NOT NULL, 
	dateDeNaissance DATE NOT NULL, 
	dateInscription DATE NOT NULL, 
	etat VARCHAR(10) NOT NULL, 
	noProprietaire NUMERIC NOT NULL,
	PRIMARY KEY(noAnimal),
	FOREIGN KEY(noProprietaire) REFERENCES Proprietaire(noProprietaire)
);

CREATE TABLE IF NOT EXISTS Examen(
    noExamen NUMERIC NOT NULL, 
	dateExamen DATE NOT NULL, 
	heure TIME NOT NULL, 
	nomVeterinaire VARCHAR(20) NOT NULL, 
	description VARCHAR(20) NOT NULL,
	noAnimal NUMERIC NOT NULL,
	PRIMARY KEY(noExamen),
	FOREIGN KEY(noAnimal) REFERENCES Animal(noAnimal) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TypeTraitement(
   noTypeTraitement NUMERIC NOT NULL,
   description VARCHAR(30) NOT NULL,
   cout NUMERIC NOT NULL,
   PRIMARY KEY(noTypeTraitement)
);

CREATE TABLE IF NOT EXISTS Traitement(
    noExamen NUMERIC NOT NULL, 
    dateExamen DATE NOT NULL,
    quantite NUMERIC,
    dateDebut DATE NOT NULL, 
    dateFin DATE NOT NULL,
	noProprietaire NUMERIC NOT NULL,
	noAnimal NUMERIC NOT NULL,
	noEmploye NUMERIC NOT NULL,
    noTypeTraitement NUMERIC NOT NULL, 
	PRIMARY KEY(noExamen),
	FOREIGN KEY(noExamen) REFERENCES Examen(noExamen),
	FOREIGN KEY(noProprietaire) REFERENCES Proprietaire(noProprietaire),
	FOREIGN KEY(noAnimal) REFERENCES Animal(noAnimal) ON DELETE CASCADE,
	FOREIGN KEY(noEmploye) REFERENCES Employe(noEmploye) ON DELETE CASCADE,
	FOREIGN KEY(noTypeTraitement) REFERENCES TypeTraitement(noTypeTraitement)
);

CREATE TABLE IF NOT EXISTS ComposeTraitement(
    noExamen NUMERIC NOT NULL,
	noTypeTraitement NUMERIC NOT NULL,
	quantite NUMERIC NOT NULL,
	PRIMARY KEY(noExamen,noTypeTraitement),
	FOREIGN KEY(noExamen) REFERENCES Traitement(noExamen) ON DELETE CASCADE,
	FOREIGN KEY(noTypeTraitement) REFERENCES TypeTraitement(noTypeTraitement)
);

CREATE TABLE IF NOT EXISTS Facture(
	noProprietaire NUMERIC NOT NULL, 
	noAnimal NUMERIC NOT NULL, 
	noEmploye NUMERIC NOT NULL, 
	dateFacture DATE, 
	total NUMERIC NOT NULL,
	paye BIT NOT NULL, 
	typeDePaiement VARCHAR(20),
	PRIMARY KEY(noProprietaire,noAnimal,noEmploye),
	FOREIGN KEY(noProprietaire) REFERENCES Proprietaire(noProprietaire),
	FOREIGN KEY(noAnimal) REFERENCES Animal(noAnimal) ON DELETE CASCADE,
	FOREIGN KEY(noEmploye) REFERENCES Employe(noEmploye) ON DELETE CASCADE
);





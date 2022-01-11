SET search_path=boutiqueDB;

INSERT INTO CliniqueVeterinaire VALUES(1,'Clinique1','street1','villeA','provincea','HS19J9',5128394998,512839499);
INSERT INTO CliniqueVeterinaire VALUES(2,'Clinique2','street2','villeB','provinceb','HUH8D6',5160928309,5160928310);
INSERT INTO CliniqueVeterinaire VALUES(3,'Clinique3','street3','villeC','provincec','H8S9OS',5129804092,5129804093);

SELECT * FROM CliniqueVeterinaire;

INSERT INTO Employe VALUES(1,28,'Tremblay','Jean','street 5 409',5176827363,'2017-09-13','M',239804,'Veterinaire',100000,1);
INSERT INTO Employe VALUES(2,46,'pois','qwoik','street 7 390',5120984303,'2017-03-14','M',233876,'Veterinaire',100000,2);
INSERT INTO Employe VALUES(3,39,'dopj','lojsk','street 2 398',5167209383,'2017-02-14','F',203983,'Gestionnaire',100000,3);
INSERT INTO Employe VALUES(4,56,'pod','jok','street 4 368',5172983793,'2017-04-19','M',239402,'Gestionnaire',150000,1);
INSERT INTO Employe VALUES(5,26,'uios','kiol','street 5 302',5140948522,'2017-01-27','F',209381,'Gestionnaire',150000,2);


SELECT * FROM Employe; 

INSERT INTO Proprietaire VALUES(1,'blayinf', 'street 3 498',5162983743,1);
INSERT INTO Proprietaire VALUES(2,'huiblay', 'street 5 309',5120983554,2);
INSERT INTO Proprietaire VALUES(3,'jom', 'street 4 490',5168398473,1);
INSERT INTO Proprietaire VALUES(4,'lsookd', 'street 9 798',5329803436,3);

SELECT * FROM Proprietaire;


INSERT INTO Animal VALUES(1,'jakob','chat','besooin dore',20,17,'il est gros','2015-09-13','2019-02-01','vivant',1);
INSERT INTO Animal VALUES(2,'pojas','chien','erectus homs',24,19,'il est agressif','2016-07-18','2019-02-02','vivant',1);
INSERT INTO Animal VALUES(3,'jou','chat','bison fov',27,16,'il est amical','2015-08-05','2019-02-1','vivant',2);
INSERT INTO Animal VALUES(4,'moik','chien','nimo jiji',22,20,'il est maigre','2017-07-26','2018-08-19','mort',3);
INSERT INTO Animal VALUES(5,'uoijd','chien','besooin dore',19,14,'il est minuscule','2016-08-05','2018-09-10','vivant',4);
INSERT INTO Animal VALUES(6,'jakob','chien','besooin dore',19,14,'il est rapide','2016-08-12','2018-09-10','vivant',4);

SELECT * FROM Animal;
INSERT INTO Examen VALUES(1,'2020-08-24','14:00','Jean Tremblay','a des fractures',1);
INSERT INTO Examen VALUES(2,'2020-08-25','14:50','Jean Tremblay','a des boutons',1);
INSERT INTO Examen VALUES(3,'2020-10-24','15:00','qwoik pois','a la gripe',2);
INSERT INTO Examen VALUES(4,'2020-09-13','14:00','qwoik pois','inflammation',3);
INSERT INTO Examen VALUES(5,'2020-08-24','14:17','lojsk dopj','a gonorea',5);
INSERT INTO Examen VALUES(6,'2020-12-27','15:39','lojsk dopj','a des fractures',5);

SELECT * FROM Examen;

INSERT INTO TypeTraitement VALUES(110,'Traitement à la Pénicilline',50);
INSERT INTO TypeTraitement VALUES(112,'Vaccination contre la grippe',70);
INSERT INTO TypeTraitement VALUES(123,'creme proactive',73);
INSERT INTO TypeTraitement VALUES(176,'Traitement platre',30);

SELECT * FROM TypeTraitement;

INSERT INTO Traitement VALUES(1,'2020-08-24',125,'2020-08-27','2022-04-03',1,1,1,176);
INSERT INTO Traitement VALUES(2,'2020-08-25',null,'2020-08-25','2020-08-25',1,1,1,123);
INSERT INTO Traitement VALUES(3,'2020-10-24',110,'2020-10-25','2020-10-25',1,2,2,112);
INSERT INTO Traitement VALUES(4,'2020-09-13',125,'2020-09-13','2020-09-15',2,3,2,176);
INSERT INTO Traitement VALUES(5,'2020-08-24',125,'2020-08-27','2022-04-03',4,5,3,110);

SELECT * FROM Traitement;

INSERT INTO ComposeTraitement VALUES(1,176,1);
INSERT INTO ComposeTraitement VALUES(2,123,1);
INSERT INTO ComposeTraitement VALUES(3,112,1);
INSERT INTO ComposeTraitement VALUES(4,176,1);
INSERT INTO ComposeTraitement VALUES(5,110,1);

SELECT * FROM ComposeTraitement;

INSERT INTO Facture VALUES(1,1,1,'2022-04-03',103,'1','Carte credit');
INSERT INTO Facture VALUES(1,2,2,'2020-10-25',70,'1','Carte credit');
INSERT INTO Facture VALUES(2,3,2,'2020-09-15',30,'0',null);
INSERT INTO Facture VALUES(4,5,3,'2022-04-03',50,'1','Comptant');

SELECT * FROM Facture;

--DELETE FROM Animal WHERE noAnimal=5;
--SELECT * FROM His;


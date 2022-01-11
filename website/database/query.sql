SET search_path=boutiqueDB;

/* Lister les le numéro et nom des cliniques, leur adresse et leur gestionnaire, ordonnés par le 
numéro de clinique */
SELECT DISTINCT c.noClinique,c.rue,c.ville,c.province,c.codePostal,e.noEmploye FROM CliniqueVeterinaire c INNER JOIN Employe e
ON e.noClinique=c.noClinique WHERE e.fonction='Gestionnaire' ORDER BY c.noClinique ASC;

/* Quels sont les noms des employés de plus de 40 ans ordonnés par nom ? */
SELECT e.nom FROM Employe e WHERE e.age>40 ORDER BY e.nom;

/* Lister les noms des animaux dans toutes les cliniques ainsi que le nombre de fois où ils 
apparaissent. Par exemple Charlie, 3 */
SELECT DISTINCT a1.nom, COUNT(a1.nom) AS frequency FROM 
Animal a1 INNER JOIN Proprietaire p1 
ON (a1.noProprietaire=p1.noProprietaire) INNER JOIN CliniqueVeterinaire c1 
ON (p1.noClinique=c1.noClinique) GROUP BY a1.nom; 

/* Lister les numéros et noms des propriétaires d’animaux ainsi que les détails de leurs animaux 
dans une clinique donnée (à vous de la choisir) on a choisi la clinique avec id 1 */
SELECT DISTINCT p.noProprietaire,p.nom,a.* FROM Proprietaire p 
INNER JOIN Animal a ON (a.noProprietaire=p.noProprietaire)
INNER JOIN CliniqueVeterinaire c ON (p.noClinique=1);

/* Lister l’ensemble des examens d’un animal donné en utilisant sa clé primaire */
/* on choisi animal avec noAnimal=1 */
SELECT DISTINCT * FROM Examen e WHERE e.noAnimal=1;

/* Lister le détail des traitements d’un animal suite à un examen donné */
SELECT DISTINCT t.* FROM Traitement t INNER JOIN Animal a ON (t.noAnimal=a.noAnimal);

/* Lister le salaire total des employés par clinique ordonné par numéro de clinique */
SELECT SUM(e.salaire) FROM Employe e INNER JOIN CliniqueVeterinaire c ON (e.noClinique=c.noClinique) 
GROUP BY c.noClinique ORDER BY c.noClinique;

/* Lister le nombre total d’animaux par type dans chaque clinique. Par exemple : C1, chat, 40. */
SELECT DISTINCT c.noClinique, a.typeAnimal,COUNT(a.typeAnimal) FROM Animal a INNER JOIN Proprietaire p 
ON(a.noProprietaire=p.noProprietaire) INNER JOIN CliniqueVeterinaire c ON (p.noClinique=c.noClinique)
GROUP BY c.noClinique,a.typeAnimal;

/* Lister le coût minimum, maximum et moyen des traitements */
SELECT DISTINCT MIN(ct.quantite*t1.cout),MAX(ct.quantite*t1.cout),AVG(ct.quantite*t1.cout) FROM Traitement t 
INNER JOIN ComposeTraitement ct ON (t.noExamen=ct.noExamen) 
INNER JOIN TypeTraitement t1 ON (ct.noTypeTraitement=t1.noTypeTraitement);


/* Quels sont les propriétaires dont le nom contient « blay » ?  done */
SELECT p.* FROM Proprietaire p WHERE p.nom LIKE '%blay%';

/*  Supprimez le vétérinaire « Jean Tremblay » qui travaille dans la clinique dont 
l’identificateur est C01. */
DELETE FROM Employe WHERE nom='Tremblay' AND prenom='Jean' AND noEmploye=1;

/* Lister les détails des propriétaires qui ont un chat et un chien */
SELECT DISTINCT p.* FROM Proprietaire p INNER JOIN Animal a1 ON
(p.noProprietaire=a1.noProprietaire)
WHERE p.noProprietaire=
(SELECT   a.noProprietaire
FROM     Animal a
WHERE    a.typeAnimal IN ('chien', 'chat')
GROUP BY a.noProprietaire
HAVING  COUNT(DISTINCT a.typeAnimal) > 1);

/* Lister les détails des propriétaires qui ont un chat ou un chien done !*/
SELECT DISTINCT p.* FROM Proprietaire p INNER JOIN Animal a ON (p.noProprietaire=a.noProprietaire) WHERE a.typeAnimal='chat' OR
a.typeAnimal='chien';

/* Lister les détails des propriétaires qui ont un chat mais pas de chien vacciné contre la grippe 
(la condition vacciné contre la grippe ne s’applique qu’aux chiens)  */
SELECT p.* FROM Proprietaire p WHERE 
p.noProprietaire IN (SELECT a.noProprietaire FROM Animal a WHERE a.typeAnimal='chat' GROUP BY a.noProprietaire HAVING COUNT(DISTINCT a.typeAnimal)=1)
AND
p.noProprietaire IN (SELECT a.noProprietaire FROM Animal a WHERE a.noAnimal IN (
SELECT t.noAnimal FROM Traitement t INNER JOIN ComposeTraitement ct
ON (t.noExamen=ct.noExamen) INNER JOIN TypeTraitement t1 ON
(ct.noTypeTraitement=t1.noTypeTraitement) 
WHERE NOT t1.description='Vaccination contre la grippe'));

/* Lister tous les animaux d’une clinique donnée avec leurs traitements s’ils existent. Dans le 
cas contraire, affichez null. */
SELECT * FROM Animal a LEFT OUTER JOIN Traitement t ON (a.noAnimal=t.noAnimal) WHERE a.noProprietaire IN
(SELECT p.noProprietaire FROM Proprietaire p WHERE p.noClinique=1);





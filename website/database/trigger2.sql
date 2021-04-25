set search_path = VetoSansFrontieresDB;
CREATE TABLE IF NOT EXISTS His(				noExamen NUMERIC NOT NULL, 
											dateExamen DATE NOT NULL, 
											heure TIME NOT NULL, 
											nomVeterinaire VARCHAR(20) NOT NULL, 
											description VARCHAR(20) NOT NULL,
											noAnimal NUMERIC NOT NULL,
									   		desTraitement VARCHAR(30) NOT NULL
									   );
	
	
CREATE OR REPLACE FUNCTION history() RETURNS trigger AS $$
	BEGIN
	 
        INSERT INTO His SELECT e.*,t.description
        FROM Examen e,TypeTraitement t
        WHERE   old.noAnimal = e.noAnimal ;
        return old;
	END;
	$$
	LANGUAGE plpgsql;
	
	
	CREATE TRIGGER Hist
	BEFORE DELETE ON Animal 
	FOR EACH ROW 
	EXECUTE FUNCTION history();   

	
	
	
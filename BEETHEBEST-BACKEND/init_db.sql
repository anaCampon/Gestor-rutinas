
CREATE DATABASE IF NOT EXISTS routines_manager;
USE routines_manager;


CREATE TABLE `routine` (
   `idRoutine` int NOT NULL AUTO_INCREMENT,
   `name` varchar(45) DEFAULT NULL,
   `week` date DEFAULT NULL,
   `Users_id` int NOT NULL,
   PRIMARY KEY (`idRoutine`,`Users_id`),
   KEY `fk_Rutina_Users_idx` (`Users_id`),
   CONSTRAINT `fk_Rutina_Users` FOREIGN KEY (`Users_id`) REFERENCES `users` (`idUsers`)
 ) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3


 CREATE TABLE `tasks` (
   `id_tasks` int NOT NULL AUTO_INCREMENT,
   `task` varchar(100) DEFAULT NULL,
   `weekDay` enum('lunes','martes','miércoles','jueves','viernes','sábado','domingo') DEFAULT NULL,
   `initTime` time DEFAULT NULL,
   `endTime` time DEFAULT NULL,
   `Description` mediumtext,
   `Routine_id` int NOT NULL,
   PRIMARY KEY (`id_tasks`,`Routine_id`),
   KEY `fk_Actividades_Rutina1_idx` (`Routine_id`),
   CONSTRAINT `fk_Actividades_Rutina1` FOREIGN KEY (`Routine_id`) REFERENCES `routine` (`idRoutine`)
 ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3

 CREATE TABLE `users` (
   `idUsers` int NOT NULL AUTO_INCREMENT,
   `username` varchar(45) NOT NULL,
   `email` varchar(100) NOT NULL,
   `password` varchar(250) NOT NULL,
   `interests` text,
   `weekly_goals` text,
   `weekly_availability` text,
   PRIMARY KEY (`idUsers`),
   UNIQUE KEY `email_UNIQUE` (`email`),
   UNIQUE KEY `username_UNIQUE` (`username`)
 ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3
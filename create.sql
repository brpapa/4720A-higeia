-- SGBD: MySQL

-- *** TABELAS *** --

DROP TABLE IF EXISTS `health_quote`;
DROP TABLE IF EXISTS `prescription`;
DROP TABLE IF EXISTS `medicine`;
DROP TABLE IF EXISTS `appointment`;
DROP TABLE IF EXISTS `doctor_week_opening_hour`;
DROP TABLE IF EXISTS `doctor`;
DROP TABLE IF EXISTS `doctor_medical_care_location`;
DROP TABLE IF EXISTS `doctor_specialization`;
DROP TABLE IF EXISTS `patient`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uf` ENUM('RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF') NOT NULL,
	`city` VARCHAR(255) NOT NULL,
	`street` VARCHAR(255) NOT NULL,
	`number` INT NOT NULL,

	PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
  `id` VARCHAR(255) NOT NULL COMMENT 'Username, defined by the user',
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `gender` ENUM('M', 'F') NOT NULL,
  `dob` DATE NOT NULL,
  `email` VARCHAR(255),
  `phone` VARCHAR(255),

  PRIMARY KEY (`id`)
);

CREATE TABLE `patient` (
  `id` VARCHAR(255) NOT NULL,
  `address_id` INT NOT NULL,
	`blood_type` ENUM('O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+'),

	PRIMARY KEY (`id`),
	FOREIGN KEY (`id`)
	  REFERENCES `user`(`id`)
	  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`address_id`)
    REFERENCES `address`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `doctor_specialization` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`specialty` VARCHAR(255) NOT NULL,
	`title` VARCHAR(255) NOT NULL,

	PRIMARY KEY (`id`)
);

CREATE TABLE `doctor_medical_care_location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL, 
  `type` ENUM('Medical Clinic', 'Medical Office', 'Medical Center') NOT NULL,
  `address_id` INT NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`address_id`)
    REFERENCES `address`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `doctor` (
  `id` VARCHAR(255) NOT NULL,
  `crm_number` INT NOT NULL,
	`specialization_id` INT NOT NULL,
	`medical_care_location_id` INT NOT NULL,
	`avg_rating` DOUBLE COMMENT 'Derived attribute, maintained with trigger',

	PRIMARY KEY (`id`),
	FOREIGN KEY (`id`)
	  REFERENCES `user`(`id`)
	  ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`specialization_id`)
	  REFERENCES `doctor_specialization`(`id`)
	  ON DELETE RESTRICT ON UPDATE RESTRICT,
	FOREIGN KEY (`medical_care_location_id`)
	  REFERENCES `doctor_medical_care_location`(`id`)
	  ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE `doctor_week_opening_hour` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `doctor_id` VARCHAR(255) NOT NULL,
  `weekday` ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
  `hour` TIME NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY (`doctor_id`, `weekday`, `hour`),
  FOREIGN KEY (`doctor_id`)
    REFERENCES `doctor`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `appointment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
	`doctor_id` VARCHAR(255) COMMENT 'If null, the doctor was deleted',
  `patient_id` VARCHAR(255) COMMENT 'If null, the patient was deleted',
	`status` ENUM('scheduled', 'cancelled', 'completed') NOT NULL,
	`doctor_diagnosis` VARCHAR(255) DEFAULT '',
	`doctor_notes` VARCHAR(255) DEFAULT '',
	`rating` DOUBLE CHECK (`rating` BETWEEN 1 AND 5) COMMENT 'If null, the appointment was not evaluated',

  PRIMARY KEY (`id`),
	UNIQUE KEY (`date`, `start_time`, `doctor_id`, `patient_id`),
	FOREIGN KEY (`doctor_id`)
	  REFERENCES `doctor`(`id`)
	  ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY (`patient_id`)
	  REFERENCES `patient`(`id`)
	  ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `medicine` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `concentration_in_mg` DOUBLE NOT NULL,
  `way_of_use` VARCHAR(255) NOT NULL,

	PRIMARY KEY (`id`),
  UNIQUE KEY (`name`, `concentration_in_mg`, `way_of_use`)
);

CREATE TABLE `prescription` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `appt_id` INT NOT NULL,
	`medicine_id` INT NOT NULL,

	`start_date` DATE NOT NULL,
	`expiration_date` DATE NOT NULL,
	`dose` INT NOT NULL,
	`dose_unit` ENUM('mg', 'ml', 'pill') NOT NULL,
	`frequency` INT NOT NULL,
	`frequency_per` ENUM('hour', 'day') NOT NULL,

	PRIMARY KEY (`id`),
  UNIQUE KEY (`appt_id`, `medicine_id`),
	FOREIGN KEY (`appt_id`)
	  REFERENCES `appointment`(`id`)
	  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`medicine_id`)
    REFERENCES `medicine`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `health_quote` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quote` VARCHAR(255),
  `author` VARCHAR(255),

  PRIMARY KEY (`id`),
  UNIQUE KEY (`quote`, `author`)
);

-- *** GATILHOS *** --

DROP PROCEDURE IF EXISTS `update_avg_rating`;
DROP TRIGGER IF EXISTS `control_avg_rating_of_doctor_after_insert`;
DROP TRIGGER IF EXISTS `control_avg_rating_of_doctor_after_delete`;
DROP TRIGGER IF EXISTS `control_avg_rating_of_doctor_after_update`;
DROP TRIGGER IF EXISTS `check_appointment_start_time`;
DROP TRIGGER IF EXISTS `check_doctor_disjoint`;
DROP TRIGGER IF EXISTS `check_patient_disjoint`;

-- necessário para a declaração de 'stored programs', como procedures e triggers
DELIMITER $$

-- recebe o id de um doutor e atualiza o seu novo avg_rating com base no rating de suas consultas que estão 'completed'
CREATE PROCEDURE `update_avg_rating`(IN `doctor_id` VARCHAR(255))
  BEGIN
    UPDATE `doctor`
    SET `doctor`.`avg_rating` = (
      SELECT
        AVG(`rating`) AS `avg_rating`
      FROM
        `appointment` AS `appt`
      WHERE
        `appt`.`rating` IS NOT NULL AND
        `appt`.`doctor_id` = `doctor_id` AND
        `appt`.`status` = 'completed'
      GROUP BY
        `appt`.`doctor_id`
    )
    WHERE `doctor`.`id` = `doctor_id`;
  END $$

-- atualiza o avg_rating do doutor, se for o caso
CREATE TRIGGER `control_avg_rating_of_doctor_after_insert`
  AFTER INSERT ON `appointment`
  FOR EACH ROW
  BEGIN
    IF NEW.`rating` IS NOT NULL THEN
      CALL `update_avg_rating`(NEW.`doctor_id`);
    END IF;
  END $$

CREATE TRIGGER `control_avg_rating_of_doctor_after_delete`
  AFTER DELETE ON `appointment`
  FOR EACH ROW
  BEGIN
    IF OLD.`rating` IS NOT NULL THEN
      CALL `update_avg_rating`(OLD.`doctor_id`);
    END IF;
  END $$

CREATE TRIGGER `control_avg_rating_of_doctor_after_update`
  AFTER UPDATE ON `appointment`
  FOR EACH ROW
  BEGIN
    IF (NEW.`rating` != OLD.`rating`) THEN
      CALL `update_avg_rating`(OLD.`doctor_id`);
      IF (NEW.`doctor_id` != OLD.`doctor_id`) THEN
        CALL `update_avg_rating`(NEW.`doctor_id`);
      END IF;
    END IF;
  END $$

-- evita a inserção de uma nova consulta em um horário que o doutor não atende
CREATE TRIGGER `check_appointment_start_time`
  BEFORE INSERT ON `appointment`
  FOR EACH ROW
  BEGIN
    SET @not_exists = NOT EXISTS (
      SELECT `hour`
      FROM `doctor_week_opening_hour` AS `woh`
      WHERE `woh`.`doctor_id`=NEW.`doctor_id` AND `woh`.`weekday`=DAYNAME(NEW.`date`)
    );
    IF @not_exists THEN
      SET @msg = CONCAT_WS(' ', 'The doctor', NEW.`doctor_id`, 'does not work at', NEW.`start_time`, 'on', DAYNAME(NEW.`date`));
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @msg;
    END IF;
  END $$
-- evita a inserção de um doutor com o id de um usuário que já é paciente
CREATE TRIGGER `check_doctor_disjoint`
  BEFORE INSERT ON `doctor`
  FOR EACH ROW
  BEGIN
    SET @exists = EXISTS (SELECT * FROM `patient` WHERE `id` = NEW.`id`);
    IF @exists THEN
      SET @msg = CONCAT_WS(' ', 'The user', NEW.`id`, 'is already a patient');
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @msg;
    END IF;
  END $$

-- evita a inserção de um paciente com o id de um usuário que já é doutor
CREATE TRIGGER `check_patient_disjoint`
  BEFORE INSERT ON `patient`
  FOR EACH ROW
  BEGIN
    SET @exists = EXISTS (SELECT * FROM `doctor` WHERE `id` = NEW.`id`);
    IF @exists THEN
      SET @msg = CONCAT_WS(' ', 'The user', NEW.`id`, 'is already a doctor');
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @msg;
    END IF;
  END $$

DELIMITER ;

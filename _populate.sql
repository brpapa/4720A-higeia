DELETE FROM `health_quote`;
DELETE FROM `prescription`;
DELETE FROM `medicine`;
DELETE FROM `appointment`;
DELETE FROM `doctor_week_opening_hour`;
DELETE FROM `doctor`;
DELETE FROM `doctor_medical_care_location`;
DELETE FROM `doctor_specialization`;
DELETE FROM `patient`;
DELETE FROM `user`;
DELETE FROM `address`;

-- insere endereços
INSERT INTO `address`(`uf`, `city`, `street`, `number`) VALUES
  ('SP','Botucatu','Amando de Barros',23),
  ('SP','Botucatu','Adolfo Lutz',10),
  ('SP','Bauru','Aviador Gomes Ribeiro',710),
  ('MG','Belo Horizonte','Santa Cecília',30),
  ('SP','Bauru','Siqueira Campos',123),
  ('SP','Botucatu','João Morato da Conceição',167),
  ('SP','Botucatu','Horácio Tadeu',1),
  ('SP','Botucatu','Mario Figueiredo',40),
  ('SP','Bauru','Siqueira Campos',90),
  ('SP','Botucatu','Manoel Fernandes Cardoso',23),
  ('SP','Botucatu','Dr. Damião Pinheiro Machado',121),
  ('SP','Botucatu','João Morato da Conceição',2);

-- insere usuários
INSERT INTO `user`(`id`, `password`, `first_name`, `last_name`, `gender`, `dob`, `email`, `phone`) VALUES
  ('joao','123','João','Ferreira','M','1997-01-01','jferreira@gmail.com','998737467'),
  ('maria','123','Maria','Silva','F','1980-04-01','masilva@gmail.com','992546675'),
  ('henrique','123','Henrique','Almeida','M','1960-06-01','henriquehal20@outlook.com','998549975'),
  ('vicente','123','Vicente','Martins','M','1973-08-15','vicentemt@hotmail.com','986524475'),
  ('elizabete','123','Elizabete','Costa','F','1980-04-22','liza.costa@outlook.com','996872254'),
  ('francisco','123','Francisco','Leite','M','1980-05-12','francisco.leite@higeia.com','995782256'),
  ('amanda','123','Amanda','Silveira','F','1987-11-25','amanda.silveira@higeia.com','996257730'),
  ('elisangela','123','Elisângela','Rodrigues','F','1990-08-20','elisangela.rodrigues@higeia.com','982458875'),
  ('mayara','123','Mayara','Silva','F','1980-04-22','mayara.silva@higeia.com','996872254'),
  ('bruno','123','Bruno','Papa','M','1990-02-25','bruno.papa@higeia.com','995475563'),
  ('thales','123','Thales','Henrique','M','1987-07-05','thales.henrique@higeia.com','996542257'),
  ('fabio','123','Fabio','Bartoli','M','1980-11-05','fabio.bartoli@higeia.com','996528824');

-- insere pacientes
INSERT INTO `patient`(`id`, `address_id`, `blood_type`) VALUES
  ('fabio', 5, 'O+'),
  ('thales', 6, 'AB+'),
  ('joao', 7, 'O-'),
  ('amanda', 8, 'O+');

-- insere especializações de doutores
INSERT INTO `doctor_specialization`(`specialty`, `title`) VALUES 
  ('Clínica médica', 'Clínico geral'), 
  ('Pediatria', 'Pediatra'),
  ('Anestesiologia', 'Anestesiologista'),
  ('Ginecologia', 'Ginecologista'),
  ('Cardiologia', 'Cardiologista'),
  ('Ortopedia', 'Ortopedista'),
  ('Oftalmologia', 'Oftalmologista'),
  ('Psiquiatria', 'Psiquiatra');

-- insere locais de atendimento de doutores
INSERT INTO `doctor_medical_care_location`(`name`, `type`, `address_id`) VALUES
  ('Pró Vida', 'Medical Clinic', 2),
  ('Cuide-se', 'Medical Office', 4),
  ('Vida a todos', 'Medical Center', 5),
  ('Preserve-se', 'Medical Clinic', 6);

-- insere doutores
INSERT INTO `doctor`(`id`, `crm_number`, `specialization_id`, `medical_care_location_id`) VALUES
  ('bruno', 21313, 1, 1),
  ('vicente', 43133, 2, 2),
  ('francisco', 98932, 3, 3),
  ('maria', 54353, 4, 4);

-- insere horários de atendimento na semana dos doutores
INSERT INTO `doctor_week_opening_hour`(`doctor_id`, `weekday`, `hour`) VALUES
  ('bruno', 'Monday', '08:00'),
  ('bruno', 'Monday', '10:00'),
  ('bruno', 'Monday', '14:00'),
  ('bruno', 'Monday', '16:00'),
  ('bruno', 'Tuesday', '08:00'),
  ('bruno', 'Tuesday', '10:00'),
  ('bruno', 'Tuesday', '14:00'),
  ('bruno', 'Tuesday', '16:00'),
  ('bruno', 'Wednesday', '08:00'),
  ('bruno', 'Wednesday', '10:00'),
  ('bruno', 'Wednesday', '14:00'),
  ('bruno', 'Wednesday', '16:00'),
  ('bruno', 'Thursday', '08:00'),
  ('bruno', 'Thursday', '10:00'),
  ('bruno', 'Thursday', '14:00'),
  ('bruno', 'Thursday', '16:00'),
  ('bruno', 'Friday', '08:00'),
  ('bruno', 'Friday', '10:00'),
  ('bruno', 'Friday', '14:00'),
  ('bruno', 'Friday', '16:00'),
  ('vicente', 'Monday', '08:00'),
  ('vicente', 'Monday', '10:00'),
  ('vicente', 'Tuesday', '08:00'),
  ('vicente', 'Tuesday', '10:00'),
  ('vicente', 'Wednesday', '08:00'),
  ('vicente', 'Wednesday', '10:00'),
  ('vicente', 'Thursday', '08:00'),
  ('vicente', 'Thursday', '10:00'),
  ('vicente', 'Friday', '08:00'),
  ('vicente', 'Friday', '10:00'),
  ('maria', 'Monday', '16:00'),
  ('maria', 'Monday', '18:00'),
  ('maria', 'Tuesday', '16:00'),
  ('maria', 'Tuesday', '18:00'),
  ('maria', 'Wednesday', '16:00'),
  ('maria', 'Wednesday', '18:00'),
  ('maria', 'Thursday', '16:00'),
  ('maria', 'Thursday', '18:00'),
  ('maria', 'Friday', '16:00'),
  ('maria', 'Friday', '18:00');

-- insere consultas já realizadas
INSERT INTO `appointment`(`date`, `start_time`, `doctor_id`, `patient_id`, `status`, `doctor_diagnosis`, `doctor_notes`, `rating`) VALUES
  ('2020-06-30', '08:00', 'vicente', 'joao', 'completed', '', '', 4),
  ('2020-06-30', '10:00', 'vicente', 'amanda', 'completed', '', '', 2),
  ('2020-06-29', '16:00', 'maria', 'thales', 'completed', '', '', 4),
  ('2020-07-01', '08:00', 'bruno', 'joao', 'completed', '', '', 2),
  ('2020-07-01', '10:00', 'bruno', 'fabio', 'completed', '', '', 3),
  ('2020-07-01', '14:00', 'bruno', 'thales', 'completed', '', '', 5);

-- insere futuras consultas
INSERT INTO `appointment`(`date`, `start_time`, `doctor_id`, `patient_id`, `status`) VALUES
  ('2020-07-27', '08:00', 'bruno', 'fabio', 'scheduled'),
  ('2020-07-28', '10:00', 'bruno', 'fabio', 'scheduled'),
  ('2020-07-29', '14:00', 'bruno', 'fabio', 'scheduled'),
  ('2020-07-30', '16:00', 'bruno', 'fabio', 'cancelled');
  
-- insere medicamentos
INSERT INTO `medicine`(`name`, `concentration_in_mg`, `way_of_use`) VALUES
  ('Cloroquina', 150, 'pill'),
  ('Codeína', 30, 'pill'),
  ('Lamotrigina', 50, 'pill'),
  ('Metadona', 5, 'pill'),
  ('Pramipexol', 0.25, 'pill');

-- insere prescrições
-- INSERT INTO `prescription`() VALUES ();

-- insere citações
INSERT INTO `health_quote`(`quote`, `author`) VALUES
  ('It is health that is the real wealth, and not pieces of gold and silver.', 'Mahatma Gandhi'),
  ('To keep the body in good health is a duty…otherwise we shall not be able to keep the mind strong and clear.', 'Buddha'),
  ('To ensure good health: eat lightly, breathe deeply, live moderately, cultivate cheerfulness, and maintain an interest in life.', 'William Londen'),
  ('Physical fitness is the first requisite of happiness.', 'Joseph Pilates'),
  ('Good health is not something we can buy. However, it can be an extremely valuable savings account.', 'Anne Wilson Schaef'),
  ('I have chosen to be happy because it is good for my health.', 'Voltaire'),
  ('A sad soul can be just as lethal as a germ.', 'John Steinbeck'),
  ('Healthy citizens are the greatest asset any country can have.', 'Winston Churchill'),
  ('A good laugh and a long sleep are the best cures in the doctor’s book.', 'Irish proverb'),
  ('Health is a state of complete mental, social and physical well-being, not merely the absence of disease or infirmity.', 'World Health Organization');

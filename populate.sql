-- patient para demonstração: asilveira
-- doctor para demonstração: bpapa

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
  ('SP','Botucatu','Regente Feijó',538),
  ('SP','Botucatu','General Telles',69),
  ('SP','Botucatu','Mario Figueiredo',40),
  ('SP','Bauru','Siqueira Campos',90),
  ('SP','Botucatu','Manoel Fernandes Cardoso',23),
  ('SP','Botucatu','Dr. Damião Pinheiro Machado',121),
  ('SP','Botucatu','João Morato da Conceição',2),
  ('SP','Botucatu','Marechal Otaviano Moscano',4);

-- insere usuários
INSERT INTO `user`(`id`, `password`, `first_name`, `last_name`, `gender`, `dob`, `email`, `phone`) VALUES
  ('jferreira','123','João','Ferreira','M','1997-01-01','jferreira@gmail.com','998737467'),
  ('halmeida','123','Henrique','Almeida','M','1960-06-01','henriquehal20@outlook.com','998549975'),
  ('jtalamonte','123','Jair','Talamonte','M','1955-08-12','jairtalamontebtu@yahoo.com','995482256'),
  ('emoraes','123','Everton','Moraes','M','1995-12-22','eversilva@hotmail.com','996256687'),
  ('flobo','123','Fernanda','Lobo','F','2015-11-04','fernandalobo2020@outlook.com','998549975'),
  ('imontenegro','123','Ingrid','Montenegro','F','1984-06-11','ingrid@bol.com','995482256'),
  ('mmiranda','123','Mauro','Miranda','M','2010-04-30','mauropmiranda@gmail.com','9935877785'),
  ('croberto','123','Claudio','Roberto','M','1965-05-30','claudiozbtu@outlook.com','992545569'),
  ('vmartins','123','Vicente','Martins','M','1973-08-15','vicentemt@hotmail.com','986524475'),
  ('ecosta','123','Elizabete','Costa','F','1980-04-22','liza.costa@outlook.com','996872254'),
  ('fleite','123','Francisco','Leite','M','1980-05-12','francisco.leite@gmail.com','995782256'),
  ('asilveira','123','Amanda','Silveira','F','1987-11-25','amanda.silveira@yahoo.com','996257730'),
  ('erodrigues','123','Elisângela','Rodrigues','F','1990-08-20','elisangela.rodrigues@higeia.com','982458875'),
  ('masilva','123','Mayara','Silva','F','1980-04-22','mayara.silva@higeia.com','996872254'),
  ('bpapa','123','Bruno','Papa','M','1990-02-25','bruno.papa@higeia.com','995475563'),
  ('thenrique','123','Thales','Henrique','M','1987-07-05','thales.henrique@higeia.com','996542257'),
  ('fbartoli','123','Fabio','Bartoli','M','1980-11-05','fabio.bartoli@higeia.com','996528824');

-- insere pacientes
INSERT INTO `patient`(`id`, `address_id`, `blood_type`) VALUES
  ('jferreira', 4, 'AB+'),
  ('halmeida', 5, 'O-'),
  ('vmartins', 6, 'O+'),
  ('ecosta', 7, 'B+'),
  ('fleite', 8, 'AB-'),
  ('asilveira', 9, 'B-'),
  ('jtalamonte', 10, 'A+'),
  ('flobo', 11, 'O-'),
  ('emoraes', 12, 'B-'),
  ('imontenegro', 13, 'AB-'),
  ('mmiranda', 14, 'B-'),
  ('croberto', 15, 'A+');

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
  ('Pró Vida', 'Medical Clinic', 1),
  ('Cuide-se', 'Medical Office', 2),
  ('Vida a todos', 'Medical Center', 3);

-- insere doutores
INSERT INTO `doctor`(`id`, `crm_number`, `specialization_id`, `medical_care_location_id`) VALUES
  ('bpapa', 21313, 1, 2),
  ('erodrigues', 43133, 2, 1),
  ('masilva', 98932, 7, 3),
  ('thenrique', 54353, 4, 3),
  ('fbartoli', 96985, 5, 1);

-- insere horários de atendimento na semana dos doutores
INSERT INTO `doctor_week_opening_hour`(`doctor_id`, `weekday`, `hour`) VALUES
  ('bpapa', 'Monday', '08:00'),
  ('bpapa', 'Monday', '10:00'),
  ('bpapa', 'Monday', '14:00'),
  ('bpapa', 'Monday', '16:00'),
  ('bpapa', 'Tuesday', '08:00'),
  ('bpapa', 'Tuesday', '10:00'),
  ('bpapa', 'Tuesday', '14:00'),
  ('bpapa', 'Tuesday', '16:00'),
  ('bpapa', 'Wednesday', '08:00'),
  ('bpapa', 'Wednesday', '10:00'),
  ('bpapa', 'Wednesday', '14:00'),
  ('bpapa', 'Wednesday', '16:00'),
  ('bpapa', 'Thursday', '08:00'),
  ('bpapa', 'Thursday', '10:00'),
  ('bpapa', 'Thursday', '14:00'),
  ('bpapa', 'Thursday', '16:00'),
  ('bpapa', 'Friday', '08:00'),
  ('bpapa', 'Friday', '10:00'),
  ('bpapa', 'Friday', '14:00'),
  ('bpapa', 'Friday', '16:00'),
  ('erodrigues', 'Monday', '08:00'),
  ('erodrigues', 'Monday', '10:00'),
  ('erodrigues', 'Tuesday', '08:00'),
  ('erodrigues', 'Tuesday', '10:00'),
  ('erodrigues', 'Wednesday', '08:00'),
  ('erodrigues', 'Wednesday', '10:00'),
  ('erodrigues', 'Thursday', '08:00'),
  ('erodrigues', 'Thursday', '10:00'),
  ('erodrigues', 'Friday', '08:00'),
  ('erodrigues', 'Friday', '10:00'),
  ('masilva', 'Monday', '16:00'),
  ('masilva', 'Monday', '18:00'),
  ('masilva', 'Tuesday', '16:00'),
  ('masilva', 'Tuesday', '18:00'),
  ('masilva', 'Wednesday', '16:00'),
  ('masilva', 'Wednesday', '18:00'),
  ('masilva', 'Thursday', '16:00'),
  ('masilva', 'Thursday', '18:00'),
  ('masilva', 'Friday', '16:00'),
  ('masilva', 'Friday', '18:00'),
  ('thenrique', 'Monday', '08:00'),
  ('thenrique', 'Monday', '10:00'),
  ('thenrique', 'Monday', '14:00'),
  ('thenrique', 'Monday', '16:00'),
  ('thenrique', 'Tuesday', '08:00'),
  ('thenrique', 'Tuesday', '10:00'),
  ('thenrique', 'Tuesday', '14:00'),
  ('thenrique', 'Tuesday', '16:00'),
  ('thenrique', 'Wednesday', '08:00'),
  ('thenrique', 'Wednesday', '14:00'),
  ('thenrique', 'Wednesday', '16:00'),
  ('thenrique', 'Thursday', '08:00'),
  ('thenrique', 'Thursday', '16:00'),
  ('thenrique', 'Friday', '08:00'),
  ('thenrique', 'Friday', '10:00'),
  ('thenrique', 'Friday', '14:00'),
  ('fbartoli', 'Tuesday', '08:00'),
  ('fbartoli', 'Tuesday', '10:00'),
  ('fbartoli', 'Tuesday', '14:00'),
  ('fbartoli', 'Tuesday', '16:00'),
  ('fbartoli', 'Wednesday', '08:00'),
  ('fbartoli', 'Wednesday', '10:00'),
  ('fbartoli', 'Wednesday', '14:00'),
  ('fbartoli', 'Wednesday', '16:00'),
  ('fbartoli', 'Thursday', '08:00'),
  ('fbartoli', 'Thursday', '16:00'),
  ('fbartoli', 'Friday', '08:00'),
  ('fbartoli', 'Friday', '10:00');

-- insere consultas já realizadas
INSERT INTO `appointment`(`date`, `start_time`, `doctor_id`, `patient_id`, `status`, `doctor_diagnosis`, `doctor_notes`, `rating`) VALUES
  ('2020-06-30', '08:00', 'erodrigues', 'flobo', 'completed', 'Caxumba', 'Paciente com inchaço nas glângulas salivares e febre de 38ºC, além de apresentar mal estar constante', 4),
  ('2020-06-30', '10:00', 'erodrigues', 'mmiranda', 'completed', 'Conjuntivite', 'Paciente apresenta vermelhidão nos olhos, inchaço na conjuntiva e secreção', 2),
  ('2020-06-29', '16:00', 'masilva', 'vmartins', 'completed', 'Teste de visão', 'Paciente veio para um teste de visão devido a dores de cabeça constante, porém seus exames não apresentarem quaisquer problemas oculares', 4),
  ('2020-07-01', '08:00', 'bpapa', 'fleite', 'completed', 'Infecção', 'Paciente com mal estar, febre alta e nauseas.', 2),
  ('2020-06-25', '08:00', 'fbartoli', 'imontenegro', 'completed', 'Falta de ar', 'Paciente encaminhado por outro doutor, apresenta falta de ar e sintomas de insuficiência cardíaca', 4),
  ('2020-06-26', '14:00', 'thenrique', 'asilveira', 'completed', 'Procedimento de rotina', 'Consulta rotineira para prevenção de doenças', 5),
  ('2020-06-26', '14:00', 'bpapa', 'asilveira', 'completed', 'Febre alta', 'Paciente com muita febre, não apresenta outros sintomas', 5),
  ('2020-06-26', '08:00', 'fbartoli', 'croberto', 'completed', 'Hipertensão', 'Paciente com tratamento rotineiro de hipertensão', 5),
  ('2020-06-24', '16:00', 'bpapa', 'ecosta', 'completed', 'Virose', 'Paciente apresenta vômito e diarréia, além de estar desidratado', 3),
  ('2020-06-24', '18:00', 'masilva', 'fleite', 'completed', 'Catarata', 'Paciente fazendo tratamento pós retirada de catarata. Apresenta boa cicatrização', 2),
  ('2020-06-24', '08:00', 'fbartoli', 'imontenegro', 'completed', 'Miocardite', 'Dores constantes no peito e pressão levemente acima do normal', 4),
  ('2020-06-23', '10:00', 'thenrique', 'fleite', 'completed', 'Exame de rotina', 'Exame de precaução', 5),
  ('2020-06-22', '14:00', 'bpapa', 'asilveira', 'completed', 'Tendinite', 'Paciente queixa-se de muita dor no braço', 5),
  ('2020-07-02', '08:00', 'fbartoli', 'halmeida', 'completed', 'Endocardite', 'Paciente se queixa de dores constantes no peito ao praticar atividades físicas', 4);

-- insere consultas pendentes
INSERT INTO `appointment`(`date`, `start_time`, `doctor_id`, `patient_id`, `status`) VALUES
  ('2020-06-24', '08:00', 'bpapa', 'asilveira', 'scheduled'),
  ('2020-06-30', '10:00', 'bpapa', 'asilveira', 'scheduled'),
  ('2020-06-08', '10:00', 'bpapa', 'asilveira', 'scheduled');

-- insere consultas futuras
INSERT INTO `appointment`(`date`, `start_time`, `doctor_id`, `patient_id`, `status`) VALUES
  ('2020-07-27', '08:00', 'bpapa', 'jferreira', 'scheduled'),
  ('2020-07-27', '10:00', 'bpapa', 'jtalamonte', 'scheduled'),
  ('2020-07-29', '14:00', 'bpapa', 'vmartins', 'scheduled'),
  ('2020-07-30', '16:00', 'bpapa', 'halmeida', 'cancelled'),
  ('2020-07-23', '14:00', 'fbartoli', 'ecosta', 'scheduled'),
  ('2020-07-30', '18:00', 'masilva', 'imontenegro', 'scheduled'),
  ('2020-07-23', '14:00', 'thenrique', 'ecosta', 'scheduled');

-- insere medicamentos
INSERT INTO `medicine`(`name`, `concentration_in_mg`, `way_of_use`) VALUES
  ('Amoxilina', 500, 'pill'),
  ('Alopurinol', 100, 'pill'),
  ('Atenolol', 50, 'pill'),
  ('Clonazepam', 2.5, 'mg'),
  ('Carvedilol', 6.25, 'mg'),
  ('Cloroquina', 150, 'pill'),
  ('Codeína', 30, 'pill'),
  ('Diazepam', 5, 'pill'),
  ('Dipirona', 500, 'mg'),
  ('Digoxina', 0.25, 'pill'),
  ('Furosemida', 40, 'pill'),
  ('Glicazida', 30, 'pill'),
  ('Glifage', 500, 'pill'),
  ('Hidroclorotiazida', 25, 'pill'),
  ('Ibuprofeno', 50, 'mg'),
  ('Isoniazida', 100, 'pill'),
  ('Itraconazol', 10, 'mg'),
  ('Lamivudina', 150, 'pill'),
  ('Lamotrigina', 50, 'pill'),
  ('Loratadina', 10, 'pill'),
  ('Metadona', 5, 'pill'),
  ('Metildopa', 250, 'pill'),
  ('Micardis', 60, 'mg'),
  ('Nicotina', 2, 'pill'),
  ('Noretisterona', 0.35, 'pill'),
  ('Paracetamol', 200, 'mg'),
  ('Pirimetamina', 25, 'pill'),
  ('Pramipexol', 0.25, 'pill'),
  ('Prednisona', 20, 'pill'),
  ('Rifampicina', 75, 'pill'),
  ('Ritonavir', 80, 'pill'),
  ('Sinvastatina', 10, 'pill'),
  ('Sulfadiazina', 500, 'pill'),
  ('Talidomida', 100, 'pill'),
  ('Tuberculina', 0.1, 'ml'),
  ('Valproato de Sodio', 288, 'pill');

-- insere prescrições
INSERT INTO `prescription`(`appt_id`, `medicine_id`, `start_date`, `expiration_date`, `dose`, `dose_unit`, `frequency`, `frequency_per`) VALUES
  (1,9,'2020-06-30','2020-07-05',14,'mg',2,'day'),
  (4,26,'2020-07-01','2020-07-10',1,'pill',1,'day'),
  (5,24,'2020-06-25','2020-07-10',20,'mg',3,'day'),
  (7,27,'2020-06-26','2020-07-02',1,'pill',1,'day'),
  (7,12,'2020-07-01','2020-07-20',1,'pill',1,'day'),
  (8,13,'2020-06-26','2020-07-25',200,'mg',2,'day'),
  (9,8,'2020-06-24','2020-07-23',1,'pill',3,'day'),
  (11,24,'2020-06-24','2020-07-12',14,'mg',1,'day');

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

CREATE TABLE Endereco( 
 id_endereco VARCHAR PRIMARY KEY,  
 rua VARCHAR NOT NULL,  
 bairro VARCHAR NOT NULL,  
 cidade VARCHAR NOT NULL,  
 numero INT NOT NULL,  
 cep VARCHAR NOT NULL  
); 

CREATE TABLE Quadra( 
 id_quadra VARCHAR PRIMARY KEY,  
 nome VARCHAR NOT NULL,  
 id_endereco VARCHAR REFERENCES endereco (id_endereco)  
);

CREATE TABLE dia_semana( 
 id_dia_semana VARCHAR PRIMARY KEY,  
 desc_dia VARCHAR NOT NULL  
);

CREATE TABLE horario_aluguel( 
 id_horario_aluguel VARCHAR PRIMARY KEY,  
 horario_inicial TIME NOT NULL,  
 horario_final TIME NOT NULL,  
 preco FLOAT NOT NULL,  
 id_dia_semana VARCHAR REFERENCES dia_semana (id_dia_semana),
 id_quadra VARCHAR REFERENCES quadra (id_quadra)  
); 

CREATE TABLE data_aluguel( 
 id_datas_aluguel VARCHAR PRIMARY KEY,  
 data DATE NOT NULL,  
 id_horario_aluguel VARCHAR REFERENCES horario_aluguel (id_horario_aluguel) 
); 





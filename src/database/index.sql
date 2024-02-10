CREATE DATABASE sda

CREATE TABLE usuarios (
    id SERIAL NOT NULL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasenna VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- in development
CREATE TABLE api (
    id SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    _url VARCHAR(100) NOT NULL,
    method VARCHAR(10) NOT NULL,
    visibility VARCHAR(30) NOT NULL,
    body VARCHAR(30),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

CREATE TABLE api_cabeceras (
    id SERIAL NOT NULL PRIMARY KEY,
    clave VARCHAR(100) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    api_id INTEGER,
    CONSTRAINT fk_api FOREIGN KEY(api_id) REFERENCES api(id)
)
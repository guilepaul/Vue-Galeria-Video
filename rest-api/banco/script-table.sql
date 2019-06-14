--db_galeria_video
CREATE TABLE galeria_video (
    id_galeria_video INTEGER UNSIGNED NOT NULL  AUTO_INCREMENT,
    titulo VARCHAR(255)  NULL,
    caminho TEXT  NULL,
    PRIMARY KEY(id_galeria_video));
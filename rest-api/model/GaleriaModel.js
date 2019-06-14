const db = require('../banco/dbConnection')

module.exports = class GaleriaModel{

    static getTodos(callback){
        return db.query("SELECT * FROM galeria_video", callback)
    }

    static getId(id, callback){
        return db.query("SELECT * FROM galeria_video WHERE id_galeria_video = ?",
        [id], callback)
    }

    static adicionar(dados, callback){
        return db.query("INSERT INTO galeria_video (titulo, caminho) VALUES(?, ?)",
        [dados.titulo, dados.caminho], callback)
    }

    static editar(dados, callback){

        if(dados.caminho != null){
            return db.query("UPDATE galeria_video SET titulo = ?, caminho = ? WHERE id_galeria_video = ?",
            [dados.titulo, dados.caminho, dados.id_galeria_video], callback)
        }else{
            return db.query("UPDATE galeria_video SET titulo = ? WHERE id_galeria_video = ?",
            [dados.titulo, dados.id_galeria_video], callback)
        }
    }

    static deletar(id, callback){
        return db.query("DELETE FROM galeria_video WHERE id_galeria_video = ?",
        [id], callback)
    }
}


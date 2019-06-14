const express = require('express')
const router = express.Router()

const GaleriaModel = require('../model/GaleriaModel')
const ResponseClass = require('../model/ResponseClass')

let pastaPublica = './public/arquivos/'

let multer = require('multer')
let path = require('path')
let fs = require('fs')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pastaPublica)
    },
    filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now())
      let nomeArquivo = 
      `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`
      req.body.caminho = pastaPublica+nomeArquivo
      cb(null, nomeArquivo)
    }
  })

  var upload = multer({storage: storage})

  function deletarArquivo(caminho){
      if(caminho != null){
        fs.unlinkSync(caminho)
        console.log('arqquivo deletado')
      }
  }

router.post('/', upload.single('arquivo'), function(req, res, next){
    let resposta = new ResponseClass()

    if(req.file != null){
        
        GaleriaModel.adicionar(req.body, function(error, retorno){
            
            if(error){
                resposta.erro = true
                resposta.msg = 'Ocorreu um erro'
                console.log('erro: ', error)
                deletarArquivo(req.body.caminho)
            } else {
                if(retorno.affectedRows > 0){
                    resposta.msg = 'Cadastro realizado com sucesso.'
                }else{
                    resposta.erro = true
                    resposta.msg = 'Não foi possível realizar a operação.'
                    console.log('erro: ', error)
                    deletarArquivo(req.body.caminho)
                }
            }
            console.log('res: ', resposta)
            res.json(resposta)
        })
    }else{
        resposta.erro = true
            resposta.msg = 'Não foi enviado um vídeo.'
            console.log('erro: ', resposta.msg)
            res.json(resposta)
    }

})

router.put('/', upload.single('arquivo'), function(req, res, next){
    let resposta = new ResponseClass()
         
        GaleriaModel.editar(req.body, function(error, retorno){
            
            if(error){
                resposta.erro = true
                resposta.msg = 'Ocorreu um erro'
                console.log('erro: ', error)
                deletarArquivo(req.body.caminho)
            } else {
                if(retorno.affectedRows > 0){
                    resposta.msg = 'Cadastro alterado com sucesso.'
                }else{
                    resposta.erro = true
                    resposta.msg = 'Não foi possível alterar o cadastro.'
                    console.log('erro: ', error)
                    deletarArquivo(req.body.caminho)
                }
            }
            console.log('res: ', resposta)
            res.json(resposta)
        })
})

router.get('/', function(req, res, next){
    GaleriaModel.getTodos(function(error, retorno){
        let resposta = new ResponseClass()
        
        if(error){
            resposta.erro = true
            resposta.msg = 'Ocorreu um erro'
            console.log('erro: ', error)
        } else {
            resposta.dados = retorno
        }
        res.json(resposta)
    })
})

router.get('/:id?', function(req, res, next){
    GaleriaModel.getId(req.params.id, function(error, retorno){
        let resposta = new ResponseClass()
        
        if(error){
            resposta.erro = true
            resposta.msg = 'Ocorreu um erro'
            console.log('erro: ', error)
        } else {
            resposta.dados = retorno
        }
        res.json(resposta)
    })
})

router.delete('/:id?', function(req, res, next){
    GaleriaModel.deletar(req.params.id, function(error, retorno){
        let resposta = new ResponseClass()
        
        if(error){
            resposta.erro = true
            resposta.msg = 'Ocorreu um erro'
            console.log('erro: ', error)
        } else {
            if(retorno.affectedRows > 0){
                resposta.msg = 'Registro excluído com sucesso.'
            }else{
                resposta.erro = true
                resposta.msg = 'Não foi possível excluir o registro.'
                console.log('erro: ', error)
                deletarArquivo(req.body.caminho)
            }
        }
        res.json(resposta)
    })
})

module.exports = router
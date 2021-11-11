import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import api from '../servicos/api'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom'

function Detalhes() {
    const [prestador, setPrestador] = useState([])
    const [servicos, setServicos] = useState([])

    const [nomeNovoServico, setNomeNovoServico] = useState([])
    const [descricaoNovoServico, setDescricaoNovoServico] = useState([])
    const [precoNovoServico, setPrecoNovoServico] = useState([])

    const { id } = useParams()
    
    const getData = (url, callback) => {
        api.get(url).then(resposta => {
            callback(resposta.data)
        })
    }

    const deleteData = (url) => {
        api.delete(url).then(resposta => {
            getData(`servicos/retornaTodosDoPrestador/${id}`, setServicos)
        })
    }

    const postData = (url, data) => {
        api.post(url, data).then(resposta => {
            getData(`servicos/retornaTodosDoPrestador/${id}`, setServicos)
        })
    }

    useEffect(() => {
        
        getData(`prestadores/${id}`, setPrestador)
        getData(`servicos/retornaTodosDoPrestador/${id}`, setServicos)

    }, [id])

    const deleteService = (servico) => {
        deleteData(`servicos/deleta/${servico.id}`)
    }

    const addServico = () => {
        postData(
            "servicos/novo", {
                nome: nomeNovoServico,
                descricao: descricaoNovoServico,
                preco: precoNovoServico,
                prestador: {id: id}
            }
        )
    }

    const onSubmitServico = (event) => {
        event.preventDefault();
        addServico()
    }

    return (
        <div className="container">
            <div className="row">
                <Link to={`/prestadores`}> 
                    <button>
                        Voltar
                    </button>
                </Link>
            </div>
            <div className="row">
                <div className="card" key={prestador.id}>
                    <h2> {prestador.nome} </h2>
                    <p> {prestador.contato} </p>
                    <p> {prestador.regiao} </p>
                    <Popup trigger={<button>Novo Serviço</button>} position="bottom center">
                        <form onSubmit={onSubmitServico}>
                            <label>
                                Nome: <input value={nomeNovoServico} onInput={e => setNomeNovoServico(e.target.value)} type="text" name="nome" required />
                            </label>
                            <label>
                                Descrição: <input value={descricaoNovoServico} onInput={e => setDescricaoNovoServico(e.target.value)} type="text" name="desc" required />
                            </label>
                            <label>
                                Preço: <input value={precoNovoServico} onInput={e => setPrecoNovoServico(e.target.value)} type="text" name="preco" required />
                            </label>
                            <button type="submit">Enviar</button>
                        </form>
                    </Popup>
                    {servicos.map(servicoPrestado => {
                        return (
                            <div className="card sub-card" key={servicoPrestado.id}>
                                <button onClick={() => deleteService(servicoPrestado)}>Deletar</button>
                                <p>{servicoPrestado.nome}</p>
                                <p>{servicoPrestado.descricao}</p>
                                <p>R${servicoPrestado.preco}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Detalhes
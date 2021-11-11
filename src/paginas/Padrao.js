import React, { useEffect, useState } from 'react'
import api from '../servicos/api'
import { Link } from 'react-router-dom'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Padrao() {
    const [prestadores, setPrestadores] = useState([])
    const [servicos, setServicos] = useState([])

    // estados de um novo prestador
    const [nomeNovoPrestador, setNomeNovoPrestador] = useState([])
    const [contatoNovoPrestador, setContatoNovoPrestador] = useState([])
    const [regiaoNovoPrestador, setRegiaoNovoPrestador] = useState([])

    const getData = (url, callback) => {
        api.get(url).then(resposta => {
            callback(resposta.data)
        })
    }

    const postData = (url, data, callback, dataToUpdate, updateFunction) => {
        api.post(url, data).then(resposta => {
            callback(dataToUpdate, updateFunction)
        })
    }

    useEffect(() => {

        getData('prestadores/retornaTodos', setPrestadores)
        getData('servicos/retornaTodos', setServicos)

    }, [])

    const addPrestador = () => {
        postData(
            "prestadores/novo", {
                nome: nomeNovoPrestador,
                contato: contatoNovoPrestador,
                regiao: regiaoNovoPrestador
            },
            getData, 'prestadores/retornaTodos', setPrestadores
        )
    }

    const onSubmitPrestador = (event) => {
        event.preventDefault();
        addPrestador()
    }

    return (
        <div className="container">
            <div className="row">
                <Popup trigger={<button>Adicionar Prestador de Serviço</button>} position="bottom center">
                    <form onSubmit={onSubmitPrestador}>
                        <label>
                            Nome: <input value={nomeNovoPrestador} onInput={e => setNomeNovoPrestador(e.target.value)} type="text" name="nome" required />
                        </label>
                        <label>
                            Contato: <input value={contatoNovoPrestador} onInput={e => setContatoNovoPrestador(e.target.value)} type="text" name="contato" required />
                        </label>
                        <label>
                            Região: <input value={regiaoNovoPrestador} onInput={e => setRegiaoNovoPrestador(e.target.value)} type="text" name="regiao" required />
                        </label>
                        <button type="submit">Enviar</button>
                    </form>
                </Popup>
            </div>
            <div className="row">
                {
                    prestadores.map(prestador => {
                        const servicosPrestados = servicos.filter(servico => servico.prestador.id === prestador.id)
                        return (
                            <div className="card" key={prestador.id}>
                                <Link to={`prestadores/${prestador.id}`}> 
                                    <h2> {prestador.nome} </h2>
                                </Link>
                                
                                <p> {prestador.contato} </p>
                                <p> {prestador.regiao} </p>
                                {servicosPrestados.map(servicoPrestado => {
                                    return (
                                        <div className="card sub-card" key={servicoPrestado.id}>
                                            <p>{servicoPrestado.nome}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                
                }
            </div>
        </div>
    )
}

export default Padrao
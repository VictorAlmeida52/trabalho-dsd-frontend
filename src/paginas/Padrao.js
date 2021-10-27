import React, { useEffect, useState } from 'react'
import api from '../servicos/api'

function Padrao() {
    const [restaurantes, setRestaurantes] = useState([])
    useEffect(() => {
        api.get('restaurantes/retornaTodos').then(resposta => {
            setRestaurantes(resposta.data)
        })
    })

    return (
        <div className="row">
            {
                restaurantes.map(restaurante => {
                    return (
                        <div className="card" key={restaurante.id}>
                            <h2> {restaurante.nome} </h2>
                            <p> {restaurante.tipo} </p>
                            <span> {restaurante.local} </span>
                        </div>
                    )
                })
            
            }
        </div>
    )
}

export default Padrao
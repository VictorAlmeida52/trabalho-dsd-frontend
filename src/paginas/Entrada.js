import React from 'react'
import { Link } from 'react-router-dom'

function Entrada() {
    return (
        <div className="pagina-principal">
            <div className="conteudo">
                <div className="preco">
                    Serviços a partir de R$159,90
                </div>
                <h1 className="slogan">iServices</h1>

                <Link to="/prestadores" className="botao"> 
                    Verificar 
                </Link>
            </div>
        </div>
    )
}

export default Entrada;
import React from 'react'
import Entrada from './paginas/Entrada'
import Padrao from './paginas/Padrao'
import Detalhes from './paginas/Detalhes'
import { BrowserRouter, Route } from 'react-router-dom'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Entrada} />
            <Route exact path="/prestadores" component={Padrao} />
            <Route exact path="/prestadores/:id" component={Detalhes} />
        </BrowserRouter>
    )
}

export default Routes
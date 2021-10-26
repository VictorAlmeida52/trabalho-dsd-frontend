import React from 'react'
import Entrada from './paginas/Entrada'
import Padrao from './paginas/Padrao'
import { BrowserRouter, Route } from 'react-router-dom'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Entrada} />
            <Route path="/restaurantes" component={Padrao} />
        </BrowserRouter>
    )
}

export default Routes
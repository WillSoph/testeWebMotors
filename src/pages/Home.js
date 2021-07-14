import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

import { Button } from '../components/Button'
import { ButtonSell } from '../components/ButtonSell'

import logoImg from '../assets/images/webmotors-logo.png'
import carImg from '../assets/images/sedan.png'
import motoImg from '../assets/images/moto.png'
import '../styles/home.scss'

export function Home() {

    const [marcas, setMarcas] = useState('')
    const [selectMarcas, setSelectMarcas] = useState('Oba')
    const [modelos, setModelos] = useState('')
    const [selectModelos, setSelectModelos] = useState('')
    const [versao, setVersao] = useState('')
    const [selectVersao, setSelectVersao] = useState('')

    useEffect(() => {
        axios.get(`https://desafioonline.webmotors.com.br/api/OnlineChallenge/Make`)
            .then(response => {
                const selectFilter = (response.data)
                const aquiSelect = selectFilter.map(key => (
                    <option key={key.ID} value={key.ID}>{key.Name}</option>
                ))
                setMarcas(aquiSelect)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    useEffect(() => {
        axios.get(`https://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${selectMarcas}`)
            .then(response => {
                const selectFilter = (response.data)
                const aquiSelectModel = selectFilter.map(key => (
                    <option key={key.ID} value={key.ID}>{key.Name}</option>
                ))
                setModelos(aquiSelectModel)
            })
            .catch(error => {
                console.log(error)
            })
    }, [selectMarcas])
    useEffect(() => {
        axios.get(`https://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${selectModelos}`)
            .then(response => {
                const selectFilter = (response.data)
                const aquiSelectModel = selectFilter.map(key => (
                    <option key={key.ID} value={key.ID}>{key.Name}</option>
                ))
                setVersao(aquiSelectModel)
            })
            .catch(error => {
                console.log(error)
            })
    }, [selectModelos])

    return (
        <div id="page-container">
            <header>
                <div className="content-logo">
                    <img src={logoImg} alt="WebMotors" />
                </div>
                <div className="header-options">
                    <div className="opcoesCompra">
                        <img src={carImg} alt="Comprar Carros" />
                        <div className="contentCarros">
                            <span>COMPRAR</span><h2>CARROS</h2>
                        </div>
                        <img src={motoImg} alt="comprar Motos" />
                        <div className="contentMotos">
                            <span>COMPRAR</span><h2>MOTOS</h2>
                        </div>
                    </div>
                    <div className="venderCarro">
                        <ButtonSell type="submit">Vender meu carro</ButtonSell>
                    </div>
                </div>
            </header>

            <main>
                <form>
                    <div className="novos-usados">
                        <input type="checkbox" id="Novos" name="Novos" value="Novos" />
                        <label htmlFor="novos"> Novos</label>
                        <input type="checkbox" id="usados" name="usados" value="Usados" />
                        <label htmlFor="usados"> Usados</label>
                    </div>
                    <div className="line-one">
                        <select
                            className="inputOnde"
                            placeholder="Onde: São Paulo - SP"
                        >
                            <option value="australia">Onde: São Paulo - SP</option>
                        </select>
                        <select
                            className="inputRaio"
                            placeholder="Raio: 100km"
                        >
                            <option value="australia">Raio: 100km</option>
                            <option value="canada">Raio: 200km</option>
                            <option value="usa">Raio: 300km</option>
                        </select>
                        <select className="inputMarca" onChange={event => setSelectMarcas(event.target.value)}>
                            <option value="Marca: Todos" disabled selected>Marca: Todas</option>
                            {marcas}
                        </select>
                        <select className="inputModelo" onChange={event => setSelectModelos(event.target.value)}>
                            <option value="Modelo: Todos" disabled selected>Modelo: Todos</option>
                            {modelos}
                        </select>
                    </div>

                    <div className="line-two">
                        <select
                            className="inputDownOne"
                            placeholder="Ano Desejado"
                        >
                            <option value="australia">Brasil</option>
                            <option value="canada">Canada</option>
                            <option value="usa">USA</option>
                        </select>
                        <select
                            className="inputDownTwo"
                            placeholder="Faixa de Preço"
                        >
                            <option value="australia">Brasil</option>
                            <option value="canada">Canada</option>
                            <option value="usa">USA</option>
                        </select>
                        <select
                            className="inputDownThree"
                            onChange={event => setSelectVersao(event.target.value)}
                        >
                            <option value="Versão: Todas" disabled selected>Versão: Todas</option>
                            {versao}
                        </select>
                    </div>
                    <div className="form-footer">
                        <p className="footerOne"> .Busca Avançada</p>
                        <p className="footerTwo">Limpar filtros</p>
                        <Button type="submit">VER OFERTAS</Button>
                    </div>
                </form>
            </main>

        </div>

    )
}
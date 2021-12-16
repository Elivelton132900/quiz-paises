import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { paisesAuxiliares } from '../../actions'
import './perguntas.css';
import Resultados from "../resultados/Resultados.js";

export const paisesLista = [
    'Afghanistan', 'Malaysia', 'Rwanda', 'Mongolia', 'Bahamas', 'Belarus', 'American Samoa', 'French Guiana', 'Saint Barthélemy', 'Belize', 'Suriname', 'Haiti', 'France', 'Chile', 'Venezuela', 'Bolivia', 'Peru', 'Argentina', 'Mexico', 'Spain', 'Colombia', 'Ecuador', 'Puerto Rico', 'Italia', 'Turkey', 'North Korea', 'Germany', 'Russia', 'Thailand', 'Malaysia', 'Austria', 'Greece', 'Canada', 'Poland', 'Macau', 'South Korea', 'Japan'
]

// 1 = bandeira | 2 = capital
const geraNumero = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

const Perguntas = ({ pegaPerguntas, paisesAuxiliares }) => {

    const [paises, setPaises] = useState([])
    const [paisPrincipal, setPaisPrincipal] = useState([])
    const [tipo, setTipo] = useState(0)
    const respostaCorreta = useRef(null)
    const pontuacao = useRef(0)
    const totalPartidas = useRef(0)

    const botaoNext = useRef()

    useEffect(() => {
        geraPaises()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const geraPaises = () => {
        let helper = []
        for (let i = 0; i < 4; i++) {
            const num = geraNumero(0, paisesLista.length)
            if (!helper.includes(paisesLista[num])) {
                helper.push(paisesLista[num])
            } else {
                i = i - 1
            }
        }
        paisesAuxiliares(helper)
    }

    useEffect(() => {

        setPaisPrincipal(pegaPerguntas[geraNumero(0, pegaPerguntas.length)])
        setPaises(pegaPerguntas)

        setTipo(geraNumero(1, 3))

    }, [pegaPerguntas, paisPrincipal])

    const renderizaOpcoes = () => {
        const letras = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' }
        const renderizado = paises.map((elemento, indice) => {
            if (paisPrincipal.data[0].translations.por.common === paises[indice].data[0].translations.por.common) {
                return (
                    <li key={paises[indice].data[0].translations.por.common} className="opcao">
                        <button ref={respostaCorreta}><span>{letras[indice]}</span>{paises[indice].data[0].translations.por.common}</button>
                    </li>
                )
            } else {
                return (
                    <li key={paises[indice].data[0].translations.por.common} className="opcao"><button><span>{letras[indice]}</span>{paises[indice].data[0].translations.por.common}</button>
                    </li>
                )
            }
        })
        return renderizado
    }

    const renderizaTudo = () => {



        if (paisPrincipal !== undefined && paisPrincipal.data !== undefined) {
            const tipoDePergunta = tipo === 1 ? `Essa bandeira é de qual país?` : `${paisPrincipal.data[0].capital} é capital de que país?`

            const mostraBandeira = () => {
                const bandeira = document.querySelector('.bandeira')
                if (tipo === 1 && bandeira !== undefined && bandeira !== null) {
                    bandeira.style.display = 'block'
                    bandeira.style.backgroundImage = `url(${paisPrincipal.data[0].flags.svg})`
                    console.log('entrei no mostra, o tipo: ', tipo)
                } else if (tipo === 2 && bandeira !== undefined && bandeira !== null) {
                    bandeira.style.display = 'none'
                }
            }

            return (
                <>
                    <span className="bandeira"></span>
                    {mostraBandeira()}

                    <div className="containerPerguntas">
                        <h2>{tipoDePergunta}</h2>
                        <div className="containerOpcoes">
                            <ol onClick={(e) => checaResposta(e)}>
                                {renderizaOpcoes()}
                            </ol>
                        </div>
                        <div className="botaoNextContainer">
                            <button onClick={() => novaPartida()} ref={botaoNext} className="botaoNext">Próximo</button>
                        </div>
                    </div>
                </>
            )
        } else {
            return <div></div>
        }
    }

    const checaResposta = (e) => {
        const elementoDisparado = e.target.nodeName.toLowerCase()
        const respostaSelecionada = e.target.textContent.slice(1, e.target.textContent.length)
        const resposta = respostaCorreta.current.textContent.slice(1, respostaCorreta.current.textContent.length)
        if (elementoDisparado === 'button' && respostaSelecionada === resposta) {
            totalPartidas.current += 1
            pontuacao.current += 1
            e.target.classList.add('acertou')
            botaoNext.current.style.opacity = '1'
            botaoNext.current.style.pointerEvents = 'auto'
        } else if (elementoDisparado === 'button' && respostaSelecionada !== resposta) {
            if (!respostaCorreta.current.hasAttribute('class', 'acertou') || !respostaCorreta.current.classList.contains('acertou')) {
                totalPartidas.current += 1
                e.target.classList.add('errou')
                respostaCorreta.current.classList.add('acertou')
                botaoNext.current.style.opacity = '1'
                botaoNext.current.style.pointerEvents = 'auto'
            }
        }
    }

    const novaPartida = () => {
        geraPaises()
        botaoNext.current.style.opacity = '0'
        botaoNext.current.style.pointerEvents = 'none'
        respostaCorreta.current.classList.remove('acertou')
        const botoes = document.querySelectorAll('.opcao button')
        botoes.forEach(el => el.hasAttribute('class', 'errou') ? el.classList.remove('errou') : el.classList.add('botao'))
        botoes.forEach(el => el.hasAttribute('class', 'acertou') ? el.classList.remove('acertou') : el.classList.add('botao'))
        totalPartidas.current + 1 === 10 ? botaoNext.current.textContent = 'Ver resultados' : botaoNext.current.textContent = 'Próximo'
    }

    const botaoTentarNovamente = () => {
        geraPaises()
        setPaisPrincipal(pegaPerguntas[geraNumero(0, pegaPerguntas.length)])
        setPaises(pegaPerguntas)
        totalPartidas.current = 0
        pontuacao.current = 0
    }

    return (
        <div className="all">
            {totalPartidas.current === 10 ?
                <Resultados
                    pontuacao={pontuacao.current}
                    botaoTentarNovamente={() => botaoTentarNovamente()}
                /> : renderizaTudo()}
        </div>
    )
}


const mapsStateToProps = (state) => {
    return { pegaPerguntas: state.pegaPerguntas }
}

export default connect(mapsStateToProps, { paisesAuxiliares })(Perguntas)
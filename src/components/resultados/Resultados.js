import React from "react";
import './resultados.css'
import Perguntas from "../perguntas/Perguntas.js";

const Resultados = (props) => {

    const vetor = document.querySelector('.vetor')
    
    const escondeVetorSuperior = () => {
        vetor.style.opacity = '0'
    }

    const renderizaPerguntas = () => {
        return (
            <>
                
                {props.botaoTentarNovamente()}
                {<Perguntas />}
                {vetor.style.opacity = '1'}
            </>
        )
    }

    return (
        
        <div className="containerResultado">
            {escondeVetorSuperior()}
            <div className="vetorTrofeu"></div>
            <div className="resultados">
                <h3>Resultados</h3>
                <p>Você acertou <span className="pontuacao">{props.pontuacao} </span>perguntas</p>
            </div>

            <button onClick={renderizaPerguntas} className="tentarNovamente">Tentar novamente</button>
        </div>

    )
}

export default Resultados
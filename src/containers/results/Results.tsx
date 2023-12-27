import { ResultsContext } from "../../context/ResultsContext.provider";
import { useContext } from "react";
import { TipoDeItem } from "../home/Home";
import { LinkedButton } from "../../components/LinkedButton";

type ResultsRederer = {
  nome: string;
  grandeza: string;
  quantidade: number;
};

export const Results = () => {
  const { resultados } = useContext(ResultsContext);
  const { consumoPorItem, convidados, consumoTotal } = resultados;
  // console.log(`consumo: ${consumoPorItem}, convidados: ${convidados}`); // apenas para debug no console

  const renderResults = ({ nome, grandeza, quantidade }: ResultsRederer) => {
    let quantidadeKG: undefined | string;
    if (grandeza === "kg") {
      quantidadeKG = quantidade.toFixed(2);
    }

    return (
      <li>
        <strong>{nome}</strong>
        <span>
          {quantidadeKG ? quantidadeKG : quantidade} {grandeza}
        </span>
      </li>
    );
  };

  console.log(JSON.stringify(resultados));

  const grandezas = {
    meat: "kg",
    bread: "unidades",
    beer: "garrafas de 2 L",
    soda: "latinhas de 500 ML",
    water: "Pets de 300 L",
    coal: "kg",
    salt: "kg",
    ice: "kg",
  };

  return (
    <div className="container">
      <h1>Churrascômetro</h1>
      <div className="calculator">
        <div>
          <div className="result-total-guest">
            <p>Confira a lista para o seu churrasco!</p>
            <div id="total-guest">
              {convidados.total} convidados
              <p style={{ fontSize: "1rem" }}>
                {" "}
                Consumo total: R${consumoTotal.toFixed(2)}
              </p>
            </div>
            <span className="guest-list">{convidados.homens} homens</span>
            <span className="guest-list">{convidados.mulheres} mulheres</span>
            <span className="guest-list">{convidados.criancas} crianças</span>
          </div>
          <div className="input-group-result">
            <div id="header-result">
              <p>ITEM</p>
              <p>QUANTIDADE</p>
            </div>
            <ul className="results">
              {Object.keys(consumoPorItem).map((item: string) => {
                const quantidadeTotal = Object.values(
                  consumoPorItem[item]
                ).reduce((acc, cur) => acc + cur, 0);
                return renderResults({
                  nome: TipoDeItem[item as keyof typeof TipoDeItem],
                  grandeza: grandezas[item as keyof typeof grandezas],
                  quantidade: quantidadeTotal,
                });
              })}
            </ul>
          </div>
        </div>
        <div className="row">
          <div>
            <LinkedButton path="/" title="Novo Calculo" callback={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

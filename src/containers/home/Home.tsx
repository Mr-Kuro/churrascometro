import { useContext, useState } from "react";
import { InputGroup } from "../../components/input/InputGroup";
import {
  ResultadosType,
  ResultsContext,
  TConsumoTable,
  TConvidados,
  TCalculoTable,
} from "../../context/ResultsContext.provider";
import "./Home.css";
import { LinkedButton } from "../../components/input/LinkedButton";

export enum TipoDeConsumidor {
  mens = "homens",
  womens = "mulheres",
  childrens = "criancas",
}

export enum TipoDeItem {
  meat = "Carne",
  bread = "Pão de Alho",
  beer = "Cerveja",
  soda = "Refrigerante",
  water = "Água",
  coal = "Carvão",
  salt = "Sal",
  ice = "Gelo",
}

const defaltDuracao = 1;

const consumidoresDaTabelaConsumo: TConsumoTable = {
  meat: {
    homens: 3,
    mulheres: 2,
    criancas: 0.5,
  },
  bread: {
    homens: 2,
    mulheres: .3,
    criancas: .1,
  },
  beer: {
    homens: 10,
    mulheres: 6,
    criancas: 0,
  },
  soda: {
    homens: 2,
    mulheres: 2,
    criancas: 0.5,
  },
  water: {
    homens: .3,
    mulheres: .2,
    criancas: 0.5,
  },
  coal: {
    homens: 1,
    mulheres: 1,
    criancas: 0,
  },
  salt: {
    homens: .5,
    mulheres: .3,
    criancas: .1,
  },
  ice: {
    homens: 1,
    mulheres: 1,
    criancas: 0,
  },
};

export const Home = () => {
  const [tabelaDeCalculo, setTabelaDeCalculo] = useState<TCalculoTable>({
    duracao: defaltDuracao,
    consumo: consumidoresDaTabelaConsumo,
  });
  const [numeroDeConvidados, setNumeroDeConvidados] = useState<TConvidados>({
    homens: 0,
    mulheres: 0,
    criancas: 0,
    total: 0,
  });

  const { changeResulados } = useContext(ResultsContext);

  const preencherTabelaDeCalculo = (itemsConsumidos: TConsumoTable) => {
    const duracao = defaltDuracao;
    const consumo = itemsConsumidos;

    setTabelaDeCalculo({ duracao, consumo });
  };

  // lida com os calculos de consumoTotal e convidados e retorna um objeto com os resultados para o context usando o changeResultados
  const handleCalculo = (numeroDeConvidados: TConvidados) => {
    // pega a quantidade de convidados do parametro para usar nas funções de calculo
    const { criancas, homens, mulheres } = numeroDeConvidados;

    // seta os valores de consumo por tipo pessoa para cada item de consumo e passa para a tabelaDeCalculo
    preencherTabelaDeCalculo(consumidoresDaTabelaConsumo);
    // pega os valores de duracao e consumo da tabelaDeCalculo
    const { duracao, consumo } = tabelaDeCalculo;
    // pega os valores de consumo de cada item de consumo
    
    // calcula o consumo total a partir da tabelaDeCalculo e retorna uma string com o valor formatado para o context
    const calcConsumoTotal = () => {
      const totalConsumo =
        Object.values(consumo)
          .map((itemDeConsumo) => {
            const totalItemConsumido =
              homens * itemDeConsumo.homens +
              mulheres * itemDeConsumo.mulheres +
              criancas * itemDeConsumo.criancas;
            return totalItemConsumido;
          })
          .reduce((acc, cur) => acc + cur) * duracao;

      const totalConsumoFormatado = totalConsumo.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      return totalConsumoFormatado;
    };

    // calcula o consumo por item a partir da tabelaDeCalculo e retorna um objeto com os valores formatados para o context
    const calcConsumoPorItem = () => {
      const consumoPorItem: TConsumoTable = {} as TConsumoTable;

      Object.keys(consumo).forEach((itemDeConsumo) => {
        const homensConsumo = homens * consumo[itemDeConsumo].homens * duracao;
        const mulheresConsumo = mulheres * consumo[itemDeConsumo].mulheres * duracao;
        const criancasConsumo = criancas * consumo[itemDeConsumo].criancas * duracao;

        consumoPorItem[itemDeConsumo] = {
          homens: homensConsumo,
          mulheres: mulheresConsumo,
          criancas: criancasConsumo,
        };
      });
      return consumoPorItem;
    };

    // cria um objeto com os resultados a serem passados para o context
    const resultadosFinais: ResultadosType = {
      consumoTotal: calcConsumoTotal(),
      convidados: numeroDeConvidados,
      consumoPorItem: calcConsumoPorItem(),
    };

    // passa os resultados para o context
    changeResulados(resultadosFinais);
  };

  const updateConvidados = (convidados: TConvidados) => {
    setNumeroDeConvidados((prevState) => {
      return {
        ...prevState,
        ...convidados,
        total: prevState.total + convidados.total,
      };
    });
  };

  return (
    <div className="container">
      <h1>Churrascômetro</h1>
      <div className="calculator">
        <h3>
          Precisa de uma ajudinha com o churrasco? :)
          <br />
          <br />
          Quantas pessoas vão participar?
        </h3>
        <div className="row-first">
          <InputGroup
            id={TipoDeConsumidor.mens}
            description={TipoDeConsumidor.mens[0]
              .toUpperCase()
              .concat(TipoDeConsumidor.mens.slice(1))}
            callback={updateConvidados}
            numeroDeConvidados={numeroDeConvidados}
          />
          <InputGroup
            id={TipoDeConsumidor.womens}
            description={TipoDeConsumidor.womens[0]
              .toUpperCase()
              .concat(TipoDeConsumidor.womens.slice(1))}
            callback={updateConvidados}
            numeroDeConvidados={numeroDeConvidados}
          />
          <InputGroup
            id={TipoDeConsumidor.childrens}
            description={TipoDeConsumidor.childrens[0]
              .toUpperCase()
              .concat(TipoDeConsumidor.childrens.slice(1))}
            callback={updateConvidados}
            numeroDeConvidados={numeroDeConvidados}
          />
        </div>
        <div className="row">
          <div>
            <p id="invalid-input" style={{ visibility: "hidden" }}>
              Por favor, insira somente números!
            </p>
            <p id="no-input" style={{ visibility: "hidden" }}>
              Por favor, selecione a quantidade de pessoas!
            </p>
            <LinkedButton title="Calcular" path="/results" callback={() => handleCalculo(numeroDeConvidados)} />
          </div>
        </div>
      </div>
    </div>
  );
};

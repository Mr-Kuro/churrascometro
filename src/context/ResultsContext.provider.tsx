import { createContext, useState } from "react";

/* 
  tipo de item da tabela de calculo
*/
type TItem = {
  quantidade: number | string;
  preco: number | string;
};

/* 
  tipo de tabela de calculo, que é um objeto com chave string e valor TItem
*/
export type TItemTable = {
  [key: string]: TItem;
};

/* 
  tipo de consumidor, para cada tipo de consumo. carne, cerveja e refrigerante até então
*/
type TConsumidor = {
  homens: number;
  mulheres: number;
  criancas: number;
};

/* 
  tipo de consumo de carne, cerveja e refrigerante, para cada tipo de consumidor
*/
export type TConsumoTable = {
  [key: string]: TConsumidor;
};

/* 
  tipo de tabela de calculo, para o context
*/
export type TCalculoTable = {
  duracao: number;
  consumo: TConsumoTable;
};

/* 
  tipo de convidados, para o context
*/
export type TConvidados = TConsumidor & { total: number };

/* 
  tipo de resultados, para o context
*/
export type ResultadosType = {
  consumoTotal: number;
  convidados: TConvidados;
  consumoPorItem: TConsumoTable;
};

/* 
  tipo de context, possui os resultados e a função para alterar os resultados, além da tabela de calculo
*/
export type ResultsContextValue = {
  resultados: ResultadosType;
  changeResulados: (resultados: ResultadosType) => void;
  tabelaDeCalculo?: TCalculoTable;
};

/* 
  cria o context com os valores defaults iniciais e exporta. o tipo é o ResultsContextValue
*/
export const ResultsContext = createContext<ResultsContextValue>({
  resultados: {
    consumoTotal: 0,
    convidados: { homens: 1, mulheres: 0, criancas: 0, total: 1 },
    consumoPorItem: {
      meat: { homens: 3, mulheres: 0, criancas: 0 },
      bread: { homens: 2, mulheres: 0, criancas: 0 },
      beer: { homens: 10, mulheres: 0, criancas: 0 },
      soda: { homens: 2, mulheres: 0, criancas: 0 },
      water: { homens: 0.3, mulheres: 0, criancas: 0 },
      coal: { homens: 1, mulheres: 0, criancas: 0 },
      salt: { homens: 0.5, mulheres: 0, criancas: 0 },
      ice: { homens: 1, mulheres: 0, criancas: 0 },
    },
  },
  changeResulados: () => {},
});

export const ResultsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [resultados, setResultados] = useState<ResultadosType>(
    {} as ResultadosType
  );

  const changeResulados = (resultados: ResultadosType) => {
    setResultados(resultados);
  };

  return (
    <ResultsContext.Provider value={{ resultados, changeResulados }}>
      {children}
    </ResultsContext.Provider>
  );
};

/* exemplo de uma tabela de calculo
  const tabelaDeCalculo: TCalculoTable = {
    duracao: 0,
    consumo: {
      carne: {
        homens: 3,
        mulheres: 2,
        criancas: 0.5,
      },
      cerveja: {
        homens: 10,
        mulheres: 6,
        criancas: 0,
      },
      refrigerante: {
        homens: 2,
        mulheres: 2,
        criancas: 0.5,
      },
    },
  };
*/

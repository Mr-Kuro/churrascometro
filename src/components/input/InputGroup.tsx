import { useState } from "react";
import "./InputGroupe.css";
import { TipoDeConsumidor } from "../../containers/home/Home";
import { TConvidados } from "../../context/ResultsContext.provider";

type InputGroupProps = {
  id: TipoDeConsumidor;
  description: string;
  callback: (convidados: TConvidados) => void;
  numeroDeConvidados: TConvidados;
};

export const InputGroup = ({
  id,
  description,
  callback,
  numeroDeConvidados,
}: InputGroupProps) => {
  const qtdConvidados = numeroDeConvidados;
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (valor: number, chave: string) => {

    const currentTotal = Number(Object(qtdConvidados).total + valor);
    const currentValor =  Number(Object(qtdConvidados)[chave] + valor);
    const currentConvidados = {
      ...qtdConvidados,
      [chave]: currentValor,
      total: valor,
    };

    console.log(`\nchave: ${chave}`);
    console.log(`valor: ${currentValor}`);
    console.log(`total: ${currentTotal}`);

    return currentConvidados;
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonKey = e.currentTarget.textContent;

    if (buttonKey === "+") {
      setInputValue(inputValue + 1);
      callback(handleInputChange(+1, id));
    } else {
      if (inputValue > 0) {
        setInputValue(inputValue - 1);
        callback(handleInputChange(-1, id));
      }
    }

    console.log(`buttonKey: ${buttonKey}`);
  };

  return (
    <div className="input-group">
      <label htmlFor={id}>{description}</label>
      <input
        type="number"
        id={id}
        value={inputValue}
        className="input-valid"
        onChange={() => console.log}
      />
      <div className="button-group">
        <button
          className="input-group__button--small"
          defaultValue={inputValue}
          onClick={handleButtonClick}
        >
          +
        </button>
        <button
          className="input-group__button--small"
          defaultValue={inputValue}
          onClick={handleButtonClick}
        >
          -
        </button>
      </div>
    </div>
  );
};

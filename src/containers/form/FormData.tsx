import React, { useEffect, useState } from "react";
import style from "./FormData.module.css";
import { InputForm } from "../../components/inputForm/InputForm";
import { redirect } from "react-router-dom";

type UserInfos = {
  name: string;
  email: string;
  postalCode: string;
  consent: boolean;
};

export type FormChange = {
  target: {
    id: string;
    value: string;
  };
};

export const FormData = () => {
  const API_URL = "https://churrascometro-api.vercel.app/leads";

  const handlePost = async () => {
    const dataRequest = {
      ...userInfos,
      optIon: userInfos.consent,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRequest),
      });

      const data = res.body;
      setUserInfos((prev) => ({
        ...prev,
        consent: data.optIon,
      }));
    } catch (erro) {
      console.error(erro);
    }
  };

  const [userInfos, setUserInfos] = useState<UserInfos>({
    name: "",
    email: "",
    postalCode: "",
    consent: true,
  });

  const handleFormChange = ({ target: { id, value } }: FormChange) => {
    if (id === "consent") {
      return;
    }

    setUserInfos({ ...userInfos, [id]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);

    localStorage.setItem("data", JSON.stringify(userInfos));
    window.location.href = "/";
  };

  const handleKickForm = () => {
    localStorage.setItem(
      "data",
      JSON.stringify({
        name: "",
        email: "",
        postalCode: "",
        consent: true,
      })
    );

    handlePost();

    redirect("/");
  };

  useEffect(() => {
    const isSeted = localStorage.getItem("data");
    isSeted ? setUserInfos(JSON.parse(isSeted)) : null;
  }, []);

  return (
    <div className="container">
      <h1>Churrascômetro</h1>
      <div className={style.input_form_group}>
        <p id="header-form">
          Fique por dentro de todas as novidades. Cadastre seu e-mail e receba
          promoções especiais!
        </p>
        <form id="form" onSubmit={handleSubmit}>
          <div className="container">
            <InputForm
              id="name"
              type="text"
              placeholder="Digite seu nome"
              errorMensage="Por favor, insira um nome válido!"
              value={userInfos.name}
              onChange={handleFormChange}
              required={true}
            />
            <InputForm
              id="email"
              type="email"
              placeholder="Digite seu email"
              errorMensage="Por favor, insira um e-mail válido!"
              value={userInfos.email}
              onChange={handleFormChange}
              required={true}
            />
            <InputForm
              id="postalCode"
              type="number"
              placeholder="Digite seu CEP"
              errorMensage="Por favor, insira um CEP válido!"
              value={userInfos.postalCode}
              onChange={handleFormChange}
              required={true}
            />
          </div>

          <div id="consent-input" style={{ padding: 0 }}>
            <input
              type="checkbox"
              id="consent"
              name="consentInput"
              checked={userInfos.consent}
              onChange={handleFormChange}
            />
            <label
              htmlFor="consent"
              id="consent-label"
              style={{ paddingLeft: "10px" }}
            >
              Concordo em receber comunicações e ofertas personalizadas de
              acordo com meus interesses.
            </label>
          </div>

          <div className="row">
            <div>
              <input
                type="submit"
                className="default-button"
                value="Cadastrar"
                style={{ padding: "0" }}
              />
            </div>
          </div>
        </form>
        <div id="nav-container">
          <button id="skip-register" onClick={handleKickForm}>
            Pular cadastro
          </button>
        </div>
      </div>
    </div>
  );
};

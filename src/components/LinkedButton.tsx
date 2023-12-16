import React from "react";
import { Link } from "react-router-dom";
import "../containers/home/Home.css";

type LinkedButtonProps = {
  title: string;
  path: string;
  callback?: () => void;
};

export class LinkedButton extends React.Component<LinkedButtonProps> {
  render() {
    return (
      <Link
        to={this.props.path}
        className="default-button"
        onClick={this.props.callback}
      >
        {this.props.title}
      </Link>
    );
  }
}

/*
  Esse componente é um botão que redireciona para uma rota específica
  Sendo que, sua conntrução é baseada em react com classes, e não com hooks
*/

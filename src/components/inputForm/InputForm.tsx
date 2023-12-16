import { FormChange } from "../../containers/form/FormData";

type InputFormProps = {
  id: string;
  type: string;
  placeholder: string;
  errorMensage: string;
  value: string;
  onChange: ({ target: { id, value } }: FormChange) => void;
  required: boolean;
};

export const InputForm = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  required,
}: InputFormProps) => {
  return (
    <div>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="input-form"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

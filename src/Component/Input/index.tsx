import React from "react";

type Props = {
  holder: string;
  name: string;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = React.memo(
  ({ holder, value, changeHandler, name }) => {
    return (
      <input
        type="text"
        className="form-control mx-2"
        placeholder={holder}
        value={value}
        name={name}
        onChange={(e) => changeHandler(e)}
      />
    );
  }
);

export default Input;

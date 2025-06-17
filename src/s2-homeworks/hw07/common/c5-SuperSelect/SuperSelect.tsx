import React, {
  SelectHTMLAttributes,
  DetailedHTMLProps,
  ChangeEvent,
} from "react";
import s from "./SuperSelect.module.css";

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[];
  onChangeOption?: (option: any) => void;
};

const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map((o) => (
        <option
          id={"hw7-option-" + o.id}
          className={s.option}
          key={o.id}
          value={o.id}
        >
          {o.value}
        </option>
      ))
    : []; // map options with key

  // const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
  //   // делают студенты
  //   // Проверяем, что e.target.value определено
  //   const value = Number(e.target.value);
  //   if (value !== undefined && onChangeOption) {
  //     // Вызываем onChangeOption только если она определена
  //     onChangeOption(value);
  //   }
  // };
  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);

    // Вызываем стандартный onChange, если он есть
    if (onChange) {
        onChange(e);
    }

    // Вызываем кастомный onChangeOption, если он есть
    if (onChangeOption && !isNaN(value)) {
        onChangeOption(value);
    }
  };

  const finalSelectClassName = s.select + (className ? " " + className : "");

  return (
    <select
      className={finalSelectClassName}
      onChange={onChangeCallback}
      {...restProps}
    >
      {mappedOptions}
    </select>
  );
};

export default SuperSelect;

import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SuperInputText from "../../../hw04/common/c1-SuperInputText/SuperInputText";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
export type SuperDebouncedInputPropsType = Omit<
  DefaultInputPropsType,
  "type"
> & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: ReactNode;
  spanClassName?: string;
} & {
  // илм экспортировать тип SuperInputTextPropsType
  // плюс специальный пропс SuperPagination
  onDebouncedChange?: (value: string) => void;
};

const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const valueRef = useRef<string>("");

  const lastValue = useRef<string>("");

  const onChangeTextCallback = useCallback(
    (value: string) => {
      console.log("onChangeTextCallback", value);
      valueRef.current = value;

      // Не триггерим debounce, если значение не изменилось
      if (value === lastValue.current) return;
      lastValue.current = value;

      onChangeText?.(value);

      if (onDebouncedChange) {
        if (timerId) clearTimeout(timerId);

        const id = setTimeout(() => {
          onDebouncedChange(valueRef.current);
        }, 1500);

        setTimerId(id as any);
      }
    },
    [onChangeText, onDebouncedChange, timerId]
  );

  // Очистка таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timerId) window.clearTimeout(timerId);
    };
  }, [timerId]);

  return <SuperInputText onChangeText={onChangeTextCallback} {...restProps} />;
};

export default SuperDebouncedInput;

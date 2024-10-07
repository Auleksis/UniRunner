import { useEffect, useState } from "react";
import s from "./Select.module.css";
import Triangle from "/src/assets/icons/triangle.svg?react";
import useClickOutside from "../../hooks/useClickOutside";

export interface SelectProps extends React.ComponentProps<"select"> {
  options: Array<string>;
  onSelectClicked: (index: number) => void;
  indexSelected?: number;
}

const Select: React.FunctionComponent<SelectProps> = ({
  options,
  onSelectClicked,
  indexSelected,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    indexSelected ?? 0
  );

  useEffect(() => {
    setSelectedIndex(indexSelected ?? 0);
  }, [indexSelected]);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setShowOptions(false);
  });

  const onSelectClick = () => {
    setShowOptions(!showOptions);
  };

  const onItemClick = (index: number) => {
    setSelectedIndex(index);

    onSelectClicked(index);

    setShowOptions(false);
  };

  return (
    <div ref={ref} className={s.select_relative_container}>
      <button className={s.select_container} onClick={onSelectClick}>
        <p className={s.invert_default_text}>{options[selectedIndex]}</p>
        <Triangle className={s.triangle_svg} />
      </button>
      {showOptions && (
        <div className={s.select_options_container}>
          <ul className={s.list}>
            {options.map((value, index) => (
              <li
                className={`${s.invert_default_text} ${s.list_item} ${
                  selectedIndex === index ? s.list_item_seleced : ""
                }`}
                key={index}
                onClick={() => {
                  onItemClick(index);
                }}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;

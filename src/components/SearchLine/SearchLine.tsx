import React, { useEffect, useState } from "react";
import s from "./SearchLine.module.css";
import Lens from "/src/assets/icons/search.svg?react";
import useClickOutside from "../../hooks/useClickOutside";

export interface SearchLineProps<ObjectType extends object>
  extends React.ComponentProps<"input"> {
  objectsArray: Array<ObjectType>;
  objectToNodeConverter: (obj: ObjectType) => React.ReactNode; //Convert an object to ReactNode element to show this object in list
  objectHandler: (obj: ObjectType) => string; //Convert an object to string. Use \n to split information into important and additional
  onSearchComplete: (objList: Array<ObjectType>) => void; //To save search results outside the component after a value in search container was selected
  onReturnAllMatchingResultsButton?: () => React.ReactNode; //If defined, shows a list element that returns all matching results after clicked
}

interface ObjectTextDescription<ObjectType extends object> {
  obj: ObjectType;
  important: string;
  additional?: string;
}

function SearchLine<ObjectType extends object>({
  objectsArray,
  objectToNodeConverter,
  objectHandler,
  onSearchComplete,
  onReturnAllMatchingResultsButton,
  ...inputProps
}: SearchLineProps<ObjectType>) {
  const [options, setOptions] = useState<
    Array<ObjectTextDescription<ObjectType>>
  >([]);
  const [value, setValue] = useState<string>("");
  const [results, setResults] = useState<
    Array<ObjectTextDescription<ObjectType>>
  >([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setShowResults(false);
  });

  useEffect(() => {
    let stringifiedObjects: Array<ObjectTextDescription<ObjectType>> = [];

    objectsArray.forEach((obj) => {
      let [important, additional] = objectHandler(obj).split("\n");
      stringifiedObjects = [
        ...stringifiedObjects,
        { obj: obj, important: important, additional: additional },
      ];
    });

    setOptions(stringifiedObjects);
  }, [objectsArray]);

  useEffect(() => {
    setResults([]);
    let foundOptions: Array<ObjectTextDescription<ObjectType>> = [];

    if (value.length == 0) {
      onSearchComplete([]);
      return;
    }

    let checkRegex = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
    if (checkRegex.test(value)) {
      return;
    }

    let regex = new RegExp(`${value}`, "i");

    options.forEach((option) => {
      if (regex.test(option.important) || regex.test(option.additional ?? "")) {
        foundOptions = [...foundOptions, option];
      }
    });

    if (foundOptions.length > 0) {
      setShowResults(true);
    }

    setResults([...foundOptions]);
  }, [value]);

  const onListItemSelected = (index: number) => {
    setValue(results[index].important);
    setShowResults(false);
    onSearchComplete([results[index].obj]);
  };

  const onReturnAllMatchingResults = () => {
    setShowResults(false);

    let foundObjects: Array<ObjectType> = [];
    results.forEach((result) => {
      foundObjects = [...foundObjects, result.obj];
    });

    onSearchComplete(foundObjects);
  };

  return (
    <div ref={ref} className={s.search_container}>
      <input
        className={s.input}
        {...inputProps}
        value={value}
        onClick={() => {
          setShowResults(true);
        }}
        onChange={(e) => setValue(e.target.value)}
      />
      <Lens className={s.search_svg} />
      <hr className={s.vertical_line}></hr>
      {results.length > 0 && showResults && (
        <div className={s.input_found_options_container}>
          <ul className={s.list}>
            {onReturnAllMatchingResultsButton && (
              <li
                className={`${s.invert_default_text} ${s.list_item}`}
                onClick={onReturnAllMatchingResults}
              >
                {onReturnAllMatchingResultsButton()}
              </li>
            )}
            {results.map((value, index) => (
              <li
                className={`${s.invert_default_text} ${s.list_item}`}
                key={index}
                onClick={() => onListItemSelected(index)}
              >
                {objectToNodeConverter(value.obj)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchLine;

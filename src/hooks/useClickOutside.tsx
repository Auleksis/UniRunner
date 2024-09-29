import { useEffect, useRef } from "react";

export default function useClickOutside<Type>(callback: () => void) {
  const ref = useRef<Type>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        !(ref.current as unknown as HTMLElement).contains(event.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [callback]);

  return ref;
}

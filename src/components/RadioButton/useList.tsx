import { useState } from "react";

export default function useList(items: Array<string>) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  function onSelect(index: number) {
    setSelectedIndex(index);
  }

  const selected = items[selectedIndex];
  return [selected, onSelect] as const;
}

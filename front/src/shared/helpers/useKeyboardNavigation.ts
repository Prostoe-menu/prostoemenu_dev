import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from 'react';

export const scrollToSelected = (
  ref: RefObject<HTMLUListElement | HTMLElement> | undefined,
  cursor: number
) => {
  const selectedItem = ref?.current?.children[cursor];

  if (selectedItem !== undefined) {
    selectedItem.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

export const handleKeyboardNavigation = <T>(
  e: KeyboardEvent<HTMLInputElement>,
  ref: RefObject<HTMLUListElement | HTMLElement> | undefined,
  items: Array<T>,
  cursor: number,
  setCursor: Dispatch<SetStateAction<number>>,
  isVisible: boolean,
  setVisibility: Dispatch<SetStateAction<boolean>>,
  chooseItem: (item: T) => void
) => {
  if (e.key === 'ArrowDown') {
    if (isVisible) {
      e.preventDefault();
      setCursor((c: number) => (c < items.length - 1 ? c + 1 : c));
    } else {
      setVisibility(true);
    }
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    setCursor((c) => (c > 0 ? c - 1 : 0));
  }

  if (e.key === 'Escape') {
    setVisibility(false);
    setCursor(-1);
  }

  if (e.key === 'Enter') {
    e.preventDefault();
    setVisibility(false); // Закрываем выпадающий список при нажатии Enter
    chooseItem(items[cursor]);
  }

  if (!ref) return;

  scrollToSelected(ref, cursor);
};

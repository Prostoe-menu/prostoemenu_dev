export const scrollToSelected = (ref, cursor) => {
  const selectedItem = ref?.current?.children[cursor];

  if (selectedItem !== undefined) {
    selectedItem.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

export const handleKeyboardNavigation = (
  e,
  ref,
  isVisible,
  cursor,
  setCursor,
  items,
  setVisibility,
  chooseItem
) => {
  if (e.key === 'ArrowDown') {
    if (isVisible) {
      e.preventDefault();
      setCursor((c) => (c < items.length - 1 ? c + 1 : c));
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
    chooseItem(items[cursor]);
  }

  scrollToSelected(ref, cursor);
};

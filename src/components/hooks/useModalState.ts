import React from 'react';

export function useModalState(modalVisibility = false) {
  const [isOpened, setOpen] = React.useState(modalVisibility);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(isOpened)
  return {
    isOpened,
    handleOpen,
    handleClose,
  };
}

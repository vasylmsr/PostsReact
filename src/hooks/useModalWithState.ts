import { useCallback, useEffect, useState } from 'react';
import { useModalState } from 'hooks/useModalState';

export function useModalWithData<T>() {
  const { isOpened, handleOpen, handleClose } = useModalState();
  const [data, setData] = useState<T | undefined>(undefined);

  const closeModal = useCallback(() => {
    setData(undefined);
  }, []);
  useEffect(() => {
    if (data) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [handleOpen, handleClose, data]);

  return {
    isOpened,
    handleOpen,
    closeModal,
    data,
    setData,
  };
}

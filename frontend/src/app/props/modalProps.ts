export interface ModalDataProps<T> {
    modalData: {
      data: T | null;
      showModal: boolean;
    };
  }
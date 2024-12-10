import { toast } from 'react-toastify';
import { store } from '@store/store';
import 'react-toastify/dist/ReactToastify.css';

const version = store?.getState()?.appSettings?.dashboardConfig?.settings?.dashboardConfig?.layoutOptions?.version;
const theme = version === 'light' ? 'light' : version === 'dark' ? 'dark' : 'colored';

const showToast = (type: string, message: any) => {
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme,
  };

  toast[type]?.(message?.toString(), options) || toast(message?.toString(), options);
};

export default showToast;

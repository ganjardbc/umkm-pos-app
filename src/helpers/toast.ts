interface ToastConfigParams {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export const toastConfig = ({
  type,
  title,
  message
}: ToastConfigParams) => {
  return {
    severity: type,
    summary: title,
    detail: message,
    life: 3000
  }
};

interface ConfirmConfigParams {
  message: string;
  header: string;
  rejectLabel?: string;
  acceptLabel?: string;
  icon?: string;
  type?: string;
  position?: string;
}

export const confirmConfig = ({
  message,
  header,
  rejectLabel,
  acceptLabel,
  icon,
  type,
  position,
}: ConfirmConfigParams) => {
  return {
    group: 'headless',
    message: message,
    header: header,
    icon: icon,
    type: type || 'info', // info, warn, danger, success
    position: position || 'center',
    rejectProps: {
      label: rejectLabel || 'Batal',
      severity: 'secondary',
      outlined: true,
      fluid: true
    },
    acceptProps: {
      label: acceptLabel || 'Ok, Lanjutkan',
      severity: 'primary',
      outlined: true,
      fluid: true
    },
    accept: () => {},
    reject: () => {}
  }
};
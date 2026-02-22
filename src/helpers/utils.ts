export const getCurrency = (value: any) => {
  if (typeof value !== 'number') {
    value = Number(value);
  }
  return `Rp ${value.toLocaleString('id-ID')},00`;
};

export const getErrorMessage = (error: any) => {
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.message) {
        return Array.isArray(error.response.data.message)
          ? error.response.data.message.join(', ')
          : error.response.data.message
      } else if (error.response.data.error) {
        return Array.isArray(error.response.data.error)
          ? error.response.data.error.join(', ')
          : error.response.data.error
      }
    }
    return error.response.statusText
  } else {
    return error.message
  }
}

export const randomString = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getNoTable = (index: number, page: number, rows: number) => {
  return index + 1 + (page - 1) * rows;
};

export const getSummaryPage = (pagination: any) => {
  return `Halaman ${pagination?.page || '0'} dari ${pagination?.pageCount || '0'} (${pagination?.totalRecords || '0'} data)`;
}

export const useDebounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

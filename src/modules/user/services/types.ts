export interface FormCreate {
  username: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  is_active: boolean;
  merchant_id: string;
}

export interface FormEdit {
  name: string;
  email: string;
  is_active: boolean;
  merchant_id: string;
}

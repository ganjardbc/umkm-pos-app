export interface FormCreate {
  slug: string,
  name: string,
  category: string,
  thumbnail: string,
  price: number,
  cost: number,
  stock_qty: number,
  min_stock: number,
  is_active: boolean,
};

export interface FormEdit {
  name: string,
  category: string,
  price: number,
  cost: number,
  min_stock: number,
  is_active: boolean,
};

export interface AdjustStock {
  product_id: string,
  change_qty: number,
  reason: string,
  note: string,
};

import type { CartItem } from './state';

export const actions = {
	addToCart(product: any) {
		const existingItem = (this as any).cartItems.find((item: CartItem) => item.id === product.id);
		
		if (existingItem) {
			if (existingItem.quantity < product.stock_qty) {
				existingItem.quantity++;
			}
		} else {
			(this as any).cartItems.push({
				id: product.id,
				name: product.name,
				price: product.price,
				quantity: 1,
				stock_qty: product.stock_qty,
				thumbnail: product.thumbnail,
				category: product.category,
			});
		}
	},
	
	removeFromCart(productId: string) {
		const index = (this as any).cartItems.findIndex((item: CartItem) => item.id === productId);
		if (index > -1) {
			(this as any).cartItems.splice(index, 1);
		}
	},
	
	updateQuantity(productId: string, quantity: number) {
		const item = (this as any).cartItems.find((item: CartItem) => item.id === productId);
		if (item) {
			if (quantity > 0 && quantity <= item.stock_qty) {
				item.quantity = quantity;
			}
		}
	},
	
	incrementQuantity(productId: string) {
		const item = (this as any).cartItems.find((item: CartItem) => item.id === productId);
		if (item && item.quantity < item.stock_qty) {
			item.quantity++;
		}
	},
	
	decrementQuantity(productId: string) {
		const item = (this as any).cartItems.find((item: CartItem) => item.id === productId);
		if (item) {
			if (item.quantity > 1) {
				item.quantity--;
			} else {
				this.removeFromCart(productId);
			}
		}
	},
	
	clearCart() {
		(this as any).cartItems = [];
	},
};

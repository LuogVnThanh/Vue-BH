import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore",{
    state: ()=>{
        return {
            cartItems: [],// Mảng chứa các sản phẩm trong giỏ
       
        }

    },
    getters:{
        totalItems(state){
           return state.cartItems.reduce((sum, item)=> sum + item.quantity, 0);
        },
        totailPrice(state){
            return state.cartItems.reduce((sum, item)=> sum + item.price * item.quantity, 0);
        }

    },
    actions:{
        addToCart(product, quantity){
            const existingItem = this.cartItems.find(item=> item.id== product.id);
            if(existingItem) {
                existingItem.quantity += quantity;// nếu có sản phẩm trong giỏ hàng, cộng số lượng
            }else{
                this.cartItems.push({...product,quantity})// Nếu chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng
            }
        }

    },
})
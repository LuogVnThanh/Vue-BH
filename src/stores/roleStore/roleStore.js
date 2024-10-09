import axiosInstance from "@/axios/axiosInstance";
import { defineStore } from "pinia";

export const useRoleStore = defineStore("roleStore",{
    state :()=>({
        roles:[]
    }),
    getters:{},
    actions:{
        async getAllRoles(){
             try{
                const response = await axiosInstance.get("role/getall")
                console.log("response: ", response);
                this.roles = response.data;

             }catch(error){
                console.log("error", error);
             }
        }
    }
})
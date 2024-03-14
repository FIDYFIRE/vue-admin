import { defineStore } from 'pinia';

import axios from 'axios';

const baseUrl = `${process.env.VUE_APP_API_URL}`;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    }),
    getters: {
        getUser: (state) => state.user
    },
    actions: {
        async login(email, password) {
            // TODO
            try {
                const response = await axios.post(`${baseUrl}/login`, {
                    email,
                    password
                })
                const { data } = response
                this.user = data.data

                localStorage.setItem('user', JSON.stringify(this.user))
            } catch (error) {
                return null
            }
        },
        logout() {
            localStorage.removeItem('user')
        }
    }
});
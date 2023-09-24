import { $fetch } from 'ohmyfetch'
import { defineStore } from 'pinia'

export const baseUrl = process.env.NODE_ENV == 'production' ?
    'https://weather-data-2.fly.dev' : 'http://localhost:3001'


const fetcher = $fetch.create({ baseURL: `${baseUrl}` })

export const useUserStore = defineStore('users', {
    state: () => ({
        user: {
            data: "",
            tokens: {} as any
        }
    }),
    getters: {
        token() {
            const user = localStorage.getItem('weather_app_user')
            let userData = {} as any
            let tokens = {} as any
            if (user) {
                userData = JSON.parse(user)
                tokens = userData?.tokens
            }
            return tokens?.access?.token
        }
    },
    actions: {
        async login(data: any) {
            const userData = await fetcher('/auth/login', {
                method: 'POST',
                body: data
            })
            const { user, tokens } = userData
            this.user = {
                data: user,
                tokens
            }
            localStorage.setItem('weather_app_user', JSON.stringify(this.user))
        }
    },
    persist: false

})
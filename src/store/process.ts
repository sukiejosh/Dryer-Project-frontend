import { $fetch } from "ohmyfetch";
import { defineStore } from "pinia";

export const baseUrl = process.env.NODE_ENV == 'production' ?
    'https://project-electric-dryer.fly.dev/' : 'http://localhost:3001'

const fetcher = $fetch.create({ baseURL: `${baseUrl}` })

interface INewProcess {
    type: string
    temperature: number
    weight: number
}

export const useProcessStore = defineStore('process', {
    state: () => ({
        processes: [
            {
                id: 'sfdfdfd',
                type: 'Rice',
                temperature: 70,
                weight: 100,
                completed: true,
                inProgress: false,
                sensed_temperature: 50,
                sensed_weight: 90,
                humidity: 90,
                createdAt: ''
            },
            {
                id: 'xcjkxncxjk',
                type: 'Beans',
                temperature: 50,
                weight: 90,
                completed: false,
                inProgress: true,
                sensed_temperature: 50,
                sensed_weight: 90,
                humidity: 90,
                createdAt: ''
            }
        ]
    }),
    getters: {
        totalProcess(state) {
            return state.processes.length
        },
        stillInProgress(state) {
            return state.processes.some(x => x.inProgress == true)
        }
    },
    actions: {
        async getProcess() {
            try {
                const data = await fetcher('/allProcess', {})
                console.log('data is', data)
                return []
            } catch (error) {
                console.error(error)
                this.processes = []
                return []
            }
        },
        async newProcess(payload: INewProcess) {
            try {
                const data = await fetcher('/process', {
                    method: 'POST',
                    body: {
                        ...payload
                    }
                })
                console.log('post is is', data)
            } catch (error) {
                console.error(error)
                this.processes = []
                return false
            }
        }
    }
})
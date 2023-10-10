import { $fetch } from "ohmyfetch";
import { defineStore } from "pinia";

// export const baseUrl = process.env.NODE_ENV == 'production' ?
//     'https://project-electric-dryer.fly.dev/' : 'http://localhost:3001'

export const baseUrl = 'https://project-electric-dryer.fly.dev/'

const fetcher = $fetch.create({ baseURL: `${baseUrl}` })

interface INewProcess {
    type: string
    temperature: number
    weight: number
}

export const useProcessStore = defineStore('process', {
    state: () => ({
        processes: [
            // {
            //     id: 'sfdfdfd',
            //     type: 'Rice',
            //     temperature: 70,
            //     weight: 100,
            //     completed: true,
            //     inProgress: false,
            //     sensed_temperature: 50,
            //     sensed_weight: 90,
            //     humidity: 90,
            //     createdAt: ''
            // },
            // {
            //     id: 'xcjkxncxjk',
            //     type: 'Beans',
            //     temperature: 50,
            //     weight: 90,
            //     completed: false,
            //     inProgress: true,
            //     sensed_temperature: 50,
            //     sensed_weight: 90,
            //     humidity: 90,
            //     createdAt: ''
            // }
        ] as any[],
        currentProcess: null as any
    }),
    getters: {
        totalProcess(state) {
            return state.processes.length
        },
        stillInProgress(state) {
            return true //state.processes.some(x => x.inProgress == true)
        }
    },
    actions: {
        async getProcess() {
            try {
                const result = await fetcher('/allProcess', {})
                console.log('data is', result)
                const { data, error } = result
                if (error == true) return []
                this.processes = data
                console.log('dddddd', this.processes, data)
            } catch (error) {
                console.error(error)
                this.processes = []
                return []
            }
        },

        async getAProcess(id: string) {
            try {
                const result = await fetcher(`/process/${id}`, {})
                console.log('process id', result)
                const { data, error } = result
                if (error == true) return {}
                this.currentProcess = data
                return data
            } catch (error) {
                console.error(error)
            }
        },


        async stopProcess(id: string) {
            try {
                const result = await fetcher(`/process/${id}`, {
                    method: 'PATCH',
                    body: {
                        stopped: true
                    }
                })
                console.log('process id', result)
                const { data, error } = result
                if (error == true) return {}
                return data
            } catch (error) {
                console.error(error)
            }
        },



        async newProcess(payload: INewProcess) {
            try {
                const result = await fetcher('/process', {
                    method: 'POST',
                    body: {
                        ...payload
                    }
                })
                const { data, error } = result
                if (error) return {}
                console.log('post is is', data)
                return data
            } catch (error) {
                console.error(error)
                this.processes = []
                return false
            }
        }
    }
})
import { ElNotification } from "element-plus";
import { $fetch } from 'ohmyfetch';
import { defineStore } from 'pinia';
import { Socket, io } from "socket.io-client";
import { baseUrl, useUserStore } from './user';

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    weather_data: (data: any) => void;
}

interface ClientToServerEvents {
    hello: () => void;
    weather_data: (data: any) => void;
}

interface InterServerEvents {
    ping: () => void;
    weather_data: (data: any) => void;
}

interface SocketData {
    name: string;
    age: number;
}


const fetcher = $fetch.create({ baseURL: `${baseUrl}` })

export interface IstationSockets {
    stationId: string;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export const useStationStore = defineStore('stations', {
    state: () => ({
        stations: {
            docs: [] as any[]
        },
        latestWeatherData: {} as any,
        selectedStation: null,
        stationSockets: [] as IstationSockets[]
    }),
    getters: {
        totalStations(state) {
            return state.stations.docs.length
        }
    },
    actions: {
        async getStations(token: string) {

            try {
                const userStore = useUserStore()

                const data = await fetcher('/stations', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const baseUrl =
                    process.env.NODE_ENV == "production"
                        ? "wss://weather-data-2.fly.dev"
                        : "ws://localhost:3001";
                this.stations = data
                if (this.stations.docs.length > 0) {
                    for (let i = 0; i < this.stations.docs.length; i++) {
                        const station = this.stations.docs[i];
                        const socket = io(`${baseUrl}/live`, {
                            auth: {
                                token: userStore.token
                            },
                            query: {
                                stationId: station?.id
                            }
                        });
                        this.stationSockets.push({
                            stationId: station?.name,
                            socket
                        });
                        this.stationSockets.forEach((socketData) => {
                            const { socket, stationId } = socketData;
                            socket.on("connect", () => {
                                console.log("connected");
                                // ElNotification({
                                // 	message: `Connected to ${station?.name}`,
                                // 	title: "Connection status",
                                // 	type: "success"
                                // });
                            });
                            socket.on("disconnect", () => {
                                console.log("disconnected");
                                // ElNotification({
                                // 	message: `Disconnected  ${station?.name}`,
                                // 	title: "Connection status",
                                // 	type: "error"
                                // });
                            });
                            socket.on("weather_data", (msg) => {
                                // console.log("message", msg);
                                this.latestWeatherData[stationId] = msg;
                                ElNotification({
                                    message: `Updated`,
                                    title: "Weather Report",
                                    type: "success"
                                });
                            });
                            socket.on("connect_error", (err) => {
                                console.log(err);
                            });
                            //@ts-ignore
                            socket.on("error", (err) => {
                                console.log(err);
                            });
                            socket.connect();
                        });
                        await this.getWeatherData(station.id, 1, 'desc')
                    }
                }
                return true
            } catch (error) {
                console.error(error)
                this.stations = {
                    docs: []
                }
                return false
            }
        },

        async getWeatherData(id: string, limit: number, sort: string = 'asc' as any, page: number = 1) {
            const userStore = useUserStore()
            const stationDetails = this.stations.docs.find((station: any) => station.id == id)
            try {
                const data = await fetcher(`/weather/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    },
                    query: {
                        limit,
                        sort,
                        page
                    }
                }) as any
                if (!this.latestWeatherData[stationDetails.name]) {
                    this.latestWeatherData[stationDetails.name] = {}
                }
                //@ts-ignore
                this.latestWeatherData[stationDetails.name] = data.docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
                console.log('latestWeatherData', this.latestWeatherData)
                return true
            } catch (error) {
                console.error(error)
                this.selectedStation = null
                return false
            }
        },

        async getAllWeatherData(id: string, limit: number, sort: string = 'asc' as any, page: number = 1) {
            const userStore = useUserStore()
            const stationDetails = this.stations.docs.find((station: any) => station.id == id)
            try {
                const data = await fetcher(`/weather/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    },
                    query: {
                        limit,
                        sort,
                        page,
                        all: true
                    }
                }) as any

                if (Array.isArray(data.docs) && data.docs.length > 0) {
                    //@ts-ignore
                    return data.docs.sort((a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt))
                }
                console.log('latestWeatherData', data)

                return []

            } catch (error) {
                console.error(error)
                this.selectedStation = null
                return false
            }
        }
    },
    persist: false

})
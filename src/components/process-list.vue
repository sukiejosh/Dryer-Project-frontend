<template>
    <div class="overflow-x-auto shadow-md mt-5 md:mx-5">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th></th>
                    <th v-for="(h, i) in headers" :key="i" class="capitalize">{{ h }}</th>
                </tr>
            </thead>
            <tbody v-if="processes.length > 0">
                <tr class="capitalize" v-for="(p, j) in processes" :key="j">
                    <td>{{ j + 1 }}</td>
                    <td>{{ p?.pid }}</td>
                    <td>{{ p?.type }}</td>
                    <td>{{ p?.temperature }}</td>
                    <td>{{ p?.sensed_temperature || '------' }}</td>
                    <td>{{ p?.weight }}</td>
                    <td>{{ p?.sensed_weight || '------' }}</td>
                    <td>
                        <div v-if="p">
                            {{ p?.completed == true ? 'Yes' : 'No' }}
                        </div>
                    </td>
                    <td>
                        <div v-if="p">
                            {{ p?.inProgress == true ? 'Yes' : 'No' }}
                        </div>
                    </td>
                    <td>{{ new Date(p?.createdAt).toLocaleDateString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { useProcessStore, } from "~/store/process";
import { storeToRefs } from 'pinia'
const processStore = useProcessStore();

const { processes } = storeToRefs(processStore)

const headers = [
    "ID",
    "Food Process",
    "Set temperature (°C)",
    "Sensed Temperature (°C)",
    "Set weight",
    "Sensed Weight",
    "Completed",
    "In Progress",
    "Created"
];

onMounted(async () => {
    await processStore.getProcess();
    console.log('all processes', processes.value)
})

</script>

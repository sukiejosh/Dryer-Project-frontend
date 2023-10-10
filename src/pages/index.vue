<template>
	<!-- <Stats2 /> -->
	<div class="w-full">
		<Navbar @new_process="processModal" />
		<ProcessList />
		<NewProcess @start_process="startProcess" />
		<OngoingProcess @stop_process="stopProcess" :process="ongoingP" />
	</div>
</template>

<style>
#app {
	text-align: center;
	color: var(--ep-text-color-primary);
}

.main-container {
	height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>

<script lang="ts" setup>
import { toggleDark } from "~/composables";
import { Edit } from "@element-plus/icons-vue";
import { useProcessStore } from "~/store/process";
import { storeToRefs } from "pinia";
const processStore = useProcessStore();
const { currentProcess } = storeToRefs(processStore)

const ongoingP = ref<any>(null)

async function processModal() {
	if (currentProcess.value && currentProcess.value.stopped == false) {
		const ongoingPM = document.getElementById('ongoing_process')
		//@ts-ignore
		if (ongoingPM) ongoingPM.showModal()
		return
	}
	const dialogM = document.getElementById('new_process')
	//@ts-ignore
	if (dialogM) dialogM.showModal()
}

async function startProcess(e: any) {
	const newP = await processStore.newProcess(e);
	await processStore.getProcess();
	const dialogM = document.getElementById('new_process')
	if (dialogM) {
		//@ts-ignore
		dialogM.close()
	}
	await processStore.getAProcess(newP.pid)
}

async function stopProcess(e: any) {
	const newP = await processStore.stopProcess(e);
	await processStore.getProcess();
	const dialogM = document.getElementById('new_process')
	if (dialogM) {
		//@ts-ignore
		dialogM.close()


	}
	await processStore.getAProcess(newP.pid)
}

</script>


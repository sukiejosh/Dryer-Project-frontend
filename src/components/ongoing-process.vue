<template>
    <dialog id="ongoing_process" class="modal">
        <div class="modal-box">
            <div class="font-bold text-2xl pb-5">Process In-Progress</div>
            <div class="flex flex-col w-full space-y-3">
                <div class="flex flex-col space-y-4 py-5">
                    <div class="flex w-full space-x-5">
                        <div class="badge badge-primary">Type</div>
                        <div class="flex-1 text-right">{{ currentProcess?.type }}</div>
                    </div>
                    <div class="flex w-full space-x-5">
                        <div class="badge badge-secondary">Temperature</div>
                        <div class="flex-1 text-right">{{ currentProcess?.temperature }}</div>
                    </div>
                    <div class="flex w-full space-x-5">
                        <div class="badge badge-accent">Weight</div>
                        <div class="flex-1 text-right">{{ currentProcess?.weight }}</div>
                    </div>
                </div>
                <div>
                    <Timer :seconds="stopwatch.seconds" :minutes="stopwatch.minutes" :hours="stopwatch.hours" />
                    <p>{{ currentProcess && currentProcess.stopped == false ? 'Running' : 'Not running' }}</p>
                </div>
            </div>
            <div class="modal-action">
                <div class="flex w-full pl-4 flex-row-reverse -space-x-5">
                    <div class="flex-1 md:ml-5 ml-2">
                        <button @click="stopProcess" :class="{
                            'btn-disabled': !isValid
                        }" class="btn btn-primary block w-full">Stop</button>
                    </div>
                    <div class="flex-none">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
</template>
<script setup lang="ts">
import { useStopwatch } from 'vue-timer-hook';
import { useProcessStore, } from "~/store/process";
import { storeToRefs } from 'pinia'

const processStore = useProcessStore();

const { currentProcess } = storeToRefs(processStore)
const isValid = computed(() => !!currentProcess.value && currentProcess.value.stopped !== true)

const stopwatchOffset = new Date();
const secondsToAdd = currentProcess.value && currentProcess.value.createdAt ? new Date(currentProcess.value.createdAt).getSeconds() : 0
stopwatchOffset.setSeconds(secondsToAdd)
const stopwatch = useStopwatch(stopwatchOffset.getSeconds(), false);
const emits = defineEmits(['stop_process'])
const polling = ref<any>(null)


function stopProcess() {
    emits('stop_process', currentProcess.value?.pid)
}

//@ts-ignore
watch(() => isValid, () => {
    const ongoingPM = document.getElementById('ongoing_process')
    console.log('vvlvid', isValid.value)
    if (!isValid.value) {
        stopwatch.reset(stopwatchOffset.getSeconds(), false);
        currentProcess.value = null
        if (ongoingPM) {
            //@ts-ignore
            ongoingPM.close()
        }
    } else {
        //@ts-ignore
        if (ongoingPM) ongoingPM.showModal()
        stopwatch.start()

    }
}, { deep: true, immediate: true })

</script>
<template>
    <dialog id="new_process" class="modal">
        <div class="modal-box">
            <div class="font-bold text-2xl pb-5">New Process</div>
            <div class="flex flex-col w-full space-y-3">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Process Type (e.g Food)</span>
                    </label>
                    <input v-model="form.type" type="text" placeholder="" class="input input-bordered w-full" />
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Desired Temperature</span>
                    </label>
                    <input v-model="form.temperature" type="number" placeholder="" class="input input-bordered w-full" />
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Desired Weight</span>
                    </label>
                    <input v-model="form.weight" type="number" placeholder="" class="input input-bordered w-full" />
                </div>

            </div>
            <div class="modal-action">
                <div class="flex w-full space-x-5">
                    <div class="flex-1">
                        <button @click="startProcess" :class="{
                            'btn-disabled': !isValid
                        }" class="btn btn-primary block w-full">Start</button>
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
<script lang="ts" setup>
import { toggleDark } from "~/composables";
import { Edit } from "@element-plus/icons-vue";
import { useProcessStore } from "~/store/process";
const processStore = useProcessStore();

const dialogFormVisible = ref(false);

const form = reactive({
    type: "",
    temperature: 0,
    weight: 0
});

const isValid = computed(() => !!form.type && !!form.temperature && !!form.weight)

const emits = defineEmits(['start_process'])

async function startProcess() {
    if (!isValid) return
    emits('start_process', form)
}
</script>

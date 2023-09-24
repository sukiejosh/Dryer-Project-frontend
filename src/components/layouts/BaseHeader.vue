<template>
	<div class="py-4 px-2">
		<el-page-header :icon="null">
			<template #content>
				<div class="flex w-full items-center">
					<div class="flex-1 w-full">Project Dryer</div>
					<div class="flex-none">
						<button
							@click="toggleDark()"
							class="border-none w-full bg-transparent cursor-pointer"
							style="height: var(--ep-menu-item-height)"
						>
							<i inline-flex i="dark:ep-moon ep-sunny" />
						</button>
					</div>
				</div>
			</template>
			<template #extra>
				<div class="flex items-center">
					<el-button
						@click="dialogFormVisible = true"
						type="primary"
						:icon="Edit"
						>New Process</el-button
					>
				</div>
			</template>
		</el-page-header>

		<el-dialog v-model="dialogFormVisible" title="New Process">
			<el-form :model="form">
				<el-form-item label="Produce Type">
					<el-input v-model="form.type" autocomplete="off" />
				</el-form-item>
				<el-form-item label="Desired Temperature">
					<el-input
						type="number"
						v-model="form.temperature"
						autocomplete="off"
					/>
				</el-form-item>
				<el-form-item label="Desired Weight">
					<el-input type="number" v-model="form.weight" autocomplete="off" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">Cancel</el-button>
					<el-button type="primary" @click="startProcess"> Start </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
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

	async function startProcess() {
		await processStore.newProcess(form);
		dialogFormVisible.value = false;
		await processStore.getProcess();
	}
</script>

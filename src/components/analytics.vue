<template>
	<div class="flex flex-col space-y-2 w-full">
		<div v-if="items.length > 0" class="flex items-center w-full justify-end">
			<div class="flex items-center space-x-3">
				<div>Download as</div>
				<div>
					<el-select
						v-model="downloadAs"
						class="m-2"
						placeholder="Select"
						size="large"
					>
						<el-option
							v-for="item in downloadOptions"
							:key="item"
							:label="item"
							:value="item"
						/>
					</el-select>
				</div>
				<el-button :disabled="!downloadAs" @click="downloadData" plain>
					Download
				</el-button>
			</div>
		</div>
		<div>
			<EasyDataTable
				:headers="headers"
				:items="items"
				alternating
				buttons-pagination
				id="my-table"
			/>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import csvDownload from "json-to-csv-export";
	import jsPDF from "jspdf";
	import autoTable from "jspdf-autotable";
	import { nanoid } from "nanoid";

	import { storeToRefs } from "pinia";
	import { onMounted } from "vue";
	import type { Header, Item } from "vue3-easy-data-table";
	import { useProcessStore } from "~/store/process";

	const processStore = useProcessStore();
	const downloadOptions = ["CSV", "PDF"];
	const downloadAs = ref("CSV");
	const serverItemsLength = ref(0);
	const items = ref<Item[]>([]);
	const loading = ref(false);
	const filename = `${nanoid()} - ${new Date().toLocaleString()}`;
	const headers: Header[] = [
		{ text: "ID", value: "id" },
		{ text: "Food Produce", value: "type" },
		{ text: "Set temperature (°C)", value: "temperature" },
		{ text: "Sensed Temperature (°C)", value: "sensed_temperature" },
		{ text: "Sensed weight", value: "sensed_weight" },
		{ text: "Created", value: "createdAt" }
	];
	const downloadAsCSV = () => {
		const dataToConvert = {
			data: items.value,
			filename: filename,
			delimiter: ",",
			headers: headers.map((x) => x.text)
		};
		csvDownload(dataToConvert);
	};
	const downloadAsPDF = () => {
		const doc = new jsPDF();
		autoTable(doc, {
			head: [[...headers.map((h) => h.text)]],
			body: [
				...items.value.map((item) => [
					item.id,
					item.type,
					item.temperature,
					item.sensed_temperature,
					item.sensed_weight,
					item.createdAt
				])
			]
		});
		doc.save(`${filename}.pdf`);
	};
	const downloadData = () => {
		if (downloadAs.value == "CSV") {
			downloadAsCSV();
		} else if (downloadAs.value == "PDF") {
			downloadAsPDF();
		}
	};

	onMounted(async () => {
		// userStore.init();
		loading.value = true;
		const d = await processStore.getProcess(); //stationStore.getAllWeatherData(id as any, 10, "desc");
		if (d) {
			items.value = d.map((doc: any) => {
				return {
					temp: doc.temp ?? "N/A",
					pressure: doc.pressure ?? "N/A",
					humidity: doc.humidity ?? "N/A",
					createdAt: new Date(doc.createdAt).toLocaleString() ?? "N/A"
				};
			});
			// serverItemsLength.value = d.totalDocs;
		}
		loading.value = false;
	});
</script>

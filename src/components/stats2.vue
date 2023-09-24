<template>
	<div class="flex flex-col w-full space-y-20">
		<div
			class="flex flex-col space-y-3 space-x-0 md:space-y-0 md:flex-row w-full md:space-x-5 md:justify-betwwen"
		>
			<div
				class="shadow-lg w-full h-30 rounded-lg flex justify-center items-center py-4"
			>
				<div class="flex flex-col space-y-5">
					<div class="font-bold">
						<span class="text-4xl text-green">{{ totalStations }}</span>
					</div>
					<div>Station(s)</div>
					<p>8.4845796, 4.6747214</p>
				</div>
			</div>
			<!-- <div
				class="shadow-lg w-full h-50 rounded-sm flex justify-center items-center py-4"
			>
				<div class="flex flex-col space-y-5">
					<div class="text-4xl text-blue font-bold">10,0000</div>
					<div>Weather data collected</div>
				</div>
			</div> -->
		</div>
		<div v-if="isStationDataEmpty == false" class="flex flex-col space-y-6">
			<div class="flex flex-col space-y-2">
				<div
					class="flex flex-col space-y-2 space-x-0 md:flex-row md:space-x-5 md:space-y-0 w-full py-3 justify-start text-left"
				>
					<div class="md:flex-1 text-2xl font-bold">Temperature</div>
					<div class="md:flex-none">
						<div
							class="flex flex-col space-y-3 space-x-0 md:space-y-0 md:space-x-7 md:flex-row"
						>
						</div>
					</div>
				</div>
				<div
					:class="[
						totalStations > 1
							? 'grid lg:grid-cols-4 grid-cols-1'
							: 'grid-container'
					]"
					class="w-full gap-10"
				>
					<div
						v-for="(l, i) in latestWeatherData"
						:key="i"
						class="text-4xl font-bold flex items-center justify-center text-center shadow-lg rounded-xl p-10"
					>
						<div>
							<p class="text-xl">{{ i }}</p>
							<p>
								{{ l && l["temp"] ? `${l["temp"]?.toFixed(2)} °C` : "N/A" }}
							</p>
							<p v-if="l && l?.createdAt" class="text-xs text-blue">
								Last updated - {{ new Date(l?.createdAt)?.toLocaleString() }}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col space-y-2">
				<div
					class="flex flex-col space-y-2 space-x-0 md:flex-row md:space-x-5 md:space-y-0 w-full py-3 justify-start text-left"
				>
					<div class="md:flex-1 font-bold text-2xl">Pressure</div>
					<div class="md:flex-none">
						<!-- <el-select
							v-model="viewType_temeperature"
							class="m-2"
							placeholder="Select"
							size="large"
						>
							<el-option
								v-for="item in viewOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select> -->
					</div>
				</div>
				<div
					:class="[
						totalStations > 1
							? 'grid lg:grid-cols-4 grid-cols-1'
							: 'grid-container'
					]"
					class="w-full gap-10"
				>
					<div
						v-for="(m, j) in latestWeatherData"
						:key="j"
						class="text-4xl font-bold flex items-center justify-center text-center shadow-lg rounded-xl p-10"
					>
						<div>
							<p class="text-xl">{{ j }}</p>
							<p>
								{{
									m && m["pressure"]
										? `${formatNumberWithCommas(
												convertToKpa(m["pressure"])
										  )} KPa`
										: "N/A"
								}}
							</p>
							<p v-if="m && m?.createdAt" class="text-xs text-blue">
								Last updated - {{ new Date(m?.createdAt)?.toLocaleString() }}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col space-y-2">
				<div
					class="flex flex-col space-y-2 space-x-0 md:flex-row md:space-x-5 md:space-y-0 w-full py-3 justify-start text-left"
				>
					<div class="md:flex-1 font-bold text-2xl">Humidity</div>
					<div class="md:flex-none">
						<!-- <el-select
							v-model="viewType_temeperature"
							class="m-2"
							placeholder="Select"
							size="large"
						>
							<el-option
								v-for="item in viewOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select> -->
					</div>
				</div>
				<div
					:class="[
						totalStations > 1
							? 'grid lg:grid-cols-4 grid-cols-1'
							: 'grid-container'
					]"
					class="w-full gap-10"
				>
					<div
						v-for="(n, k) in latestWeatherData"
						:key="k"
						class="text-4xl font-bold flex items-center justify-center text-center shadow-lg rounded-xl p-10"
					>
						<div>
							<p class="text-xl">{{ k }}</p>
							<p>
								{{
									n && n["humidity"] ? `${n["humidity"]?.toFixed(2)} %` : "N/A"
								}}
							</p>
							<p v-if="n && n?.createdAt" class="text-xs text-blue">
								Last updated - {{ new Date(n?.createdAt)?.toLocaleString() }}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col space-y-2">
				<div
					class="flex flex-col space-y-2 space-x-0 md:flex-row md:space-x-5 md:space-y-0 w-full py-3 justify-start text-left"
				>
					<div class="md:flex-1 font-bold text-2xl">Windspeed</div>
					<div class="md:flex-none">
						<!-- <el-select
							v-model="viewType_temeperature"
							class="m-2"
							placeholder="Select"
							size="large"
						>
							<el-option
								v-for="item in viewOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select> -->
					</div>
				</div>
				<div
					:class="[
						totalStations > 1
							? 'grid lg:grid-cols-4 grid-cols-1'
							: 'grid-container'
					]"
					class="w-full gap-10"
				>
					<div
						v-for="(o, l) in latestWeatherData"
						:key="l"
						class="text-4xl font-bold flex items-center justify-center text-center shadow-lg rounded-xl p-10"
					>
						<div>
							<p class="text-xl">{{ l }}</p>
							<p>
								{{
									o && o["windspeed"] ? `${o["windspeed"]?.toFixed(2)} m/s` : "N/A"
								}}
							</p>
							<p v-if="o && o?.createdAt" class="text-xs text-blue">
								Last updated - {{ new Date(o?.createdAt)?.toLocaleString() }}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col space-y-2">
				<div
					class="flex flex-col space-y-2 space-x-0 md:flex-row md:space-x-5 md:space-y-0 w-full py-3 justify-start text-left"
				>
					<div class="md:flex-1 font-bold text-2xl">Rainfall</div>
					<div class="md:flex-none">
						<!-- <el-select
							v-model="viewType_temeperature"
							class="m-2"
							placeholder="Select"
							size="large"
						>
							<el-option
								v-for="item in viewOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select> -->
					</div>
				</div>
				<div
					:class="[
						totalStations > 1
							? 'grid lg:grid-cols-4 grid-cols-1'
							: 'grid-container'
					]"
					class="w-full gap-10"
				>
					<div
						v-for="(p, ll) in latestWeatherData"
						:key="ll"
						class="text-4xl font-bold flex items-center justify-center text-center shadow-lg rounded-xl p-10"
					>
						<div>
							<p class="text-xl">{{ ll }}</p>
							<p>
								{{
									p && p["rainfall"] ? `${p["rainfall"]?.toFixed(2)} mm` : "N/A"
								}}
							</p>
							<p v-if="p && p?.createdAt" class="text-xs text-blue">
								Last updated - {{ new Date(p?.createdAt)?.toLocaleString() }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			v-else
			class="text-4xl font-bold flex items-center w-full justify-center"
		>
			No data has been recorded
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { ElNotification } from "element-plus";
	import { storeToRefs } from "pinia";
	import { io } from "socket.io-client";
	import { reactive, ref } from "vue";
	import { IstationSockets, useStationStore } from "~/store/stations";
	import { useUserStore } from "~/store/user";

	const stationStore = useStationStore();
	const userStore = useUserStore();
	const bmpTemp = ref(true);

	const viewType_temeperature = ref("Today");
	const viewOptions = reactive([
		{ value: "today", label: "Today" },
		{ value: "yesterday", label: "Yesterday" },
		{ value: "last7days", label: "Last 7 days" },
		{ value: "last30days", label: "Last 30 days" },
		{ value: "last90days", label: "Last 90 days" },
		{ value: "last365days", label: "Last 365 days" },
		{ value: "alltime", label: "All time" }
	]);

	function formatNumberWithCommas(number: { toString: () => any }) {
		// Convert the number to a string
		let numberStr = number.toString();

		// Split the number into integer and decimal parts
		const parts = numberStr.split(".");
		let integerPart = parts[0];
		const decimalPart = parts[1] || "";

		// Add commas to the integer part
		const integerRegex = /\B(?=(\d{3})+(?!\d))/g;
		integerPart = integerPart.replace(integerRegex, ",");

		// Combine the integer and decimal parts
		const formattedNumber = decimalPart
			? `${integerPart}.${decimalPart}`
			: integerPart;

		return formattedNumber;
	}

	function convertToKpa(pressure: number) {
		return pressure / 1000;
	}

	const stationSockets = reactive([]) as IstationSockets[];

	const { stations, latestWeatherData, totalStations } =
		storeToRefs(stationStore);

	const isStationDataEmpty = computed(() => {
		return Object.keys(latestWeatherData.value).length == 0;
	});
</script>
<style scoped>
	.grid-container {
		display: grid;
		grid-template-rows: repeat(n, minmax(auto, 1fr));
	}
</style>

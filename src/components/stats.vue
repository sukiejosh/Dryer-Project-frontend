<template>
	<div class="flex flex-col w-full space-y-5">
		<div
			class="flex flex-col space-y-3 space-x-0 md:space-y-0 md:flex-row w-full md:space-x-5 md:justify-betwwen"
		>
			<div
				class="shadow-lg w-full h-30 rounded-lg flex justify-center items-center py-4"
			>
				<div class="flex flex-col space-y-5">
					<div class="font-bold">
						<span class="text-4xl text-green">4</span>/<span>5</span>
					</div>
					<div>Active stations</div>
				</div>
			</div>
			<div
				class="shadow-lg w-full h-30 rounded-lg flex justify-center items-center py-4"
			>
				<div class="flex flex-col space-y-5">
					<div class="text-4xl text-blue font-bold">10,0000</div>
					<div>Weather data collected</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col w-full space-y-1">
			<div
				class="flex flex-col space-y-2 space-x-0 md:flex-row md:space-x-5 md:space-y-0 w-full py-3 justify-start text-left"
			>
				<div class="md:flex-1">Metrics</div>
				<div class="md:flex-none">
					<el-select
						v-model="viewType"
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
					</el-select>
				</div>
			</div>
			<div class="grid md:grid-cols-3 grid-cols-1 w-full h-full gap-10">
				<apexchart
					height="500px"
					:series="series4"
					:options="chartOptions4"
				></apexchart>

				<apexchart
					height="500px"
					:series="series2"
					:options="chartOptions2"
				></apexchart>

				<apexchart
					height="500px"
					:series="series3"
					:options="chartOptions3"
				></apexchart>

				<apexchart
					height="500px"
					:series="series"
					:options="chartOptions"
				></apexchart>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { reactive, ref } from "vue";

	const chartOptions = {
		chart: {
			height: "auto",
			type: "area"
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: "smooth"
		},
		title: {
			text: "Humidity",
			align: "left"
		},
		xaxis: {
			type: "datetime",
			categories: [
				"2018-09-19T00:00:00.000Z",
				"2018-09-19T01:30:00.000Z",
				"2018-09-19T02:30:00.000Z",
				"2018-09-19T03:30:00.000Z",
				"2018-09-19T04:30:00.000Z",
				"2018-09-19T05:30:00.000Z",
				"2018-09-19T06:30:00.000Z"
			]
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm"
			}
		},
		dropShadow: {
			enabled: true,
			top: 0,
			left: 0,
			blur: 3,
			opacity: 0.5
		}
	};
	const series = [
		{
			name: "location 1",
			data: [31, 40, 28, 51, 42, 109, 100]
		},
		{
			name: "location 2",
			data: [11, 32, 45, 32, 34, 52, 41]
		},
		{
			name: "location 3",
			data: [51, 32, 45, 32, 34, 52, 41]
		}
	];

	const chartOptions2 = {
		chart: {
			type: "bar",
			height: 850
		},
		title: {
			text: "Rainfall",
			align: "left"
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: "55%",
				endingShape: "rounded"
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			show: true,
			width: 2,
			colors: ["transparent"]
		},
		xaxis: {
			categories: [
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct"
			]
		},
		yaxis: {
			title: {
				text: "$ (thousands)"
			}
		},
		fill: {
			opacity: 1
		},
		tooltip: {
			y: {
				formatter: function (val: any) {
					return "$ " + val + " thousands";
				}
			}
		}
	};

	const series2 = [
		{
			name: "Location 1",
			data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
		},
		{
			name: "Location 2",
			data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
		},
		{
			name: "Location 3",
			data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
		}
	];

	const chartOptions3 = {
		chart: {
			height: "auto",
			type: "line"
		},
		forecastDataPoints: {
			count: 7
		},
		stroke: {
			width: 5,
			curve: "smooth"
		},
		xaxis: {
			type: "datetime",
			categories: [
				"1/11/2000",
				"2/11/2000",
				"3/11/2000",
				"4/11/2000",
				"5/11/2000",
				"6/11/2000",
				"7/11/2000",
				"8/11/2000",
				"9/11/2000",
				"10/11/2000",
				"11/11/2000",
				"12/11/2000",
				"1/11/2001",
				"2/11/2001",
				"3/11/2001",
				"4/11/2001",
				"5/11/2001",
				"6/11/2001"
			],
			tickAmount: 10,
			labels: {
				formatter: function (value: any, timestamp: any, opts: any) {
					return opts.dateFormatter(new Date(timestamp), "dd MMM");
				}
			}
		},
		title: {
			text: "Wind Speed",
			align: "left",
			style: {
				fontSize: "16px",
				color: "#666"
			}
		},
		fill: {
			type: "gradient",
			gradient: {
				shade: "dark",
				gradientToColors: ["#FDD835"],
				shadeIntensity: 1,
				type: "horizontal",
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100, 100, 100]
			}
		},
		yaxis: {
			min: -10,
			max: 40
		}
	};

	const series3 = [
		{
			name: "Location 1",
			data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
		},
		{
			name: "Location 2",
			data: [14, 17, 27, 22, 24, 32, 29, 31, 35, 41, 12, 22, 17, 25, 27]
		},
		{
			name: "Location 3",
			data: [32, 33, 52, 13, 44, 32, 39, 52, 11, 17, 19, 32, 32, 29]
		}
	];

	const chartOptions4 = {
		chart: {
			height: "auto",
			type: "line",
			dropShadow: {
				enabled: true,
				color: "#000",
				top: 18,
				left: 7,
				blur: 10,
				opacity: 0.2
			},
			toolbar: {
				show: false
			}
		},
		colors: ["#77B6EA", "#545454"],
		dataLabels: {
			enabled: true
		},
		stroke: {
			curve: "smooth"
		},
		title: {
			text: "Average High & Low Temperature",
			align: "left"
		},
		grid: {
			borderColor: "#e7e7e7",
			row: {
				colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.5
			}
		},
		markers: {
			size: 1
		},
		xaxis: {
			categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			title: {
				text: "Month"
			}
		},
		yaxis: {
			title: {
				text: "Humidity"
			},
			min: 5,
			max: 40
		}
	};

	const series4 = [
		{
			name: "High - 2013",
			data: [28, 29, 33, 36, 32, 32, 33]
		},
		{
			name: "Low - 2013",
			data: [12, 11, 14, 18, 17, 13, 13]
		}
	];

	const viewType = ref("");
	const viewOptions = reactive([
		{ value: "today", label: "Today" },
		{ value: "yesterday", label: "Yesterday" },
		{ value: "last7days", label: "Last 7 days" },
		{ value: "last30days", label: "Last 30 days" },
		{ value: "last90days", label: "Last 90 days" },
		{ value: "last365days", label: "Last 365 days" },
		{ value: "alltime", label: "All time" }
	]);
</script>

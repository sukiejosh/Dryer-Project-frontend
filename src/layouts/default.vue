<template>
	<el-config-provider namespace="ep">
		<BaseHeader />
		<div class="flex w-full main-container">
			<div class="flex w-full p-4">
				<!-- <Stats2 /> -->
				<router-view />
			</div>
		</div>
	</el-config-provider>
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

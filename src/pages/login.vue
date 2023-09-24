<template>
	<div class="flex min-h-screen mx-auto w-full items-center justify-center">
		<div
			class="p-10 flex flex-col space-y-5 w-4/5 md:w-sm rounded-lg shadow-md h-full"
		>
			<div
				class="w-full border-b-2 border-gray flex text-center font-bold text-3xl justify-center"
			>
				The weather app
			</div>
			<div class="flex flex-col space-y-5 py-5">
				<el-input v-model="email" placeholder="Email"> </el-input>
				<el-input
					v-model="password"
					type="password"
					placeholder="Password"
					show-password
				/>
			</div>
			<div class="flex justify-center w-full pt-10">
				<el-button
					@click="login"
					:disabled="!email || !password"
					class="w-full"
				>
					Login
				</el-button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { ElNotification } from "element-plus";
	import { useUserStore } from "~/store/user";

	const email = ref("");
	const password = ref("");
	const userStore = useUserStore();
	const router = useRouter();

	const login = async () => {
		if (!email.value || !password.value) return;
		localStorage.removeItem("weather_app_user");
		await userStore
			.login({
				email: email.value,
				password: password.value
			})
			.then(() => {
				router.push({ path: "/" });
			})
			.catch((err) => {
				console.log(err);
				ElNotification({
					title: "Login error",
					message: "Email or password is incorrect",
					type: "error"
				});
			});
	};

	onMounted(() => {
		localStorage.removeItem("weather_app_user");
	});
</script>
<route lang="json">
{
	"meta": {
		"layout": "login"
	}
}
</route>

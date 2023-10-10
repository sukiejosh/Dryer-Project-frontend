<template>
    <div class="navbar bg-base-100 px-3 shadow-lg">
        <div class="navbar-start">
            <a class="btn btn-ghost normal-case text-xl">Project Dryer</a>
        </div>
        <div class="navbar-end">
            <button @click="$emit('new_process')" class="btn btn-primary">New Process</button>
        </div>
    </div>
</template>
<script setup lang="ts">
defineEmits(['new_process'])
</script>
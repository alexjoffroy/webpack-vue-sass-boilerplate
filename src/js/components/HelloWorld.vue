<template>
	<div class="hello-world">
		<h1>Hello {{ name }} !</h1>
		<p>
			<label for="name">Name:</label>
			<input type="text" v-model="name" />
		</p>
	</div>
</template>

<script>
	export default {

		data() {

			return {

				name: 'World'

			}

		}

	};
</script>
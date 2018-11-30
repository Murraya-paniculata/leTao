<style lang="less" scoped type="text/less">

</style>

<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot name="bread">

        </slot>
      </nav>
    </div>
  </div>
</template>

<script>
	export default {
		props: [],
		data() {
			return {}
		},
		components: {},
		computed: {},
		methods: {},
		mounted() {

		}
	}
</script>

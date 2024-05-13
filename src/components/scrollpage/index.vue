<template>
    <div ref="scroll" id="scrollpage" >
        <slot></slot>
        <div style="height: 40px;margin-top:10px;z-index:1;"
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
        >
        </div>
    </div>
</template>

<script setup>
    import { defineProps,onMounted,beforMounted, ref,computed } from "vue"

    const scrollAction = {
      x: ref(undefined),
      y: ref(undefined)
    };
    defineProps({
        loading: Boolean,
        noData: Boolean,
        offset: Number
    })
    onMounted(() => {
        windwos.addEventListener('scroll', handleScroll,false);
    })
    beforMounted(() => {
        windwos.removeEventListener('scroll', handleScroll);
    })
    const handleScroll = (e) => {
        if (!props.noData) {
        const curHeight = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollPage = document.getElementById('scroll-page');
        if (
          (curHeight + window.innerHeight >= scrollPage.offsetHeight + offset) && isDownDirection.value
        ) {
          if (!loading.value) {
            loading.value = true; // 设置loading状态
            emit('load').then(() => {
              loading.value = false; // 完成加载后重置loading状态
            });
          }
        }
      }
    }
    const isDownDirection = computed(() => {
        const currentScrollY = window.scrollY;
        const isDown = currentScrollY > scrollAction.value.y;
        scrollAction.value.y = currentScrollY;
        return isDown;
    });

</script>

<style scoped>

</style>
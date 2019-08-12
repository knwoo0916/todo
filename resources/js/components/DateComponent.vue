<template>
    <tr>
        <day-compo v-for="item, idx in dateList" :key="idx" :item="item"></day-compo>
    </tr>
</template>

<script>
    export default {
        name: "DateComponent",
        props:['item'],
        computed:{
            dateList(){
                this.$root.dayofweek = this.item;
                return this.$root.dayofweek;
            },
        }
    }
</script>

<style scoped>

</style>

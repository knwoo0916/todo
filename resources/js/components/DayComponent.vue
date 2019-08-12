<template>
    <td>
        {{item}}
    </td>
</template>

<script>
    export default {
        name: "DayComponent",
        props:['item'],
        computed:{
            dayList(){
                return this.item;
            },
        }
    }
</script>

<style scoped>
    td {
        width: 200px;
        height: 100px;
        border-left: 1px solid pink;
        border-bottom: 1px solid pink;
        text-align: center;
        font-size: 40px;
        font-family: 'Black Han Sans', sans-serif;
        cursor: pointer;
    }
    .calendar > .dates > tr:first-child > td {
        cursor: default;
    }

    .calendar > .dates > tr > td:last-child {
        border-right: 1px solid pink;
    }
</style>

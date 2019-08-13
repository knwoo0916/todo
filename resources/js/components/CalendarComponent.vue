<template>
    <div>
        <div class="logo">
            <h1>Calendar</h1>
        </div>
        <div id="dayList">
            <div class="today">
                <i class="fas fa-caret-left" @click="prevMonth"></i>
                <div>{{this.now.getFullYear()}}년</div>
                <div>{{this.now.getMonth()+1}}월</div>
                <i class="fas fa-caret-right" @click="nextMonth"></i>
            </div>
            <div class="day-row">
                <div class="day">일</div>
                <div class="day">월</div>
                <div class="day">화</div>
                <div class="day">수</div>
                <div class="day">목</div>
                <div class="day">금</div>
                <div class="day">토</div>
            </div>
            <transition-group name="fade">
                <div class="date-row" v-for="week in list" :key="week.id">
                    <router-link to="/day" tag="div" class="item" v-for="item in week.week">
                        <div @click="setDate(item)">
                            {{item.number}}
                            <div v-if="ifuncom(item.number) !== null">
                                {{ifuncom(item.number)}}
                            </div>
                        </div>
                    </router-link>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CalendarComponent",
        created(){
            this.now = new Date();
            this.fillDate(new Date());
        },
        data(){
            return {
                list:[],
                now:null
            }
        },
        methods:{
            prevMonth(){
                this.now.setMonth(this.now.getMonth() - 1);
                this.list = [];
                setTimeout(() => {
                    this.fillDate(this.now);
                }, 500);
            },
            nextMonth(){
                this.now.setMonth(this.now.getMonth() + 1);
                this.list = [];
                setTimeout(() => {
                    this.fillDate(this.now);
                }, 500);
            },
            fillDate(now){
                this.list = [];
                let first = now.getFirst();
                let day = first.getDay();
                first.addDay(-day);
                let id = 1;
                while (true){
                    let week = [];
                    for (let i = 0; i < 7; i++){
                        week.push({date:first.gondr(), number:first.getDate()});
                        first.addDay(1);
                    }
                    this.list.push({id:id++,week:week});
                    if (first.getMonth() != now.getMonth()){
                        break;
                    }
                }
            },
            ifuncom(day){
                let result = null;
                let ifdate = new Date(this.now.getFullYear(),this.now.getMonth(),day);
                let todolist = this.$root.sortList.filter(x => x.complete == 0);
                for (let i = 0;i<todolist.length;i++){
                    if (ifdate.getTime() === todolist[i].date.getTime()){
                        if (result == null){
                            result = todolist[i].name;
                        }else {
                            result += ","+todolist[i].name;
                        }
                    }
                }
                return result;
            },
            null(){
                return null;
            },
            setDate(item) {
                this.$root.now = new Date(item.date);
                this.$root.dayInfo.dateTodo();
            },
        },
        computed: {
            uncomList() {
                return this.$root.sortList.filter(x => x.complete == 0);
            }
        }
    }
</script>

<style scoped>
    .day-row {
        display: grid;
        grid-template-columns: repeat(7,1fr);
        grid-template-rows: 40px;
        grid-auto-rows: minmax(200px, auto);
    }
    .date-row {
        margin-top: 10px;
        grid-gap: 10px;
        display: grid;
        grid-template-columns: repeat(7,1fr);
        grid-auto-rows: minmax(100px, auto);
    }
    .today {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 50px;
        text-align: center;
        color:  #4caf50;
        font-size: 40px;
        position: relative;
    }
    .today > i:first-child {
        left: 0;
    }
    .today > i:last-child {
        right: 0;
    }
    .today > i {
        position: absolute;
        line-height:50px;
        cursor: pointer;
        font-size: 50px;
    }
    .today > div {
        line-height:50px;
    }
    .day {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #4caf50;
        color: #fff;
    }
    .item {
        background-color: #fff;
        box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.2);
        padding: 10px;
    }

    .item > div {
        width: 100%;
        height: 100%;
    }
</style>
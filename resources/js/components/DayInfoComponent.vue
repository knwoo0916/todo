<template>
    <div>
        <div class="row">
            <div class="today">
                <i class="fas fa-caret-left" @click="prev"></i>
                <div>{{ this.$root.now.gondr() }}</div>
                <i class="fas fa-caret-right" @click="next"></i>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <transition-group name="glist" tag="div">
                    <item-compo class="my-3" v-for="item in this.$root.list" :key="item.id" :item="item"></item-compo>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DayInfoComponent",
        created() {
            this.now = new Date();
            this.date = new Date();
            this.$root.dayInfo = this;
        },
        data(){
            return {
                now:null,
                date: null,
            }
        },
        methods: {
            prev() {
                this.$root.now = new Date(this.$root.now.getFullYear(), this.$root.now.getMonth(), this.$root.now.getDate() - 1);
                this.dateTodo();
            },
            next() {
                this.$root.now = new Date(this.$root.now.getFullYear(), this.$root.now.getMonth(), this.$root.now.getDate() + 1);
                this.dateTodo();
            },
            dateTodo() {
                this.$root.list = [];
                this.$http.get("/todo").then(res=>{
                    const data = res.data;
                    data.list.forEach( x => {
                        if(this.newDate(x.date) == this.$root.now.gondr()) {
                            this.$root.list.push({id:x.id, name:x.name, date: this.newDate(x.date), complete: x.complete});
                        }
                    });
                });
            },
            newDate(date) {
                this.date = new Date(date);
                return this.date.gondr();
            }
        },
        computed: {
            uncomList() {
                return this.$root.sortList.filter(x => x.complete == 0);
            }
        }
    }
</script>

<style scoped>
    .today {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 50px;
        text-align: center;
        color: #4caf50;
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
        line-height: 50px;
        cursor: pointer;
        font-size: 50px;
    }

    .today > div {
        line-height: 50px;
    }

</style>
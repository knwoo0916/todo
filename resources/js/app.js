require('./bootstrap');

window.Vue = require('vue');

import RegisterComponent from "./components/RegisterComponent";
import MainApp from "./components/MainApp";
import ItemComponent from "./components/ItemComponent";
import Router from 'vue-router';
import axios from 'axios';

//페이지 컴포넌트 들
import TodoComponent from "./components/TodoComponent";
import CompleteComponent from "./components/CompleteComponent";
import CalendarComponent from "./components/CalendarComponent";
import DateComponent from "./components/DateComponent";
import DayComponent from "./components/DayComponent";

Vue.use(Router);
Vue.prototype.$http = axios;

Vue.component ('register-compo', RegisterComponent);
Vue.component ('main-app', MainApp);
Vue.component ('item-compo', ItemComponent);
Vue.component ('date-compo', DateComponent);
Vue.component ('day-compo', DayComponent);

const router = new Router({
    routes:[
        {path:'/', component:TodoComponent},
        {path:'/complete', component:CompleteComponent},
        {path:'/calendar', component:CalendarComponent},
    ]
});

Date.prototype.gondr = function() {
    let str = this.toLocaleDateString();
    console.log(str);
    let arr = str.split(".");
    return arr.filter(x => x != "").map(x => {
        if(x.length >= 4) return x;
        let dstr = "0" + x.trim();
        return dstr.substring(dstr.length - 2);
    }).join("-");
};

Date.prototype.getFirst = function () {
    let temp = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    temp.setDate(1);
    return temp;
};

Date.prototype.getLast = function () {
    let temp = new Date(this.getFullYear(), this.getMonth() + 1, this.getDate());
    temp.setDate(0);
    return temp;
};

Date.prototype.addDay = function (value) {
    this.setDate(this.getDate() + value);
};

const app = new Vue({
    el: '#app',
    router,
    data:{
        list: [],
        date: [],
        dateofweek: [],
        day : new Date(),
        id:4,
        user:null,
    },
    created(){
        this.$http.get('/check')
            .then(res => {
                if(res.data.result) {
                    this.user = res.data.user;
                    if (res.data.result){
                        this.$http.get("/todo").then(res=>{
                            const data = res.data;
                            this.list = data.list.map(x => {
                                x.date = new Date(x.date);
                                return x;
                            });
                        });
                    }
                }
            });
    },
    methods:{
        addTodo(name, date){
            this.$http.post('/todo', {
                name:name,
                date:date
            }).then(res => {
                const data = res.data;
                if (data.success){
                    this.list.push({id:this.id++, name:name, date: new Date(date), complete: 0});
                }
            });
        },
        comTodo(id){
            this.$http.post('/com', {
                id:id
            });
        },
        delTodo(id){
            let idx = this.list.findIndex(x => x.id == id);
            this.list.splice(idx, 1);
            this.$http.post('/del', {
                id:id
            });
        },
        selectdate(today){
            this.date  = [];
            let week = [];
            today.setDate(today.getDate() - (today.getDate() - 1));
            if(today.getDay() != 0) {
                let cnt = today.getDay();
                today.setDate(today.getDate() - today.getDay() - 1);
                for (let i = 0; i < cnt; i++)
                {
                    today.setDate(today.getDate() + 1);
                    week.push(today.getDate());
                }
            }else {
                today.setDate(today.getDate());
                week.push(today.getDate());
            }
            for (let i = 0; i < 6; i++){
                for (let j = 0; week.length < 7; j++){
                    today.setDate(today.getDate() + 1);
                    week.push(today.getDate());
                }
                this.date.push(week);
                week = [];
            }
        }
    },
    computed:{
        sortList(){
            return this.list.sort((a, b) => {
                if(a.date == b.date) return 0;
                return a.date < b.date ? -1 : 1;
            });
        }
    }
});

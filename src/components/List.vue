<template>
    <div class="container">
        <router-link :to="{name:'create', params:{id:'new'}}" title="Create a new List" class="btn btn-success">
            <i class="fa-solid fa-plus"></i>
        </router-link>
        <div class="card">
            <div class="card-header">
                Lists
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(todoList, index) in todoLists" :key="todoList.id">
                            <td>{{ index+1 }}</td>
                            <td>
                                <router-link :to="{name:'edit', params:{id:todoList.id}}" title="Edit list">
                                {{ todoList.title }}
                                </router-link>
                            </td>
                            <td>{{ todoList.description }}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <router-link :to="{name:'create', params:{id:todoList.id}}" title="Add a new subtask" 
                                        class="btn btn-primary"
                                    >
                                        <i class="fa-solid fa-plus"></i>
                                    </router-link>
                                    
                                    <button type="button" v-on:click="toggleSubitems(todoList)" class="btn btn-warning" 
                                        title="Show Subitems"
                                    >
                                        <i class="fa-regular fa-list"></i>
                                    </button> 
                                    <button type="button" v-on:click="deleteList(todoList)" class="btn btn-danger" 
                                        title="Delete list"
                                    ><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </td>
                            <td class="block">
                                <div v-show="todoList.id === todoListToShow">
                                    <list-subitem :children="todoList.children"></list-subitem>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ListSubitem from '../components/ListSubitem.vue';

export default {
    data() {
        return {
            todoLists:[],
            todoListToShow: null
        }
    },
    created:function(){
        this.getTodoLists();
    },
    components: {
        ListSubitem,
    },
    methods:{
        getTodoLists(){
            fetch(import.meta.env.VITE_API_URL + 'todo-lists/list.json')
            .then(response=>response.json())
            .then((dataResponse)=>{
                console.log(dataResponse);
                this.todoLists = dataResponse.todoLists;
            })
            .catch(console.log())
        },
        deleteList(todoList){
            fetch(import.meta.env.VITE_API_URL + 'todo-lists/delete/'+todoList.id+'.json', {
                method:"DELETE"
            })
            .then(response=>response.json())
            .then((dataResponse)=>{
                console.log(dataResponse);
                this.todoLists.splice(this.todoLists.indexOf(todoList), 1);
            })
            .catch(console.log())
        },
        toggleSubitems(todoList){
            if(todoList.children.length < 1) {
                return;
            }
            if(this.todoListToShow === todoList.id) {
                this.todoListToShow = null; 
            } else {
                this.todoListToShow = todoList.id;
            }
        },
    }
}
</script>

<style scoped>
.block {
    display: block;
}
</style>

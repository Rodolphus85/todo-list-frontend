<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Sub items lists
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
                        <tr v-for="(todoList, index) in children" :key="todoList.id">
                            <td>{{ index+1 }}</td>
                            <td>
                                <router-link :to="{name:'edit', params:{id:todoList.id}}">
                                {{ todoList.title }}
                                </router-link>
                            </td>
                            <td>{{ todoList.description }}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <button type="button" v-on:click="deleteList(todoList)" class="btn btn-danger" 
                                        title="Delete list"
                                    ><i class="fa-solid fa-trash"></i></button>
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
export default {
    props:{
        children: {
            type: Array,
            default: () => [],
        },
    },
    methods:{
        deleteList(todoList){
            fetch(import.meta.env.VITE_API_URL + 'todo-lists/delete/'+todoList.id+'.json', {
                method:"DELETE"
            })
            .then(response=>response.json())
            .then((dataResponse)=>{
                this.children.splice(this.children.indexOf(todoList), 1);
            })
            .catch(console.log())
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Add New To Do!
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addList">
                    <div class="form-group">
                        <input type="text" required class="form-control" name="title" id="" v-model="todoList.title" 
                            aria-describedby="helpId" placeholder="Add a Title"
                        >
                    </div>
                    <div class="form-group">
                        <input type="textarea" required class="form-control" name="description" id="" 
                            v-model="todoList.description" aria-describedby="helpId" placeholder="Add a Description"
                        >
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="url_video" id="" aria-describedby="helpId" 
                            v-model="todoList.url_video" placeholder="Add a URL video"
                        >
                    </div>
                    <div class="form-group">
                        <input type="file" class="form-control" name="file" id="" aria-describedby="helpId" 
                            placeholder="Upload a file" ref="file"
                        >
                    </div>
                    <div class="btn-group" role="group">
                        <button type="submit" class="btn btn-primary">Create</button>
                        <router-link :to="{name:'list'}" class="btn btn-danger">Cancel</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            todoList:{}
        }
    },
    methods:{
        addList(){
            let that = this;
            
            if (this.$refs.file.files[0] !== undefined) {
                const reader = new FileReader();
                reader.readAsDataURL(this.$refs.file.files[0]);
                reader.onload = () => { 
                    that.sendTodoList(reader.result);
                };
            } else {
                that.sendTodoList(null);
            }
        },
        sendTodoList(fileDecoded) {
            let dataSend = {
                title: this.todoList.title,
                description: this.todoList.description,
                todo_list_id: (this.$route.params.id == 'new' ? null : this.$route.params.id),
                url_video: this.todoList.url_video,
                file: fileDecoded
            }
            fetch(import.meta.env.VITE_API_URL + 'todo-lists/add.json', {
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(dataSend)
            })
            .then(response=>response.json())
            .then((dataResponse=>{
                console.log(dataResponse);
                window.location.href='/list';
            }))
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Edit this To Do list
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="updateList">
                    <div class="form-group">
                        <input type="text" required class="form-control" name="title" id="" v-model="todoList.title" 
                            aria-describedby="helpId" placeholder="Add a Title"
                        >
                        <small id="helpId" class="text-muted">Edit Title</small>
                    </div>
                    <div class="form-group">
                        <input type="textarea" required class="form-control" name="description" id="" 
                            v-model="todoList.description" aria-describedby="helpId" placeholder="Add a Description"
                        >
                        <small id="helpId" class="text-muted">Edit Description</small>
                    </div>
                    <div class="form-group">
                        <input type="textarea" class="form-control" name="url_video" id="" 
                            v-model="todoList.url_video" aria-describedby="helpId" placeholder="Add a URL video"
                        >
                        <small id="helpId" class="text-muted">Edit URL video</small>
                    </div>
                    <div class="form-group">
                        <input type="file" class="form-control" name="file" id="" aria-describedby="helpId" 
                            placeholder="Upload a file" ref="file"
                        >
                    </div>
                    <div class="btn-group" role="group">
                        <button type="submit" class="btn btn-success">Apply</button>
                        <router-link :to="{name:'list'}" class="btn btn-warning">Cancel</router-link>
                    </div>
                    <div class="row text-center">
                        <div v-if="showFile" class="col-6">
                            <img :src="todoList.path_file" width="300" height="300"/>
                        </div>
                        <div v-if="showVideo" class="col-6">
                            <iframe width="460" height="315" :src="urlVideoEmbed" 
                                title="YouTube video player" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                            </iframe>
                        </div>
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
            todoList:{},
            urlVideoEmbed:'',
            showFile:false,
            showVideo:false
        }
    },
    created:function() {
        this.getTodoList();
    },
    methods:{
        getTodoList(){
            fetch(import.meta.env.VITE_API_URL + 'todo-lists/view/'+this.$route.params.id+'.json')
            .then(response=>response.json())
            .then((dataResponse)=>{
                this.todoList = dataResponse.todoList;
                this.showFile = this.todoList.path_file !== null;
                this.showVideo = this.todoList.url_video !== null;
                this.getVideoId();
            })
            .catch(console.log())
        },
        updateList(){
            let that = this;
            
            if (this.$refs.file.files[0] !== undefined) {
                const reader = new FileReader();
                reader.readAsDataURL(this.$refs.file.files[0]);
                reader.onload = () => { 
                    that.sendUpdateList(reader.result);
                };
            } else {
                that.sendUpdateList(null);
            }
        },
        sendUpdateList(fileDecoded){
            let dataSend = {
                id: this.$route.params.id,
                title: this.todoList.title,
                description: this.todoList.description,
                todo_list_id: this.todoList.todo_list_id,
                url_video: this.todoList.url_video,
                file: fileDecoded
            }
            fetch(import.meta.env.VITE_API_URL + 'todo-lists/edit/'+this.$route.params.id+'.json', {
                method:"PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(dataSend)
            })
            .then(response=>response.json())
            .then((dataResponse=>{
                console.log(dataResponse);
                window.location.href='../list';
            }))
        },
        getVideoId(){
            if (null !== this.todoList.url_video) {
                let indexCut = this.todoList.url_video.lastIndexOf('=');
                let videoId = this.todoList.url_video.slice(indexCut + 1); 
                this.urlVideoEmbed = 'https://www.youtube.com/embed/'+videoId;
            }
        }
    }
}
</script>

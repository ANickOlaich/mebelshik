const App={
    data(){     //Данные приложения
        return {
            users:[],
            taskTypes:[],
            typeTask:{
                name:'',
                description:'',
                image_url:'',
                sort:1000,
            },
        }
    },
    methods:{   //Методы приложения
        addNewNote(){
            if (this.inputValue==''){
                this.placeholderString='Значение не может быть пустое'
            }else{
                this.notes.push(this.inputValue)
                this.inputValue=''
                this.placeholderString='Введите заметку'
            }
        },
        removeNote(idx){
            this.notes.splice(idx,1)

        },
        // --------------------ТИПЫ ЗАДАНИЙ--------------------
        async newTypeTask(){
            this.typeTask.image_url='/images/void.jpg'
            const response = await fetch('/api/task-types',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(this.typeTask)
            })
            const data = await response.json()
            this.taskTypes.push(data)
            this.typeTask.name=''
            this.typeTask.description=''
            this.typeTask.sort=1000
            this.typeTask.image_url=''

        },
        async deleteTypeTask(idx){
            const response = await fetch('/api/task-types',{
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                    id:this.taskTypes[idx].id
                  })
            })
            this.taskTypes.splice(idx,1)
        },
        async changeTypeTask(idx){
            console.log('CHANGE');
            //const myModal = document.getElementById('addTaskModal')
            new bootstrap.Modal($('#addTaskModal')).show();
            //console.log(myModal);
            //myModal.modal('show')

        },
        // --------------------------USER---------------------
        async deleteUser(id){
            const response = await fetch('/user',{
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                    id:id
                  })
            })
        }
    },
    computed:{
        sortedTaskTypes: function(){
            return this.taskTypes.sort((a,b)=> (a.sort) > (b.sort) ? 1:-1)
        }
    },
    
    async created() {
        console.log('Mounted')
        try {
            const response = await fetch('/user');
            this.users = await response.json();
            const taskTypes = await fetch('/api/task-types')
            this.taskTypes = await taskTypes.json()
            console.log(taskTypes);
          } catch (error) {
            console.error(error);
          }

        
    },
}


Vue.createApp(App).mount('#app')
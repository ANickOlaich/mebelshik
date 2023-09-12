const App={
    data(){     //Данные приложения
        return {
            users:[],
            projects:[],
            taskTypes:[],
            imageTypes:[],
            typeTask:{
                name:'',
                description:'',
                image_url:'',
                sort:1000,
            },
            imageType:{
                name:'',
                description:'',
                image_url:'',
                sort:1000,
            },
            gallery:[],
            newImage:{
                description:'',
                image_url:'',
                project_id:0,
                author_id:0,
                imaget_type:0,
                public:false,
                is_trash:false,
            }
        }
    },
    methods:{   //Методы приложения
        async uploadImage(event) {
            const file = event.target.files[0];
            const id = 1; // Здесь установите значение id по вашим требованиям
          
            if (file) {
              const formData = new FormData();
              formData.append('id', id); // Добавляем id в formData
              formData.append('image', file);
          /*
              try {
                const response = await fetch('/api/project/image', {
                  method: 'POST',
                  body: formData,
                });
          
                if (response.ok) {
                  const responseData = await response.json();
                  console.log('Сервер ответил:', responseData);
                  this.project.image_url = responseData.url
                  console.log(this.project);
                } else {
                  console.error('Ошибка при загрузке изображения:', response.statusText);
                }
              } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
              }
          */
              this.newImage.image_url = URL.createObjectURL(file);
            }
          },
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
         //-----------------------------Type Image ---------------------------
         async newImageType(){
            this.imageType.image_url='/images/void.jpg'
            const response = await fetch('/api/image-types',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(this.imageType)
            })
            const data = await response.json()
            this.imageTypes.push(data)
            this.imageType.name=''
            this.imageType.description=''
            this.imageType.sort=1000
            this.imageType.image_url=''

        },
         async deleteImageType(idx){
            const response = await fetch('/api/image-types',{
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                    id:this.imageTypes[idx].id
                  })
            })
            this.imageTypes.splice(idx,1)
        },
        async changeImageType(idx){
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
        },
        sortedImageTypes: function(){
            return this.imageTypes.sort((a,b)=> (a.sort) > (b.sort) ? 1:-1)
        }
    },
    
    async created() {
        console.log('Mounted')
        try {
            const response = await fetch('/user');
            this.users = await response.json();
            const projects = await fetch('/api/projects');
            this.projects = await projects.json();
            console.log(this.projects);
            const taskTypes = await fetch('/api/task-types')
            this.taskTypes = await taskTypes.json()
            const imageTypes = await fetch('/api/image-types')
            this.imageTypes = await imageTypes.json()
          } catch (error) {
            console.error(error);
          }

        
    },
}


Vue.createApp(App).mount('#app')
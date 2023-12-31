const App={
    data(){     //Данные приложения
        return {
            project:{
                name:'Test',
                description:'Test'
            },
            image_url:'',
            id:0,
            menu:"task",
            task:{
                name:'',
                description:'',
                project_id:'',
                placeholderString:"Введите название",
                task_type_id:0,
                url:'',
                price:'',
                imageSrc:'',
                sku:''
            },
            taskType:[],  
            tasks:[],
            parser:{
                url:'',
                name:'',
                price:0,
                imageSrc:'',
                sku:''
            },   
            viewDeleted:false,
            viewExtendet:true,
            ral:'',
            gallery:[],
            newImage:{
                description:'',
                image_url:'',
                project_id:0,
                author_id:0,
                imaget_type:0,
                public:false,
                is_trash:false,
            },
            imageTypes:[],
            file:{}
        }
    },
    methods:{   //Методы приложения
        async uploadImage(event) {
            console.log(event.target.id);
            this.file = event.target.files[0];
            const id = this.id; // Здесь установите значение id по вашим требованиям
            if (this.file) {
              
              if (event.target.id=='eskiz'){
                this.newImage.image_url = URL.createObjectURL(this.file);
              } else if (event.target.id=='image'){
                this.image_url = URL.createObjectURL(this.file);
              }
            }
          },
        async updateProject(){
            console.log("UpdateProject");
            console.log(this.file);
            if (this.file) {
                const formData = new FormData();
                formData.append('id', this.id); // Добавляем id в formData
                formData.append('image', this.file);
            
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
              }
            const response = await fetch('/api/project',{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(this.project)
            })
        },
        async imageRAL(){    
            console.log('RAL');
            const response = await fetch('/api/ral/'+this.ral)       
            const fileURL = await response.json();
            this.task.imageSrc=fileURL.fileURL
            this.task.description = this.task.description + " RAL " + this.ral
            this.ral = ''
        },
        async newTask(){       //Добавляет новое задание
            console.log(this.task);
            if (this.task.name==''){
                this.task.placeholderString='Имя задания не может быть пустым'
            }else{ 
                this.task.project_id=this.id
                const response = await fetch('/api/task',{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                      
                      body: JSON.stringify(this.task)
                })
                const result = await response.json();
                console.log(result);
                this.tasks.push(result)
                this.task.name=''
                this.task.description=''
                this.task.placeholderString="Введите название проекта"
                this.task.url=''
            }
        },
        async changeStatus(id){
            const checked = !this.tasks[id].checked                 
            const response = await fetch('/api/task/status',{
                method:"POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                      body: JSON.stringify(
                        {id:this.tasks[id].id,
                        checked:checked,
                        public:this.tasks[id].public
                    })
            })
            this.tasks[id].checked = checked
            //const data = await response.json();
        },
        async changePublic(id){
            console.log('PUBLIC');
            const public = !this.tasks[id].public
            const response = await fetch('/api/task/status',{
                method:"POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                      body: JSON.stringify(
                        {id:this.tasks[id].id,
                        checked:this.tasks[id].checked,
                        public:public})
            })
            this.tasks[id].public = public
            console.log(this.tasks[id].public);
            //const data = await response.json();
        },
        async deleteTask(id){
            console.log('delete');
            console.log(id);
            this.tasks[id].deleted = true
            const response = await fetch('/api/task/delete/'+this.tasks[id].id);
        },
        downloadTXT(){
            const data=[]
            this.tasks.forEach(t => {
                data.push(
                    t.name+': \t'+t.description+'\n'
                )
            });
            const filename = "test-"+(Math.floor(Date.now() / 1000))+".txt"
            const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        async parsing(){
            const response = await fetch('/api/parser',{
                method:"POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                      body: JSON.stringify(
                        {url:this.parser.url})
            })
            this.task=await response.json();
            this.parser.url = ''
        },     
    },
    computed:{
        sortedTasks(){
            return this.tasks.sort(
                function (a,b){
                    return(a.sortType>b.sortType) ? 1 : -1;
                })},
        
    },
    async created() {
        const url=window.location.href.split('/')
        const id=(url[url.length-1]);
        this.id = id
        try {
            const response = await fetch('/api/project',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                    id:this.id})
            });
            this.project = await response.json();
            this.image_url = this.project.image_url
            const tasks = await fetch('/api/task/'+this.id);
            this.tasks = await tasks.json();
            const typeTaskRes = await fetch('/api//task-types')
            this.taskType = await typeTaskRes.json();
            const imageTypes = await fetch('/api/image-types')
            this.imageTypes = await imageTypes.json()
        } catch (error) {
            console.error(error);
        }
    },
}


Vue.createApp(App).mount('#app')
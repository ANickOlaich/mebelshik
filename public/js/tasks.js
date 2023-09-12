const App={
    data(){     //Данные приложения
        return {
            tasks:[]
            ,
            parser:{
                url:'',
                name:'',
                price:0,
                imageSrc:'',
                sku:''
            },
            task:{
                name:'',
                description:'',
                project_id:'',
                placeholderString:"Введите задание",
                task_type_id:0,
                url:'',
                price:'',
                imageSrc:'',
                sku:''
            },
            taskType:[],
            id:0,
            viewDeleted:false,
            viewExtendet:false,
            ral:''
        }
    },
    methods:{   //Методы приложения
        async imageRAL(){    
            console.log('RAL');
            console.log(this.ral);
            const response = await fetch('/api/ral/'+this.ral)       
            const fileURL = await response.json();
            this.task.imageSrc=fileURL.fileURL
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
                }
            )
        }
        
        

    },
    async created() {
        const url=window.location.href.split('/')
        this.id=(url[url.length-1]);
        try {
            const response = await fetch('/api/task/'+this.id);
            this.tasks = await response.json();
          } catch (error) {
            console.error(error);
          }
          console.log(this.tasks);
        try {
            const typeTaskRes = await fetch('/api//task-types')
            this.taskType = await typeTaskRes.json();
        } catch (err){
            console.log(err);
        }

        
    },
}


Vue.createApp(App).mount('#app')
const App={
    data(){     //Данные приложения
        return {
            project:{
                name:'Test',
                description:'Test'
            },
            id:0
        }
    },
    methods:{   //Методы приложения
        async updateProject(){
            console.log("UpdateProject");
            const response = await fetch('/api/project',{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(this.project)

            })
        }
        /*async newProject(){       //Добавляет новый проект
            if (this.name==''){
                this.placeholderString='Имя проекта не может быть пустым'
            }else{
                const project = {
                    name:this.name,
                    description:this.description
                }
                const response = await fetch('/api/projects',{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                      body: JSON.stringify(project)
                })
                const result = await response.json();
                this.projects.push(result)
                this.name=''
                this.description=''
                this.placeholderString="Введите название проекта"
            }
        },
        async inArchive(id){
            const response = await fetch('/api/projects/status',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                    id:id,
                    status:"В архиве"})
            })
            const result = await response.json();
            console.log(result);
            this.projects.splice(id-1,1)
            this.projects.push(result)

        },
        removeNote(idx){
            this.notes.splice(idx,1)

        }
    },
    computed:{  //Вычисляемые данные приложения
        doubleCountComputed(){
            return this.notes.length*2
        }
    },
    watch:{     //отслеживать данные
        inputValue(value){
            console.log(value);
        }*/
    },
    async created() {
        const url=window.location.href.split('/')
        const id=(url[url.length-1]);
        console.log(id);
        try {
            const response = await fetch('/api/project',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                    id:id})
            });
            this.project = await response.json();
            console.log(this.project);
          } catch (error) {
            console.error(error);
          }

        
    },
}


Vue.createApp(App).mount('#app')
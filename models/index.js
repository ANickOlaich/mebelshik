const User = require("./User");
const Project = require("./Project")
const TaskType = require("./TaskType")
const Task = require("./Task")
const Gallery = require("./Gallery")
const ImageType = require("./ImageType")


// Определение отношения "один ко многим" между проектами и задачами
Project.hasMany(Task, {
  foreignKey: 'project_id', // Внешний ключ в модели Task
  targetKey: 'id',
  onDelete: 'CASCADE', // Опционально: если проект удаляется, то и все связанные задачи тоже удаляются
});

// Определение отношения "один ко многим" между пользователем и задачей
User.hasMany(Task, {
  foreignKey: 'author_id', // Внешний ключ в модели Task
  onDelete: 'CASCADE', // Опционально: если пользователь удаляется, то и все его задачи тоже удаляются
});

Task.belongsTo(User, {
  foreignKey: 'author_id', // Внешний ключ в модели Task
});

TaskType.hasMany(Task, {
  foreignKey: 'task_type_id', // Внешний ключ в модели Task
  onDelete: 'CASCADE', // Опционально: если тип задачи удаляется, то и все связанные задачи тоже удаляются
});

Task.belongsTo(TaskType, {
  foreignKey: 'task_type_id', // Внешний ключ в модели Task
});




module.exports = {User, Project, Task, TaskType, Gallery, ImageType};

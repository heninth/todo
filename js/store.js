var taskStore = {
  get: function () {
    return JSON.parse(localStorage.getItem('todoApp-tasks') || '[]')
  },
  set: function (tasks) {
    localStorage.setItem('todoApp-tasks', JSON.stringify(tasks))
  }
}

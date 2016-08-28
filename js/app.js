var todoApp = new Vue({
  el: '#todo',
  data: {
    newTask: '',
    editTask: '',
    onEdit: false,
    editIndex: null,
    tasks: taskStore.get(),
    stage: 'all',
    onDelete: false,
  },
  computed : {
    _tasks: function () {
      switch (this.stage) {
        case 'all':
          return this.tasks.filter(function (task) {
            return task
          })
        case 'active':
          return this.tasks.filter(function (task) {
            return !task.complete
          })
        case 'complete':
          return this.tasks.filter(function (task) {
            return task.complete
          })
      }
    }
  },
  methods: {
    addTask: function () {
      var text = this.newTask.trim()
      if (text) {
        this.tasks.push({
          text:text,
          complete: false,
          top: getRandomInt(10, $(window).height() - (240 + 65)),
          left: getRandomInt(10, $(window).width() - 240)
        })
        this.newTask = ''
      }
    },
    doneEdit: function() {
      this.tasks[this.editIndex].text = this.editTask.trim()
      this.editIndex = null
      this.editTask = ''
      this.onEdit = false
      $('.new-task').removeClass('edit')
      this.$nextTick(function () {
        $('.new-task input[name="newTask"]').focus()
      })
    },
    cancelEdit: function () {
      this.editIndex = null
      this.editTask = ''
      this.onEdit = false
      $('.new-task').removeClass('edit')
      this.$nextTick(function () {
        $('.new-task input[name="newTask"]').focus()
      })
    },
    changeStage: function (newStage) {
      this.stage = ['all', 'active', 'complete'].indexOf(newStage) > -1 ? newStage : 'all'
    },
    taskPosition: function (val) {
      this.tasks[val.index].top = val.top
      this.tasks[val.index].left = val.left
      this.tasks[val.index].zIndex = val.zIndex
    },
    toggleDeletePopup: function () {
      this.onDelete = !this.onDelete
    },
    deleteTasks: function (stage) {
      switch (stage) {
        case 'all':
          this.tasks = []
          break;
        case 'active':
          this.tasks = this.tasks.filter(function (task) {
            return task.complete
          })
          break;
        case 'complete':
          this.tasks = this.tasks.filter(function (task) {
            return !task.complete
          })
          break;
      }
    }
  },
  ready: function() {
    $('.task-board').height(($(window).height() - 65) + 'px')
    $('input[type="text"]').focus(function () {
      if (this.setSelectionRange) {
        var len = $(this).val().length
        this.setSelectionRange(len, len)
      } else {
        $(this).val($(this).val())
      }
    })
  },
  events: {
    toggle_complete: function (index) {
      this.tasks[index].complete = !this.tasks[index].complete
    },
    edit_task: function (index) {
      this.onEdit = true
      this.editTask = this.tasks[index].text
      this.editIndex = index
      $('.new-task').addClass('edit')
      this.$nextTick(function () {
        $('.new-task input[name="editTask"]').focus()
      })
    },
    delete_task: function (index) {
      if (this.editIndex == index) {
        this.$nextTick(function () {
          $('.new-task.edit').addClass('shake shake-constant')
          $('.new-task input[name="editTask"]').focus()
        })
        setTimeout(function (){ $('.new-task.edit').removeClass('shake shake-constant') }, 300)
        return false
      }
      this.tasks.splice(index, 1)
      this.$nextTick(function () {
        $('.new-task input[name="newTask"]').focus()
      })
    },
    update_task_position: function (val) {
      this.taskPosition(val)
      this.$broadcast('request_child_postion')
    },
    response_child_position: function (val) {
      this.taskPosition(val)
    }
  },
  watch: {
    tasks: {
      handler: function (tasks) {
        taskStore.set(tasks)
      },
      deep: true
    }
  }
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

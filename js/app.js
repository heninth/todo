Vue.component('task', {
  props: ['text', 'complete', 'index'],
  template: '#v-template_task',
  methods: {
    toggleComplete: function () {
      this.complete = !this.tasks[index].complete
    },
    editTask: function() {

    },
    deleteTask: function () {
      this.$remove()
      this.$dispatch('deleteTask', this.index)
    }
  },
  ready: function () {
    $(this.$el).css({
      'top': ( getRandomInt(10, $(window).height() - (240 + 65) ))+ 'px',
      'left': ( getRandomInt(10, $(window).width() - 240 ))+ 'px'
    })
    $(this.$el).draggable({
      containment: "parent",
      stack: 'div',
      distance: 0
    })
  }
})

var todoApp = new Vue({
  el: '#todo',
  data: {
    newTask: '',
    tasks: []
  },
  methods: {
    addTask: function () {
      var text = this.newTask.trim()
      if (text) {
        this.tasks.push({'text': text, 'complete': false})
        this.newTask = ''
      }
    }
  },
  ready: function() {
    $('.task-board').height(($(window).height() - 65) + 'px')
  },
  events: {
    'deleteTask': function (index) {
      this.tasks.splice(index, 1)
      console.log(this.tasks);
    }
  }
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vue.component('task', {
  props: {
      task: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
        required: true
      }
  },
  template: '#v-template_task',
  methods: {
    toggleComplete: function () {
      this.task.complete = !this.task.complete
      this.$dispatch('toggle_complete', this.index)
    },
    editTask: function() {
      this.$dispatch('edit_task', this.index)
    },
    deleteTask: function () {
      this.$dispatch('delete_task', this.index)
    }
  },
  events: {
    request_child_postion: function () {
      this.$dispatch('response_child_position', {
        index: this.index,
        top: this.$el.style.top,
        left: this.$el.style.left,
        zIndex: this.$el.style['z-index']
      })
    }
  },
  ready: function () {
    var self = this
    $(this.$el).draggable({
      containment: "parent",
      cancel: 'input',
      stack: 'div',
      distance: 0
    })
    $(this.$el).css({
      'top': ( self.task.top ),
      'left': ( self.task.left )
    })
    $(this.$el).on('dragstop', function (e) {
      self.$dispatch('update_task_position', {
        index: self.index,
        top: e.target.style.top,
        left: e.target.style.left,
        zIndex: e.target.style['z-index']
      })
    })
  }
})

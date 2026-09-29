import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onToggleTask, onEditTask }) => {
  // Eğer hiç görev yoksa kullanıcıya bilgi veriyoruz
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500 font-medium">Henüz bir görev eklenmedi.</p>
        <p className="text-slate-400 text-sm mt-1">Yukarıdaki formdan yeni bir görev ekleyerek başlayabilirsin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onToggle={onToggleTask}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
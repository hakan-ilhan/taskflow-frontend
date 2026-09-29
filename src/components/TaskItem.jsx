import React from 'react';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  // Öncelik durumuna göre rozet (badge) renkleri
  const priorityColors = {
    Düşük: 'bg-green-100 text-green-800 border-green-200',
    Orta: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Yüksek: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div
      className={`p-4 rounded-xl border bg-white shadow-sm flex items-center justify-between gap-4 transition-all hover:shadow-md ${
        task.completed ? 'opacity-60 bg-slate-50 border-slate-200' : 'border-slate-100'
      }`}
    >
      {/* Sol Taraf: Checkbox ve Görev Bilgileri */}
      <div className="flex items-center gap-3 min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer accent-indigo-600"
        />
        <div className="truncate">
          <h3
            className={`font-semibold text-base truncate ${
              task.completed ? 'line-through text-slate-400' : 'text-slate-800'
            }`}
          >
            {task.title}
          </h3>
          <div className="flex gap-2 mt-1 items-center">
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium border border-slate-200">
              {task.category}
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </div>
        </div>
      </div>

      {/* Sağ Taraf: Aksiyon Butonları (Düzenle ve Sil) */}
      <div className="flex gap-1 shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg font-medium text-sm transition-colors"
        >
          Düzenle
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg font-medium text-sm transition-colors"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const HomePage = () => {
  // 1. READ / LISTELEME: Başlangıçta verileri LocalStorage'dan yüklüyoruz
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  // Düzenlenmekte olan görevi tutan state
  const [editingTask, setEditingTask] = useState(null);

  // Veriler her değiştiğinde LocalStorage'a otomatik kaydediyoruz[cite: 1]
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 2. CREATE (Ekleme) & UPDATE (Güncelleme)[cite: 1]
  const handleSaveTask = (task) => {
    if (editingTask) {
      // Eğer düzenleme modundaysak mevcut görevi güncelle
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      setEditingTask(null);
    } else {
      // Yeni görev ekle
      setTasks([task, ...tasks]);
    }
  };

  // 3. DELETE (Silme)[cite: 1]
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    // Eğer silinen görev o an düzenleniyorsa formu temizle
    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  };

  // 4. UPDATE (Tamamlandı/Yapılacak Durumunu Değiştirme)[cite: 1]
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Başlık Alanı */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">TaskFlow</h1>
          <p className="text-slate-600 mt-2 text-sm">Günlük görevlerini yönet ve kolayca takip et</p>
        </header>

        {/* Ana İçerik */}
        <main>
          <TaskForm
            onSaveTask={handleSaveTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
          
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onToggleTask={handleToggleTask}
            onEditTask={(task) => setEditingTask(task)}
          />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
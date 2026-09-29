import React, { useState, useEffect } from "react";

const TaskForm = ({ onSaveTask, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("İş");
  const [priority, setPriority] = useState("Orta");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setCategory(editingTask.category);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setCategory("İş");
      setPriority("Orta");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // İşlemleri handleSubmit FONKSİYONUNUN İÇİNDE yapıyoruz
    onSaveTask({
      id: editingTask ? editingTask.id : Date.now().toString(),
      title,
      category,
      priority,
      completed: editingTask ? editingTask.completed : false,
    });

    setTitle("");
    setCategory("İş");
    setPriority("Orta");
  }; // <-- Süslü parantez burada kapanmalı!

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        {editingTask ? 'Görev Düzenle' : 'Yeni Görev Ekle'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Görev Başlığı Input */}
        <input
          type="text"
          placeholder="Görev başlığı giriniz..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {/* Kategori Seçimi */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="İş">İş</option>
          <option value="Kişisel">Kişisel</option>
          <option value="Eğitim">Eğitim</option>
        </select>

        {/* Öncelik Seçimi */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Düşük">Düşük Öncelik</option>
          <option value="Orta">Orta Öncelik</option>
          <option value="Yüksek">Yüksek Öncelik</option>
        </select>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          {editingTask ? 'Güncelle' : 'Ekle'}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;

import React, { useState, useEffect } from 'react';
import { Moon, Sun, BookOpen, Calculator, Monitor, Save, Send, Trash2, Plus, Check } from 'lucide-react';

interface Task {
  id: string;
  subject: 'português' | 'matemática' | 'tecnologia';
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'draft' | 'submitted';
  content?: string;
}

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskContent, setTaskContent] = useState('');
  const [activeSubject, setActiveSubject] = useState<'português' | 'matemática' | 'tecnologia'>('português');

  // Sample tasks for 8th grade
  const initialTasks: Task[] = [
    // Português
    {
      id: '1',
      subject: 'português',
      title: 'Análise do Texto "O Cortiço"',
      description: 'Leia o primeiro capítulo de "O Cortiço" de Aluísio Azevedo e faça uma análise dos personagens principais, identificando características do Naturalismo.',
      dueDate: '2024-06-20',
      status: 'pending'
    },
    {
      id: '2',
      subject: 'português',
      title: 'Redação sobre Sustentabilidade',
      description: 'Escreva uma redação dissertativa-argumentativa sobre "A importância da sustentabilidade no século XXI". Mínimo 25 linhas.',
      dueDate: '2024-06-18',
      status: 'pending'
    },
    {
      id: '3',
      subject: 'português',
      title: 'Exercícios de Sintaxe',
      description: 'Complete os exercícios sobre predicado verbal, nominal e verbo-nominal. Páginas 45-47 do livro didático.',
      dueDate: '2024-06-22',
      status: 'pending'
    },
    // Matemática
    {
      id: '4',
      subject: 'matemática',
      title: 'Sistemas de Equações',
      description: 'Resolva os 15 sistemas de equações lineares usando o método da substituição e da adição. Mostre todos os cálculos.',
      dueDate: '2024-06-19',
      status: 'pending'
    },
    {
      id: '5',
      subject: 'matemática',
      title: 'Problemas de Geometria',
      description: 'Calcule a área e o perímetro de figuras geométricas compostas. Exercícios 1-10 da página 89.',
      dueDate: '2024-06-21',
      status: 'pending'
    },
    {
      id: '6',
      subject: 'matemática',
      title: 'Função Afim - Gráficos',
      description: 'Construa os gráficos das funções afins e identifique coeficiente angular e linear. Lista de exercícios anexa.',
      dueDate: '2024-06-23',
      status: 'pending'
    },
    // Tecnologia
    {
      id: '7',
      subject: 'tecnologia',
      title: 'Projeto: Site Pessoal',
      description: 'Crie um site pessoal usando HTML, CSS e JavaScript. Deve conter: sobre mim, hobbies, projetos e contato.',
      dueDate: '2024-06-25',
      status: 'pending'
    },
    {
      id: '8',
      subject: 'tecnologia',
      title: 'Algoritmos em Scratch',
      description: 'Desenvolva um jogo simples no Scratch com pelo menos 3 sprites, movimento, pontuação e som.',
      dueDate: '2024-06-24',
      status: 'pending'
    },
    {
      id: '9',
      subject: 'tecnologia',
      title: 'Pesquisa sobre IA',
      description: 'Faça uma pesquisa sobre Inteligência Artificial na educação. Apresente em slides (mínimo 10 slides).',
      dueDate: '2024-06-26',
      status: 'pending'
    }
  ];

  useEffect(() => {
    const savedTasks = localStorage.getItem('schoolTasks');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
      localStorage.setItem('schoolTasks', JSON.stringify(initialTasks));
    }
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem('schoolTasks', JSON.stringify(updatedTasks));
  };

  const saveDraft = () => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { ...task, content: taskContent, status: 'draft' as const }
        : task
    );
    saveTasks(updatedTasks);
    setSelectedTask({ ...selectedTask, content: taskContent, status: 'draft' });
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    successMsg.textContent = 'Rascunho salvo com sucesso!';
    document.body.appendChild(successMsg);
    setTimeout(() => document.body.removeChild(successMsg), 3000);
  };

  const submitTask = () => {
    if (!selectedTask || !taskContent.trim()) return;
    
    const updatedTasks = tasks.filter(task => task.id !== selectedTask.id);
    saveTasks(updatedTasks);
    setSelectedTask(null);
    setTaskContent('');
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    successMsg.textContent = 'Tarefa enviada com sucesso!';
    document.body.appendChild(successMsg);
    setTimeout(() => document.body.removeChild(successMsg), 3000);
  };

  const openTask = (task: Task) => {
    setSelectedTask(task);
    setTaskContent(task.content || '');
  };

  const closeTask = () => {
    setSelectedTask(null);
    setTaskContent('');
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'português': return <BookOpen className="w-5 h-5" />;
      case 'matemática': return <Calculator className="w-5 h-5" />;
      case 'tecnologia': return <Monitor className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'português': return 'bg-red-500';
      case 'matemática': return 'bg-blue-500';
      case 'tecnologia': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredTasks = tasks.filter(task => task.subject === activeSubject);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EduTask</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sistema de Tarefas Escolares</p>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedTask ? (
          <>
            {/* Subject Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-8 max-w-md">
              {['português', 'matemática', 'tecnologia'].map((subject) => (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(subject as any)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeSubject === subject
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {getSubjectIcon(subject)}
                    <span className="capitalize">{subject}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => openTask(task)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${getSubjectColor(task.subject)}`}>
                        {getSubjectIcon(task.subject)}
                        <span className="sr-only">{task.subject}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.status === 'draft' && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                            Rascunho
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          isOverdue(task.dueDate)
                            ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                            : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        }`}>
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {task.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {task.description}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {task.subject}
                        </span>
                        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                          Abrir →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredTasks.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Parabéns! 🎉
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Todas as tarefas de {activeSubject} foram concluídas!
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Task Editor */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Task Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <button
                  onClick={closeTask}
                  className="mb-4 text-white/80 hover:text-white transition-colors"
                >
                  ← Voltar
                </button>
                
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {getSubjectIcon(selectedTask.subject)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{selectedTask.title}</h1>
                    <p className="text-white/80 capitalize">{selectedTask.subject}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <span>📅 Entrega: {formatDate(selectedTask.dueDate)}</span>
                  {selectedTask.status === 'draft' && (
                    <span className="bg-yellow-500/20 px-3 py-1 rounded-full">
                      💾 Rascunho Salvo
                    </span>
                  )}
                </div>
              </div>

              {/* Task Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Descrição da Tarefa
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedTask.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Sua Resposta
                  </label>
                  <textarea
                    value={taskContent}
                    onChange={(e) => setTaskContent(e.target.value)}
                    placeholder="Digite sua resposta aqui..."
                    className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {taskContent.length} caracteres
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={saveDraft}
                    disabled={!taskContent.trim()}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>Salvar Rascunho</span>
                  </button>
                  
                  <button
                    onClick={submitTask}
                    disabled={!taskContent.trim()}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    <span>Enviar Tarefa</span>
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    💡 <strong>Dica:</strong> Você pode salvar seu progresso como rascunho a qualquer momento. 
                    Quando estiver pronto, clique em "Enviar Tarefa" para finalizar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

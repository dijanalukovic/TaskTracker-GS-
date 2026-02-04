using TaskTracker.Api.Data;
using TaskTracker.Api.Models;

namespace TaskTracker.Api.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskDbContext _context;

        public TaskRepository(TaskDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TaskItem> GetAll()
        {
            return _context.Tasks.ToList();
        }

        public TaskItem Add(TaskItem task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
            return task;
        }

        public TaskItem? Update(TaskItem task)
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.Id == task.Id);
            if (existingTask == null)
                return null;

            existingTask.Naslov = task.Naslov;
            existingTask.Opis = task.Opis;
            existingTask.Status = task.Status;

            _context.SaveChanges();
            return existingTask;
        }

        public bool Delete(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return false;

            _context.Tasks.Remove(task);
            _context.SaveChanges();
            return true;
        }
    }
}

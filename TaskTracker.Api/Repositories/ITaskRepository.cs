using TaskTracker.Api.Models;

namespace TaskTracker.Api.Repositories
{
    public interface ITaskRepository
    {
        IEnumerable<TaskItem> GetAll();
        TaskItem Add(TaskItem task);
        TaskItem? Update(TaskItem task);
        bool Delete(int id);
    }
}

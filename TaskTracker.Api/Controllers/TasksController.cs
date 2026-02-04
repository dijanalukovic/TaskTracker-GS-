using Microsoft.AspNetCore.Mvc;
using TaskTracker.Api.Models;
using TaskTracker.Api.Repositories;

namespace TaskTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        public TasksController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        // GET: api/tasks
        [HttpGet]
        public IActionResult GetAll()
        {
            var tasks = _taskRepository.GetAll();
            return Ok(tasks);
        }

        // POST: api/tasks
        [HttpPost]
        public IActionResult Add(TaskItem task)
        {
            task.DatumKreiranja = DateTime.Now;
            var createdTask = _taskRepository.Add(task);
            return Ok(createdTask);
        }

        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, TaskItem task)
        {
            if (id != task.Id)
                return BadRequest("ID mismatch");

            var updatedTask = _taskRepository.Update(task);
            if (updatedTask == null)
                return NotFound();

            return Ok(updatedTask);
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _taskRepository.Delete(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}

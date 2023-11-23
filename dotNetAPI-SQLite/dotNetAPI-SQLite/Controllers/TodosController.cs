using dotNetAPI_SQLite.Database;
using dotNetAPI_SQLite.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotNetAPI_SQLite.Controllers
{
    [Controller]
    [Route("api/v1/Todos")]
    public class TodosController : Controller
    {
        private SQLiteDBContext _dbContext;

        public TodosController(SQLiteDBContext dBContext)
        {
            _dbContext = dBContext;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Todo todo)
        {
            todo.Id = Guid.NewGuid();
            todo.CreatedAt = DateTime.Now;
            await _dbContext.Todos.AddAsync(todo);
            await _dbContext.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpGet]
        public async Task<IActionResult> ReadAll()
        {
            var todos = await _dbContext.Todos.ToListAsync();
            if (todos is null || todos.Count < 1)
            {
                return NotFound();
            }
            return Ok(todos);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> ReadById([FromRoute]Guid id)
        {
            var todo = await _dbContext.Todos.FindAsync(id);
            if (todo is null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id,[FromBody] Todo todo)
        {

            var existingTodo = await _dbContext.Todos.FindAsync(id);

            if (existingTodo is null)
            {
                return NotFound();
            }

            existingTodo.Title = todo.Title;
            existingTodo.Description = todo.Description;
            existingTodo.Tag = todo.Tag;
            existingTodo.ScheduledDateTime = todo.ScheduledDateTime;
            existingTodo.IsActive = todo.IsActive;
            existingTodo.UpdatedAt = DateTime.Now;
            await _dbContext.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var todo = await _dbContext.Todos.FindAsync(id);
            if (todo is null)
            {
                return NotFound();
            }
            else
            {
                _dbContext.Remove(todo);
                await _dbContext.SaveChangesAsync();
                return Ok(todo);
            }
        }
    }
}

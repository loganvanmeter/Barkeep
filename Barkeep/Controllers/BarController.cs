using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BarController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IBarRepository _barRepository;

        public BarController(IBarRepository barRepository)
        {
            _barRepository = barRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var bars = _barRepository.GetAll();
            return Ok(bars);
        }

        [HttpGet("UserBars/{userId}")]
        public IActionResult GetUserBars(int userId)
        {
            var bars = _barRepository.GetAllByUserId(userId);
            return Ok(bars);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var bar = _barRepository.GetById(id);

            if (bar == null)
            {
                return NotFound();
            }
            return Ok(bar);
        }

        [HttpPost]
        public IActionResult Post(Bar bar)
        {
            _barRepository.Add(bar);
            return CreatedAtAction("Get", new { id = bar.Id }, bar);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _barRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Bar bar)
        {
            if (id != bar.Id)
            {
                return BadRequest();
            }

            _barRepository.Update(bar);
            return NoContent();
        }
    }
}

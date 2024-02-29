using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IStateRepository _stateRepository;

        public StateController(IStateRepository stateRepository)
        {
            _stateRepository = stateRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var states = _stateRepository.GetAll();
            return Ok(states);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var state = _stateRepository.GetById(id);

            if (state == null)
            {
                return NotFound();
            }
            return Ok(state);
        }

        [HttpPost]
        public IActionResult Post(State state)
        {
            _stateRepository.Add(state);
            return CreatedAtAction("Get", new { id = state.Id }, state);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _stateRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, State state)
        {
            if (id != state.Id)
            {
                return BadRequest();
            }

            _stateRepository.Update(state);
            return NoContent();
        }
    }
}


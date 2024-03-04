using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProducerController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IProducerRepository _producerRepository;

        public ProducerController(IProducerRepository producerRepository)
        {
            _producerRepository = producerRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var producers = _producerRepository.GetAll();
            return Ok(producers);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var producer = _producerRepository.GetById(id);

            if (producer == null)
            {
                return NotFound();
            }
            return Ok(producer);
        }

        [HttpPost]
        public IActionResult Post(Producer producer)
        {
            _producerRepository.Add(producer);
            return CreatedAtAction("Get", new { id = producer.Id }, producer);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _producerRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Producer producer)
        {
            if (id != producer.Id)
            {
                return BadRequest();
            }

            _producerRepository.Update(producer);
            return NoContent();
        }
    }
}

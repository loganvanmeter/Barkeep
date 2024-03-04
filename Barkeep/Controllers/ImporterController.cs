using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImporterController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IImporterRepository _importerRepository;

        public ImporterController(IImporterRepository importerRepository)
        {
            _importerRepository = importerRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var importers = _importerRepository.GetAll();
            return Ok(importers);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var importer = _importerRepository.GetById(id);

            if (importer == null)
            {
                return NotFound();
            }
            return Ok(importer);
        }

        [HttpPost]
        public IActionResult Post(Importer importer)
        {
            _importerRepository.Add(importer);
            return CreatedAtAction("Get", new { id = importer.Id }, importer);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _importerRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Importer importer)
        {
            if (id != importer.Id)
            {
                return BadRequest();
            }

            _importerRepository.Update(importer);
            return NoContent();
        }
    }
}

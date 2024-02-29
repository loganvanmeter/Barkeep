using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IRegionRepository _regionRepository;

        public RegionController(IRegionRepository regionRepository)
        {
            _regionRepository = regionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var regions = _regionRepository.GetAll();
            return Ok(regions);
        }

        [HttpGet("StateRegions")]
        public IActionResult GetStateRegions()
        {
            var regions = _regionRepository.GetAllStateRegions();
            return Ok(regions);
        }

        [HttpGet("CountryRegions")]
        public IActionResult GetCountryRegions()
        {
            var regions = _regionRepository.GetAllCountryRegions();
            return Ok(regions);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var region = _regionRepository.GetById(id);

            if (region == null)
            {
                return NotFound();
            }
            return Ok(region);
        }

        [HttpPost]
        public IActionResult Post(Region region)
        {
            _regionRepository.Add(region);
            return CreatedAtAction("Get", new { id = region.Id }, region);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _regionRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Region region)
        {
            if (id != region.Id)
            {
                return BadRequest();
            }

            _regionRepository.Update(region);
            return NoContent();
        }
    }
}

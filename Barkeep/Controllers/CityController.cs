using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly ICityRepository _cityRepository;

        public CityController(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var cities = _cityRepository.GetAll();
            return Ok(cities);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var city = _cityRepository.GetById(id);

            if (city == null)
            {
                return NotFound();
            }
            return Ok(city);
        }

        [HttpPost]
        public IActionResult Post(City city)
        {
            _cityRepository.Add(city);
            return CreatedAtAction("Get", new { id = city.Id }, city);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _cityRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, City city)
        {
            if (id != city.Id)
            {
                return BadRequest();
            }

            _cityRepository.Update(city);
            return NoContent();
        }
    }
}

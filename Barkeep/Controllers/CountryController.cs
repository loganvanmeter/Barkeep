using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly ICountryRepository _countryRepository;

        public CountryController(ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var countries = _countryRepository.GetAll();
            return Ok(countries);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var country = _countryRepository.GetById(id);

            if (country == null)
            {
                return NotFound();
            }
            return Ok(country);
        }
    }
}

using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayRateTypeController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IPayRateTypeRepository _payRateTypeRepository;

        public PayRateTypeController(IPayRateTypeRepository payRateTypeRepository)
        {
            _payRateTypeRepository = payRateTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var payRateTypes = _payRateTypeRepository.GetAll();
            return Ok(payRateTypes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var payRateType = _payRateTypeRepository.GetById(id);

            if (payRateType == null)
            {
                return NotFound();
            }
            return Ok(payRateType);
        }

        [HttpPost]
        public IActionResult Post(PayRateType payRateType)
        {
            _payRateTypeRepository.Add(payRateType);
            return CreatedAtAction("Get", new { id = payRateType.Id }, payRateType);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _payRateTypeRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, PayRateType payRateType)
        {
            if (id != payRateType.Id)
            {
                return BadRequest();
            }

            _payRateTypeRepository.Update(payRateType);
            return NoContent();
        }
    }
}

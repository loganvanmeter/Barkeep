using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BarUserController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IBarUserRepository _barUserRepository;

        public BarUserController(IBarUserRepository barUserRepository)
        {
            _barUserRepository = barUserRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var barUsers = _barUserRepository.GetAll();
            return Ok(barUsers);
        }

        [HttpGet("GetByBarId/{barId}/IsActive={isActive}")]
        public IActionResult GetByBarId(int barId, bool isActive)
        {
            var barUsers = _barUserRepository.GetAllByBarId(barId, isActive);
            return Ok(barUsers);
        }

        [HttpGet("GetByUserId/{userId}/IsActive={isActive}")]
        public IActionResult GetByUserId(int userId, bool isActive)
        {
            var barUsers = _barUserRepository.GetAllByUserId(userId, isActive);
            return Ok(barUsers);
        }

        [HttpGet("{id}")]
        public IActionResult GetByEmail(int id)
        {
            var barUser = _barUserRepository.GetById(id);

            if (barUser == null)
            {
                return NotFound();
            }
            return Ok(barUser);
        }

        

        [HttpPost]
        public IActionResult Post(BarUser barUser)
        {
            _barUserRepository.Add(barUser);
            return CreatedAtAction("Get", new { id = barUser.Id }, barUser);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _barUserRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("DeleteBarBarUsers/{barId}")]
        public IActionResult DeleteBarBarUsers(int barId)
        {
            _barUserRepository.DeleteAllBarBarUsers(barId);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, BarUser barUser)
        {
            if (id != barUser.Id)
            {
                return BadRequest();
            }

            _barUserRepository.Update(barUser);
            return NoContent();
        }
    }
}

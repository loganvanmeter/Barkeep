using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IRoleRepository _roleRepository;

        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var roles = _roleRepository.GetAll();
            return Ok(roles);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var role = _roleRepository.GetById(id);

            if (role == null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        [HttpGet("GetByBarId/{barId}")]
        public IActionResult GetByBar(int barId)
        {
            var roles = _roleRepository.GetAllByBarId(barId);
            return Ok(roles);
        }

        [HttpPost]
        public IActionResult Post(Role role)
        {
            _roleRepository.Add(role);
            return CreatedAtAction("Get", new { id = role.Id }, role);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _roleRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Role role)
        {
            if (id != role.Id)
            {
                return BadRequest();
            }

            _roleRepository.Update(role);
            return NoContent();
        }
    }
}
}

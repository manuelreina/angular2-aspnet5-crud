using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using AngularUniversal.Models;
using System.Net;
using AngularUniversal.Services;

namespace AngularUniversal.Controllers
{
    [Route("api/[controller]")]
    public class CRUDController : Controller
    {
        public ICRUDRepository CRUDRepository { get; set; }

        public CRUDController(ICRUDRepository _CRUDRepository)
        {
            CRUDRepository = _CRUDRepository;
        }
        
        [HttpGet]
        public IEnumerable<BuiltWith> Get()
        {
            return CRUDRepository.GetAll();
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var builtWith = CRUDRepository.Find(id);
            if (builtWith != null)
            {
                return Ok(builtWith);
            }
            else
            {
                return HttpNotFound();
            }
        }
        
        [HttpPost]
        public IActionResult Post([FromBody] BuiltWith builtWith)
        {
            CRUDRepository.Add(builtWith);
            return Ok(builtWith);
        }
        
        [HttpPut]
        public IActionResult Put([FromBody] BuiltWith builtWith)
        {
            var duplicate = CRUDRepository.AnyDuplicate(builtWith);
            if (duplicate)
            {
                return new HttpStatusCodeResult((int)HttpStatusCode.Conflict);
            }
            else
            {
                var update = CRUDRepository.Update(builtWith);
                if (update)
                {
                    return Ok(builtWith);
                }
                else
                {
                    return HttpNotFound();
                }
            }
            //return builtWith;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var delete = CRUDRepository.Remove(id);
            if (delete )
            {
                return Ok(delete);
            }
            else
            {
                return HttpNotFound();
            }
        }
    }
}

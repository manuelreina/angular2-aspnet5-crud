using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using AngularUniversal.Models;
using System.Net;

namespace AngularUniversal.Controllers
{
    [Route("api/[controller]")]
    public class CRUDController : Controller
    {
        private List<BuiltWith> builtWithList;

        public CRUDController()
        {
            builtWithList = new List<BuiltWith>
            {
                new BuiltWith { ID = 1, Name = "Angular 2", Pending = false },
                new BuiltWith { ID = 2, Name = "Asp.net Core", Pending = false },
                new BuiltWith { ID = 3, Name = "Webpack", Pending = false },
            };
        }
        
        [HttpGet]
        public IEnumerable<BuiltWith> Get()
        {
            return builtWithList;
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var builtWith = builtWithList.FirstOrDefault(bw => bw.ID == id);
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
        public IActionResult Post(BuiltWith builtWith)
        {
            builtWithList.Add(builtWith);
            return Ok(builtWith);
        }
        
        [HttpPut("{id}")]
        public IActionResult Put(BuiltWith builtWith)
        {
            var duplicate = builtWithList.Any(bw => bw.Name == builtWith.Name && bw.ID != builtWith.ID);
            if (duplicate)
            {
                return new HttpStatusCodeResult((int)HttpStatusCode.Conflict);
            }
            else
            {
                var update = builtWithList.FirstOrDefault(bw => bw.ID == builtWith.ID);
                if (update != null)
                {
                    update = builtWith;
                    return Ok(builtWith);
                }
                else
                {
                    return HttpNotFound();
                }
            }
            
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var delete = builtWithList.FirstOrDefault(bw => bw.ID == id);
            if (delete != null)
            {
                builtWithList.Remove(delete);
                return Ok(delete);
            }
            else
            {
                return HttpNotFound();
            }
        }
    }
}

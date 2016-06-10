using AngularUniversal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularUniversal.Services
{
    public interface ICRUDRepository
    {
        void Add(BuiltWith item);
        IEnumerable<BuiltWith> GetAll();
        BuiltWith Find(int id);
        bool AnyDuplicate(BuiltWith item);
        bool Remove(int Id);
        bool Update(BuiltWith item);
    }

    public class CRUDRepository : ICRUDRepository
    {
        static List<BuiltWith> builtWithList = new List<BuiltWith>
        {
                new BuiltWith { ID = 1, Name = "Angular 2 + TypeScript", Pending = false },
                new BuiltWith { ID = 2, Name = "Asp.net Core", Pending = false },
                new BuiltWith { ID = 3, Name = "Progressive Web Apps", Pending = false },
                new BuiltWith { ID = 3, Name = "Webpack", Pending = false },
                new BuiltWith { ID = 3, Name = "Grunt", Pending = false },
                new BuiltWith { ID = 3, Name = "Bootstrap", Pending = false },
                new BuiltWith { ID = 3, Name = "Angular Material 2", Pending = true }
        };

        public void Add(BuiltWith item)
        {
            var lastItem = builtWithList.Last();
            if (lastItem != null)
            {
                item.ID = lastItem.ID + 1;
            }
            
            builtWithList.Add(item);
        }

        public BuiltWith Find(int id)
        {
            return builtWithList
                .Where(e => e.ID == id)
                .SingleOrDefault();
        }

        public bool AnyDuplicate(BuiltWith item)
        {
            return builtWithList.Any(bw => bw.Name == item.Name && bw.ID != item.ID);
        }

        public IEnumerable<BuiltWith> GetAll()
        {
            return builtWithList;
        }

        public bool Remove(int Id)
        {
            var itemToRemove = builtWithList.SingleOrDefault(r => r.ID == Id);
            if (itemToRemove != null)
            {
                builtWithList.Remove(itemToRemove);
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Update(BuiltWith item)
        {
            var itemToUpdate = builtWithList.SingleOrDefault(r => r.ID == item.ID);
            if (itemToUpdate != null)
            {
                itemToUpdate.Name = item.Name;
                itemToUpdate.Pending = item.Pending;
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}

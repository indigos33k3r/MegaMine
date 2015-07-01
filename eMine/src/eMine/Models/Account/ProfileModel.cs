﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Account
{
    public class ProfileModel
    {
        public string UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string FullName { get { return FirstName + " " + LastName; } }
        public int CompanyId { get; set; }
    }
}
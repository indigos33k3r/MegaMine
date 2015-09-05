﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Shared
{
    public class AjaxModel<T>
    {
        public AjaxResult Result { get; set; }
        public string Message { get; set; }
        public T Model { get; set; }
    }
}
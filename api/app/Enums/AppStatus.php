<?php 

namespace App\Enums;

enum AppStatus: int
{
    case Active = 1;
    case Disabled = 2;
    case Hidden = 3;
}
<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\App;
use App\Enums\AppStatus;

class AppsController extends Controller
{
    public function index()
    {
        $apps = App::where('status', AppStatus::Active)->get();
        return Inertia::render('Apps', [
            'apps' => $apps,
        ]);
    }

    public function show(App $app)
    {
        return Inertia::render('Apps/'.ucfirst($app->getAttribute('slug')), [
            'app' => $app,
        ]);
    }
}

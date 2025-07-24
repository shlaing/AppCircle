<?php

namespace Database\Seeders;

use App\Enums\AppStatus;
use App\Models\App;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $app = new App([
            'name' => 'Base64 Encode/Decode',
            'description' => 'To encode and decode Base64 strings',
            'icon' => 'images/apps/base64-icon.png',
            'status' => AppStatus::Active,
        ]);
        $app->save();

        // $app = new App([
        //     'name' => 'Test App 2',
        //     'description' => 'Test App 2 Description',
        //     'icon' => 'images/apps/test-app-icon.png',
        //     'status' => AppStatus::Active,
        // ]);
        // $app->save();
    }
}

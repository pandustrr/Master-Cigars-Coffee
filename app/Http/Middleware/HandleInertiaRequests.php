<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = \Illuminate\Support\Facades\App::getLocale();
        $translations = [];
        
        $langFile = base_path("lang/{$locale}.json");
        if (file_exists($langFile)) {
            $translations = json_decode(file_get_contents($langFile), true);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'settings' => SiteSetting::all()->pluck('value', 'key'),
            'locale' => $locale,
            'translations' => $translations,
        ];
    }
}

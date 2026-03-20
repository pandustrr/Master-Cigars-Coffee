<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <!-- Primary Meta Tags -->
        <title inertia>{{ config('app.name', 'Master Cigars & Coffee') }}</title>
        <meta name="title" content="Master Cigars & Coffee">
        <meta name="description" content="Discover the finest selection of premium cigars and high-quality coffee at Master Cigars & Coffee. Experience luxury and taste in every puff and sip.">
        <meta name="keywords" content="cigars, premium coffee, cigar lounge, coffee beans, luxury lifestyle, Master Cigars and Coffee">
        <meta name="author" content="Master Cigars & Coffee">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="{{ url()->current() }}">
        
        <!-- Google Search Console Verification (Ganti konten di bawah jika sudah ada kodenya) -->
        <meta name="google-site-verification" content="PASTE_KODE_VERIFIKASI_GOOGLE_DI_SINI" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="Master Cigars & Coffee - Premium Selection">
        <meta property="og:description" content="Discover the finest selection of premium cigars and high-quality coffee. Luxury in every puff and sip.">
        <meta property="og:image" content="{{ asset('icon.png') }}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ url()->current() }}">
        <meta property="twitter:title" content="Master Cigars & Coffee">
        <meta property="twitter:description" content="Premium cigars and high-quality coffee selection.">
        <meta property="twitter:image" content="{{ asset('icon.png') }}">

        <link rel="icon" type="image/png" href="/icon.png">
        <link rel="apple-touch-icon" href="/icon.png">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

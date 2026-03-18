<html lang="en">

<head>
    <!-- favicon -->
    <link rel="shortcut icon" href="images/logo.png" />
    <!-- theme meta -->
    <meta name="theme-name" content="laundry" />
    <meta name="msapplication-TileColor" content="#000000" />
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
    <meta name="generator" content="gulp" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <!-- responsive meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

    <!-- title -->
    <title>{{ env('APP_NAME') }}</title>

    <!-- noindex robots -->
    <meta name="robots" content="" />

    <!-- meta-description -->
    <meta name="description" content="meta description" />

    <!-- author from config.json -->
    <meta name="author" content="{config.metadata.meta_author}" />

    <!-- og-title -->
    <meta property="og:title" content="" />

    <!-- og-description -->
    <meta property="og:description" content="" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="/" />

    <!-- twitter-title -->
    <meta name="twitter:title" content="" />

    <!-- twitter-description -->
    <meta name="twitter:description" content="" />

    <!-- og-image -->
    <meta property="og:image" content="" />

    <!-- twitter-image -->
    <meta name="twitter:image" content="" />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- google font css -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <link href="https://fonts.googleapis.com/css2?family=<%= fontPrimary %>&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=<%= fontSecondary %>&display=swap" rel="stylesheet" />

    <!-- styles -->

    <!-- Swiper slider -->
    <link rel="stylesheet" href="{{ asset('web/plugins/swiper/swiper-bundle.css') }}" />

    <!-- Fontawesome -->
    <link rel="stylesheet" href="{{ asset('web/plugins/font-awesome/v6/brands.css') }}" />
    <link rel="stylesheet" href="{{ asset('web/plugins/font-awesome/v6/solid.css') }}" />
    <link rel="stylesheet" href="{{ asset('web/plugins/font-awesome/v6/fontawesome.css') }}" />

    <!-- Main Stylesheet -->
    <!-- <link href="styles/main.css" rel="stylesheet" /> -->
    <link rel="stylesheet" href="{{ asset('web/styles/mains.css') }}">
</head>

<body>
    <!-- header -->
    <header class="header">
        <nav class="navbar container">
            <!-- logo -->
            <div class="order-0">
                <a href="{{ route('home') }}">
                    <img src="{{ env('IMG_URL').$app_settings->logo }}" height="50" width="50" alt="logo" />
                </a>
            </div>
            <!-- navbar toggler -->
            <input id="nav-toggle" type="checkbox" class="hidden" />
            <label id="show-button" for="nav-toggle"
                class="order-1 flex cursor-pointer items-center lg:order-1 lg:hidden">
                <svg class="h-6 fill-current" viewBox="0 0 20 20">
                    <title>Menu Open</title>
                    <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
                </svg>
            </label>
            <label id="hide-button" for="nav-toggle" class="order-2 hidden cursor-pointer items-center lg:order-1">
                <svg class="h-6 fill-current" viewBox="0 0 20 20">
                    <title>Menu Close</title>
                    <polygon points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                        transform="rotate(45 10 10)"></polygon>
                </svg>
            </label>
            <!-- /navbar toggler -->
            <ul id="nav-menu"
                class="navbar-nav order-2 hidden w-full flex-[0_0_100%] lg:order-1 lg:flex lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5">
                <li class="nav-item">
                    <a href="{{ route('home') }}" class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}">Home</a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('faq') }}" class="nav-link {{ request()->routeIs('faq') ? 'active' : '' }}">FAQ</a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('privacy') }}" class="nav-link {{ request()->routeIs('privacy') ? 'active' : '' }}">Privacy Policy</a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('terms') }}" class="nav-link {{ request()->routeIs('terms') ? 'active' : '' }}">Terms & Conditions</a>
                </li>
                
            </ul>
            <div class="order-1 ml-auto hidden items-center md:order-2 md:ml-0 lg:flex">
                <a class="btn btn-white btn-sm" target="_blank" href="{{ $website_settings->contact_link }}">Contact Us</a>
            </div>
        </nav>
    </header>
    <!-- header -->

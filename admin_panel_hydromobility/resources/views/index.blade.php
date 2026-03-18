@include('header')
<main>
    <!-- Banner -->
    <section class="section banner relative">
        <div class="container">
            <div class="row items-center">
                <div class="lg:col-6">
                    <h1 class="banner-title">
                        {{ $website_settings->title }}
                    </h1>
                    <p class="mt-6">
                        {{ $website_settings->description }}
                    </p>
                    <!-- <a class="btn btn-white mt-8" href="#">Download The Theme</a> -->
                </div>
                <div class="lg:col-6">
                    <img src="{{ env('IMG_URL').$website_settings->banner_image }}" class="" width="500" alt="">
                </div>
            </div>
        </div>
        <svg class="banner-shape absolute -top-28 right-0 -z-[1] w-full max-w-[30%]" width="800" height="800">
            <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="100%" style="stop-color: {{ $website_settings->website_color }}; stop-opacity: 1" />
                    <stop offset="50%" style="stop-color: {{ $website_settings->website_color }}; stop-opacity: 1" />
                </linearGradient>
            </defs>
            <circle cx="400" cy="10" r="400" fill="url(#blueGradient)" />
        </svg>
    </section>
    <!-- ./end Banner -->

    <!-- Key features -->

    <!-- ./end Key features -->

    <!-- ourservices -->
    <section class="page-hero pb-14 pt-16">
        <div class="container">

            <div class="page-hero-content mx-auto max-w-[883px] text-center">
                <h1 class="mb-5 mt-8">
                    Our Services
                </h1>
                <p>
                 Book a ride, hop in, and relax. Taxi2Door will get you to your destination safely and on time.
                </p>
            </div>

            <div class="row mt-14">
                @foreach($our_services as $key => $value)
                <div class="mt-10 text-center sm:col-6 md:col-3 md:mb-0">
                    <div
                        @if((count($our_services) - 1) != $key) class="relative mx-auto mb-8 flex h-[184px] w-[184px] items-center justify-center rounded-xl bg-white p-4 shadow-lg after:absolute after:-right-4 after:-z-[1] after:hidden after:w-full after:translate-x-full after:border-b-2 after:border-dashed after:border-primary/50 after:content-[''] md:after:block " @else class="mx-auto mb-8 flex h-[184px] w-[184px] items-center justify-center rounded-xl bg-white p-4 shadow-lg" @endif>
                        <img src="{{ env('IMG_URL').$value->icon }}" style="height:100px;width:100px;" alt="" />
                    </div>
                    <h2 class="h5">{{ $value->title }}</h2>
                    <p class="mt-4">
                        {{ $value->description }}
                    </p>
                </div>
                @endforeach
                <!--<div class="mt-10 text-center sm:col-6 md:col-4 md:mb-0">
                    <div
                        class="mx-auto mb-8 flex h-[184px] w-[184px] items-center justify-center rounded-xl bg-white p-4 shadow-lg">
                        <img src="{{ asset('web/images/delivery-service.png') }}" alt="" />
                    </div>
                    <h2 class="h5">Receive Clean Clothes</h2>
                    <p class="mt-4">
                        Enjoy your freshly cleaned and pressed clothes delivered to you.
                    </p>
                </div>-->
            </div>
        </div>
    </section>

    <section class="section mt-10 pb-0">
        <div class="container mt-10">
            <div class="row">
          
                <div class="mx-auto text-center lg:col-8">
                    <h2>Ride Options</h2>
                    <p class="mt-4">
                        A diverse range of vehicles designed to meet various needs, from compact cars to powerful SUVs,
                        offering comfort, performance, and style.
                    </p>
                </div>
            </div>
            <div class="row mt-14 text-center">
            @foreach($vehicle_categories as $key => $value)
                <div class="mb-10 sm:col-6 lg:col-3">
                    <img class="mx-auto" src="{{ env('IMG_URL').$value->active_icon }}" width="100" h="90" alt="">
                    <h3 class="h4 mt-8 mb-4">{{ $value->vehicle_type }}</h3>
                    <p>
                    {{ $value->description }}                    </p>
                </div>
                @endforeach 
    

            </div>
        </div>
    </section>
    <!-- steps -->

    <!-- faq -->
    <section class=" features mb-5">
        <div class="container">

            <div class="row mt-[120px] items-center" data-tab-group="features-tab">
                <div class="col-8 mx-auto mb-10 text-center">
                    <h1 class="mb-5 mt-8">
                        Available on iOS and Android
                    </h1>
                    <p>Download the Taxi2Door app today on iOS and Android for a seamless ride experience at your fingertips!
                    </p>
                </div>
                <div class="lg:col-6" data-tab-content>
                    <div class="relative" data-tab-panel="0">
                        <img class="w-full object-contain" src="{{ env('IMG_URL').$website_settings->store_image }}" />
                    </div>

                </div>
                <div class="mt-6 lg:col-6 lg:mt-0">
                    <div class="lg:max-w-[473px]">
                        <div class="" data-tab="0">
                            <h2 class="lg:text-2xl">
                                {{ $website_settings->store_title }}
                            </h2>
                            <p class="mt-4">
                                {{ $website_settings->store_description }}
                            </p>
                            <div class="mt-11 sm:flex">
                                <a class="inline-flex items-center btn btn-primary m-3 min-w-[160px]" href="{{ $website_settings->playstore_link }}">
                                    <span class="mr-3"><img src="{{ asset('web/images/android.svg') }}"
                                            width="30" alt=""></span>
                                    <span>Android</span>
                                </a>
                                <a href="{{ $website_settings->appstore_link }}" class="inline-flex items-center btn btn-outline-primary m-3 min-w-[160px]"
                                    >
                                    <span class="mr-3"><img src="{{ asset('web/images/ios.svg') }}" width="30"
                                            alt=""></span>
                                    <span>iOS</span>
                                </a>
                             
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- faq -->

    <!-- Reviews -->
    <section class="reviews pb-14 pt-16">
        <div class="container">
            <div class="row justify-center text-center">
                <div class="lg:col-12">
                    <h1 class="mb-5 mt-8">What Our Customers Say</h1>
                    <p>
                     Hear from our satisfied riders about how Taxi2Door has made their journeys stress-free and convenient!
                    </p>
                </div>
            </div>
            <div class="row mt-10">
                <div class="col-12">
                    <div class="swiper reviews-carousel">
                        <div class="swiper-wrapper">
                            @foreach($testimonials as $key => $value)
                            <div class="swiper-slide">
                                <div class="review">
                                    <div class="review-author-avatar bg-gradient">
                                        <img src="{{ env('IMG_URL').$value->avatar }}" alt="" />
                                    </div>
                                    <h4 class="mb-2">{{ $value->name }}</h4>
                                    <p class="mb-4 text-[#666]">{{ $value->role }}</p>
                                    <p>
                                        {{ $value->comments }}
                                    </p>
                                    <div class="review-rating mt-6 flex items-center justify-center space-x-2.5">
                                        <img src="{{ asset('web/images/star.svg') }}" alt="" />
                                        <img src="{{ asset('web/images/star.svg') }}" alt="" />
                                        <img src="{{ asset('web/images/star.svg') }}" alt="" />
                                        <img src="{{ asset('web/images/star.svg') }}" alt="" />
                                        <img src="{{ asset('web/images/star.svg') }}" alt="" />
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                        <!-- If we need pagination -->
                        <div class="swiper-pagination reviews-carousel-pagination !bottom-0"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Reviews -->

    <!-- Call To action -->
    <section class="px-5 py-20 xl:py-[120px]">
        <div class="container">
            <div class="bg-gradient row justify-center rounded-b-[80px] rounded-t-[20px] px-[30px] pb-[75px] pt-16">
                <div class="lg:col-11">
                    <div class="row">
                        <div class="lg:col-12">
                            <h2 class="h1 text-white">Need Help? Contact Taxi2door App</h2>
                            <p class="text-white" style="color: rgb(254, 254, 254);">
                                Click to connect with Taxi2door and get the support you need.
                                Our team is ready to assist with any concerns or questions you may have, ensuring a
                                seamless ride experience.
                            </p>
                            <a class="btn btn-white mt-8" target="_blank" href="{{ $website_settings->contact_link }}"> Contact Us</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
@include('footer')

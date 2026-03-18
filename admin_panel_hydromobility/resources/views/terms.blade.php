@include('header')
<main>

    <svg class="floating-bubble-1 absolute right-0 top-0 -z-[1]" width="100" >
        <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="100%" style="stop-color: {{ $website_settings->website_color }}; stop-opacity: 1" />
                <stop offset="50%" style="stop-color: {{ $website_settings->website_color }}; stop-opacity: 1" />
            </linearGradient>
        </defs>
        <circle cx="80" cy="30" r="80" fill="url(#blueGradient)" />
    </svg>

    <svg class="floating-bubble-2 absolute left-0 top-[387px] -z-[1]" >
        <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="100%" style="stop-color: {{ $website_settings->website_color }}; stop-opacity: 1" />
                <stop offset="50%" style="stop-color: {{ $website_settings->website_color }}; stop-opacity: 1" />
            </linearGradient>
        </defs>
        <circle cx="5" cy="50" r="30" fill="url(#blueGradient)" />
    </svg>

    <svg class="floating-bubble-3 absolute right-0 top-[605px] -z-[1]" width="200px" height="250px"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="100%" style="stop-color: {{ $website_settings->website_color }}; stop-opacity: 1" />
                <stop offset="50%" style="stop-color: {{ $website_settings->website_color }}; stop-opacity: 1" />
            </linearGradient>
        </defs>
        <circle cx="200" cy="180" r="40" fill="url(#blueGradient)" />
    </svg>
    <!-- ./end floating assets -->

    <!-- Common hero -->
    <section class="page-hero py-16">
        <div class="container">

            <div class="page-hero-content mx-auto max-w-[768px] text-center">
                <h1 class="mb-5 mt-8">Terms & Conditions</h1>
            </div>
        </div>
    </section>
    <!-- end Common hero -->

    <section class="section career-single pt-0">
        <div class="container">
            <div class="row lg:gx-4">
                <div class="lg:col-12">
                    <div class="career-single-content rounded-xl bg-white p-7 shadow-lg lg:px-12 lg:py-[60px]">
                        @foreach($data as $key => $value)
                        <h5 class="h5">{{ $value->title }} </h5>
                        <p>
                            {{ $value->terms }}
                        </p>
                        @endforeach
                    </div>
                </div>

            </div>
        </div>
    </section>

</main>
@include('footer')

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
    <svg class="floating-bubble-3 absolute right-0 top-[605px] -z-[1]" width="200px" height="250px">
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
                <h1 class="mb-5 mt-8">Frequently Asked</h1>
                <p>
                    FAQ's Advantages or benefits of the topic to help users understand why it's important or valuable.
                </p>
            </div>
        </div>
    </section>
    <!-- end Common hero -->



    <!-- Faq -->
    <section class="faqs section">
        <div class="container max-w-[1230px]">
            <div class="row">

                <div class="mt-8 lg:col-12 lg:mt-0">
                    <div class="rounded-xl bg-white px-5 py-5 shadow-lg lg:px-10 lg:py-8">
                        @foreach($data as $key => $value)
                        <div class="accordion border-b border-border">
                            <div class="accordion-header relative pl-6 text-lg font-semibold text-dark" data-accordion>
                                {{ $value->question }}
                                <svg class="accordion-icon absolute left-0 top-[22px]" x="0px" y="0px"
                                    viewBox="0 0 512 512" xmlspace="preserve">
                                    <path fill="currentColor"
                                        d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z">
                                    </path>
                                </svg>
                            </div>
                            <div class="accordion-content pl-6">
                                <p>
                                    {{ $value->answer }}
                                </p>

                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

@include('footer')

<script setup>
import I18NRouterLink from "./I18NRouterLink.vue";
import FeaturedContributors from "./FeaturedContributors.vue";
import { useData } from 'vitepress';
import { get_i18n_str } from "../composables/useI18N";

const { frontmatter } = useData();
</script>
<template>
  <div class="onboarding">
    <div class="row hero">
      <div class="col-12 col-md-6 col-lg-5 order-2 order-md-1">
        <div class="hero-text">
          <h1 class="hero-title">
            {{ get_i18n_str(frontmatter.locale, "onboarding-title", "Build on the Permaweb.") }}
          </h1>
          <p class="hero-body-text">
            {{ get_i18n_str(frontmatter.locale, "onboarding-desc", "A curated collection of developer guides & more to build on the Permaweb. All in one place.") }}
          </p>
          <I18NRouterLink
            style="color: var(--c-accent-rose)"
            class="hero-body-text"
            to="/getting-started/index.html"
          >
            {{ get_i18n_str(frontmatter.locale, "get-started", "Get Started") }}
          </I18NRouterLink>
        </div>

        <FeaturedContributors />
      </div>

      <div class="col-12 col-md-6 offset-lg-1 order-1 order-md-2">
        <I18NRouterLink to="/#documentation" class="onboard-illustration">
          <div class="illustration"></div>
        </I18NRouterLink>
      </div>

      <div class="col-12 order-3">
        <div style="text-align: center; margin-top: 60px; opacity: 0.1">
          <svg
            width="33"
            height="17"
            viewBox="0 0 33 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="text-fill"
              d="M30.513 0.375433L16.8219 13.7214L3.13073 0.375433C2.88611 0.136502 2.55774 0.00273913 2.21579 0.00273913C1.87385 0.00273913 1.54547 0.136502 1.30086 0.375433C1.18242 0.491482 1.08832 0.629998 1.02408 0.782869C0.959845 0.935741 0.926758 1.09989 0.926758 1.26571C0.926758 1.43153 0.959845 1.59568 1.02408 1.74856C1.08832 1.90143 1.18242 2.03994 1.30086 2.15599L15.8659 16.3567C16.1216 16.606 16.4647 16.7455 16.8219 16.7455C17.1791 16.7455 17.5221 16.606 17.7779 16.3567L32.3429 2.15873C32.4622 2.0426 32.557 1.90374 32.6217 1.75036C32.6865 1.59698 32.7198 1.43219 32.7198 1.26571C32.7198 1.09923 32.6865 0.934441 32.6217 0.781063C32.557 0.627685 32.4622 0.488829 32.3429 0.372693C32.0983 0.133762 31.7699 0 31.428 0C31.086 0 30.7577 0.133762 30.513 0.372693V0.375433Z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="row cards">
      <div class="col-12">
        <h2 class="header">
          {{ get_i18n_str(frontmatter.locale, "first-time", "First Time?") }}
        </h2>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <I18NRouterLink
          to="/getting-started/quick-starts/hw-no-code.html"
          class="onboard-card"
        >
          <div class="card-content">
            <div class="icon-container">
              <div class="icon">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_di_210_4)">
                    <path
                      d="M43.8003 4.5175L26.5301 39.0595C26.2261 39.6912 25.7131 40 24.9911 40C24.9009 40 24.7631 39.981 24.5874 39.943C24.1932 39.8527 23.8702 39.6485 23.6279 39.335C23.3857 39.0262 23.267 38.6652 23.267 38.2663V22.729H7.72568C7.33145 22.729 6.97996 22.6103 6.65698 22.368C6.34824 22.1258 6.13925 21.8075 6.04901 21.4085C5.95876 21.0142 5.99201 20.639 6.15825 20.2733C6.3245 19.917 6.57623 19.6415 6.94197 19.461L41.4824 2.19C41.7151 2.06175 41.9763 2 42.2661 2C42.7553 2 43.1543 2.171 43.4773 2.513C43.748 2.76 43.9143 3.0735 43.976 3.444C44.0378 3.824 43.9808 4.1755 43.8003 4.5175Z"
                      fill="#9555F1"
                    />
                    <path
                      d="M43.8003 4.5175L26.5301 39.0595C26.2261 39.6912 25.7131 40 24.9911 40C24.9009 40 24.7631 39.981 24.5874 39.943C24.1932 39.8527 23.8702 39.6485 23.6279 39.335C23.3857 39.0262 23.267 38.6652 23.267 38.2663V22.729H7.72568C7.33145 22.729 6.97996 22.6103 6.65698 22.368C6.34824 22.1258 6.13925 21.8075 6.04901 21.4085C5.95876 21.0142 5.99201 20.639 6.15825 20.2733C6.3245 19.917 6.57623 19.6415 6.94197 19.461L41.4824 2.19C41.7151 2.06175 41.9763 2 42.2661 2C42.7553 2 43.1543 2.171 43.4773 2.513C43.748 2.76 43.9143 3.0735 43.976 3.444C44.0378 3.824 43.9808 4.1755 43.8003 4.5175Z"
                      fill="url(#paint0_linear_210_4)"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_di_210_4"
                      x="0"
                      y="0"
                      width="50"
                      height="50"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_210_4"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_210_4"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="1" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_210_4"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_210_4"
                      x1="49"
                      y1="-3.5"
                      x2="-6.99868"
                      y2="52.5013"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0.38" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <h2 class="title">
              {{ get_i18n_str(frontmatter.locale, "hello-world", "Hello World") }}
            </h2>
            <p class="body-text">
              {{ get_i18n_str(frontmatter.locale, "hello-world-card-desc") }}
            </p>
          </div>

          <span
            style="color: var(--c-accent-violet)"
            class="body-text card-action"
            >
            {{ get_i18n_str(frontmatter.locale, "hello-world-card-action") }}
            </span
          >
        </I18NRouterLink>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <I18NRouterLink to="/concepts/index.html" class="onboard-card">
          <div class="card-content">
            <div class="icon-container">
              <div class="icon">
                <svg
                  width="56"
                  height="50"
                  viewBox="0 0 56 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_di_201_144)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M39.2399 3.42824C41.1437 1.5239 44.2307 1.52392 46.1345 3.42829L49.286 6.58043C50.238 7.53257 50.238 9.0763 49.286 10.0284C48.3341 10.9806 46.7907 10.9806 45.8388 10.0285L42.6872 6.87623L38.7756 10.7887L41.8501 13.8639C42.8021 14.816 42.8021 16.3598 41.8501 17.3119C40.8982 18.264 39.3548 18.264 38.4028 17.3119L35.3283 14.2367L26.3034 23.2635C27.3393 24.9386 27.9385 26.9148 27.9385 29.0285C27.9385 35.0879 23.0274 40 16.9692 40C10.9111 40 6 35.0879 6 29.0285C6 22.9691 10.9111 18.057 16.9692 18.057C19.1466 18.057 21.1777 18.6931 22.8841 19.7875L39.2399 3.42824ZM16.9692 22.9332C13.6036 22.9332 10.8752 25.6621 10.8752 29.0285C10.8752 32.3948 13.6036 35.1238 16.9692 35.1238C20.3349 35.1238 23.0632 32.3948 23.0632 29.0285C23.0632 27.3667 22.4017 25.8645 21.3223 24.7629C20.2134 23.631 18.675 22.9332 16.9692 22.9332Z"
                      fill="#F9CD92"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M39.2399 3.42824C41.1437 1.5239 44.2307 1.52392 46.1345 3.42829L49.286 6.58043C50.238 7.53257 50.238 9.0763 49.286 10.0284C48.3341 10.9806 46.7907 10.9806 45.8388 10.0285L42.6872 6.87623L38.7756 10.7887L41.8501 13.8639C42.8021 14.816 42.8021 16.3598 41.8501 17.3119C40.8982 18.264 39.3548 18.264 38.4028 17.3119L35.3283 14.2367L26.3034 23.2635C27.3393 24.9386 27.9385 26.9148 27.9385 29.0285C27.9385 35.0879 23.0274 40 16.9692 40C10.9111 40 6 35.0879 6 29.0285C6 22.9691 10.9111 18.057 16.9692 18.057C19.1466 18.057 21.1777 18.6931 22.8841 19.7875L39.2399 3.42824ZM16.9692 22.9332C13.6036 22.9332 10.8752 25.6621 10.8752 29.0285C10.8752 32.3948 13.6036 35.1238 16.9692 35.1238C20.3349 35.1238 23.0632 32.3948 23.0632 29.0285C23.0632 27.3667 22.4017 25.8645 21.3223 24.7629C20.2134 23.631 18.675 22.9332 16.9692 22.9332Z"
                      fill="url(#paint0_linear_201_144)"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_di_201_144"
                      x="0"
                      y="0"
                      width="56"
                      height="50"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_201_144"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_201_144"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="1" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_201_144"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_201_144"
                      x1="53.5"
                      y1="-5.5"
                      x2="11.3441"
                      y2="51.2034"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0.38" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <h2 class="title">
              {{ get_i18n_str(frontmatter.locale, "core-concepts") }}
            </h2>
            <p class="body-text">
              {{ get_i18n_str(frontmatter.locale, "core-concepts-card-desc") }}
            </p>
          </div>

          <span
            style="color: var(--c-accent-sunny)"
            class="body-text card-action"
            >{{ get_i18n_str(frontmatter.locale, "core-concepts-card-action") }}</span
          >
        </I18NRouterLink>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <I18NRouterLink to="/guides/index.html" class="onboard-card">
          <div class="card-content">
            <div class="icon-container">
              <div class="icon">
                <svg
                  width="55"
                  height="52"
                  viewBox="0 0 55 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_di_201_146)">
                    <path
                      d="M48.4573 6.26206V31.8849C48.4573 33.9229 46.8015 35.8334 44.7636 36.0882L44.063 36.1731C39.4352 36.7887 32.3024 39.1451 28.2265 41.3953C27.9505 41.5652 27.6108 41.6288 27.2287 41.6288V7.59946C27.6321 7.59946 28.0354 7.49332 28.3538 7.30226L28.7147 7.06875C32.4934 4.69114 39.2653 2.41968 43.7234 2.03757H43.8507C46.3769 1.82528 48.4573 3.71463 48.4573 6.26206Z"
                      fill="#DA7373"
                    />
                    <path
                      d="M48.4573 6.26206V31.8849C48.4573 33.9229 46.8015 35.8334 44.7636 36.0882L44.063 36.1731C39.4352 36.7887 32.3024 39.1451 28.2265 41.3953C27.9505 41.5652 27.6108 41.6288 27.2287 41.6288V7.59946C27.6321 7.59946 28.0354 7.49332 28.3538 7.30226L28.7147 7.06875C32.4934 4.69114 39.2653 2.41968 43.7234 2.03757H43.8507C46.3769 1.82528 48.4573 3.71463 48.4573 6.26206Z"
                      fill="url(#paint0_linear_201_146)"
                    />
                    <g opacity="0.4">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M27.2286 7.59924V41.6286C26.8677 41.6286 26.4856 41.5649 26.1884 41.3951L26.1035 41.3526C22.0276 39.1236 14.916 36.7885 10.3094 36.1728L9.69378 36.0879C7.65583 35.8332 6 33.9226 6 31.8847V6.24061C6 3.7144 8.05917 1.80383 10.5854 2.01612C15.0434 2.377 21.7941 4.62723 25.5728 6.98361L26.1035 7.30204C26.4219 7.49309 26.8253 7.59924 27.2286 7.59924ZM18.2064 15.9634H13.43C12.5596 15.9634 11.8378 15.2416 11.8378 14.3713C11.8378 13.5009 12.5596 12.7791 13.43 12.7791H18.2064C19.0768 12.7791 19.7986 13.5009 19.7986 14.3713C19.7986 15.2416 19.0768 15.9634 18.2064 15.9634ZM13.43 22.332H19.7986C20.6689 22.332 21.3907 21.6102 21.3907 20.7398C21.3907 19.8695 20.6689 19.1477 19.7986 19.1477H13.43C12.5596 19.1477 11.8378 19.8695 11.8378 20.7398C11.8378 21.6102 12.5596 22.332 13.43 22.332Z"
                        fill="#DA7373"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M27.2286 7.59924V41.6286C26.8677 41.6286 26.4856 41.5649 26.1884 41.3951L26.1035 41.3526C22.0276 39.1236 14.916 36.7885 10.3094 36.1728L9.69378 36.0879C7.65583 35.8332 6 33.9226 6 31.8847V6.24061C6 3.7144 8.05917 1.80383 10.5854 2.01612C15.0434 2.377 21.7941 4.62723 25.5728 6.98361L26.1035 7.30204C26.4219 7.49309 26.8253 7.59924 27.2286 7.59924ZM18.2064 15.9634H13.43C12.5596 15.9634 11.8378 15.2416 11.8378 14.3713C11.8378 13.5009 12.5596 12.7791 13.43 12.7791H18.2064C19.0768 12.7791 19.7986 13.5009 19.7986 14.3713C19.7986 15.2416 19.0768 15.9634 18.2064 15.9634ZM13.43 22.332H19.7986C20.6689 22.332 21.3907 21.6102 21.3907 20.7398C21.3907 19.8695 20.6689 19.1477 19.7986 19.1477H13.43C12.5596 19.1477 11.8378 19.8695 11.8378 20.7398C11.8378 21.6102 12.5596 22.332 13.43 22.332Z"
                        fill="url(#paint1_linear_201_146)"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_di_201_146"
                      x="0"
                      y="0"
                      width="54.4573"
                      height="51.6288"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_201_146"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_201_146"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="1" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_201_146"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_201_146"
                      x1="51.2506"
                      y1="-3.71138"
                      x2="2.64478"
                      y2="22.3413"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0.38" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_201_146"
                      x1="30.0218"
                      y1="-3.73572"
                      x2="-18.5955"
                      y2="22.3093"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0.38" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <h2 class="title">
              {{ get_i18n_str(frontmatter.locale, "guides", "Guides") }}
            </h2>
            <p class="body-text">
              {{ get_i18n_str(frontmatter.locale, "guides-card-desc") }}
            </p>
          </div>

          <span
            style="color: var(--c-accent-rose)"
            class="body-text card-action"
            >{{ get_i18n_str(frontmatter.locale, "guides-card-action") }}</span
          >
        </I18NRouterLink>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <a
          target="_blank"
          href="https://github.com/twilson63/permaweb-cookbook"
          class="onboard-card"
        >
          <div class="card-content">
            <div class="icon-container">
              <div class="icon">
                <svg
                  width="55"
                  height="46"
                  viewBox="0 0 55 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_di_201_153)">
                    <path
                      d="M20.8638 6.02939C21.6169 5.10758 21.6169 3.61316 20.8638 2.69135C20.1106 1.76955 18.8895 1.76955 18.1363 2.69135L6.56487 16.8538C5.81171 17.7755 5.81171 19.27 6.56487 20.1918L18.1363 34.3543C18.8895 35.2761 20.1106 35.2761 20.8638 34.3543C21.6169 33.4325 21.6169 31.9379 20.8638 31.0162L10.656 18.5228L20.8638 6.02939Z"
                      fill="#E14CA8"
                    />
                    <path
                      d="M20.8638 6.02939C21.6169 5.10758 21.6169 3.61316 20.8638 2.69135C20.1106 1.76955 18.8895 1.76955 18.1363 2.69135L6.56487 16.8538C5.81171 17.7755 5.81171 19.27 6.56487 20.1918L18.1363 34.3543C18.8895 35.2761 20.1106 35.2761 20.8638 34.3543C21.6169 33.4325 21.6169 31.9379 20.8638 31.0162L10.656 18.5228L20.8638 6.02939Z"
                      fill="url(#paint0_linear_201_153)"
                    />
                    <path
                      d="M36.2926 2.69135C35.5394 1.76955 34.3183 1.76955 33.5651 2.69135C32.812 3.61316 32.812 5.10758 33.5651 6.02939L43.7729 18.5228L33.5651 31.0162C32.812 31.9379 32.812 33.4325 33.5651 34.3543C34.3183 35.2761 35.5394 35.2761 36.2926 34.3543L47.864 20.1918C48.6172 19.27 48.6172 17.7755 47.864 16.8538L36.2926 2.69135Z"
                      fill="#E14CA8"
                    />
                    <path
                      d="M36.2926 2.69135C35.5394 1.76955 34.3183 1.76955 33.5651 2.69135C32.812 3.61316 32.812 5.10758 33.5651 6.02939L43.7729 18.5228L33.5651 31.0162C32.812 31.9379 32.812 33.4325 33.5651 34.3543C34.3183 35.2761 35.5394 35.2761 36.2926 34.3543L47.864 20.1918C48.6172 19.27 48.6172 17.7755 47.864 16.8538L36.2926 2.69135Z"
                      fill="url(#paint1_linear_201_153)"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_di_201_153"
                      x="0"
                      y="0"
                      width="54.4289"
                      height="45.0456"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_201_153"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_201_153"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="1" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_201_153"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_201_153"
                      x1="23.4587"
                      y1="-2.78292"
                      x2="-13.8769"
                      y2="14.6495"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0.38" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_201_153"
                      x1="50.459"
                      y1="-2.78292"
                      x2="13.1234"
                      y2="14.6495"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0.38" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <h2 class="title">
              {{ get_i18n_str(frontmatter.locale, "contribute", "Contribute") }}
            </h2>
            <p class="body-text">
              {{ get_i18n_str(frontmatter.locale, "contribute-card-desc") }}
            </p>
          </div>

          <span
            style="color: var(--c-accent-pinky)"
            class="body-text card-action"
            >{{ get_i18n_str(frontmatter.locale, "contribute-card-action") }}</span
          >
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../styles/bootstrap.scss";

.onboarding {
  padding: 100px 0 60px;

  @include media-breakpoint-down(md) {
    padding: 30px 0;
  }

  a {
    color: var(--c-text);
    text-decoration: underline;
  }

  h2 {
    padding: 0;
    margin: 0;
    border: none;
  }

  p {
    margin: 0;
  }

  .hero {
    margin-bottom: 110px;
  }

  .header {
    margin-bottom: 32px;
  }

  .onboard-illustration {
    display: block;

    padding: 20px;
    margin-bottom: 30px;
    
    .illustration {
      margin: 0 auto;

      width: 100%;
      max-width: 392px;
      aspect-ratio: 392 / 323;

      background: white;
      mask: url("/cookbook.svg") no-repeat center;
      mask-size: contain;

      animation: gradientAnimation 20s infinite linear;
      background: linear-gradient(
          90deg,
          hsla(263, 93%, 69%, 1),
          hsla(282, 57%, 64%, 1),
          hsla(325, 55%, 66%, 1),
          hsla(0, 92%, 75%, 1),
          hsla(16, 65%, 78%, 1),
          hsla(32, 50%, 80%, 1),
          hsla(16, 65%, 78%, 1),
          hsla(0, 92%, 75%, 1),
          hsla(325, 55%, 66%, 1),
          hsla(282, 57%, 64%, 1),
          hsla(263, 93%, 69%, 1)
        )
        0 0 / 400% 100%;

      @keyframes gradientAnimation {
        to {
          background-position: 400% 0;
        }
      }

      @include media-breakpoint-down(md) {
        max-width: 200px;
      }
    }
  }

  .hero-text {
    margin-bottom: 70px;

    .hero-title {
      margin: 0 0 20px;
    }

    .hero-body-text {
      margin: 0 0 20px;
    }
  }

  .cards {
    > .col-12 {
      display: flex;
    }
  }

  .onboard-card {
    text-decoration: none;

    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    transition: 0.18s all;

    background: var(--c-card-bg);
    border: 1px solid var(--c-card-border-color);
    box-shadow: var(--c-card-shadow-inset), 0 14px 66px rgb(0 0 0 / 7%),
      0 10px 17px rgb(0 0 0 / 3%), 0 4px 7px rgb(0 0 0 / 5%);
    border-radius: 8px;

    padding: 36px 24px 24px;

    margin-bottom: var(--bs-gutter-x);

    &:hover {
      transform: scale(1.02);
      background: var(--c-card-hover-bg);
    }

    .icon-container {
      margin-bottom: 30px;

      .icon {
        width: 44px;
        height: 44px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }

    .card-content {
      .title {
        margin: 0 0 8px;
      }

      .body-text {
        margin: 0 0 36px;
      }
    }

    .card-action {
      text-align: right;
    }
  }
}
</style>

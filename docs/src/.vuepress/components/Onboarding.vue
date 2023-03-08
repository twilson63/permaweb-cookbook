<template>
  <div class="onboarding">
    <div class="row hero">
      <div class="col-12 col-md-6 col-lg-5 order-2 order-md-1">
        <div class="hero-text">
          <h1 class="hero-title">
            Build on the Permaweb.
          </h1>
          <p class="hero-body-text">
            A curated collection of developer guides & more to build on the Permaweb. All in one place.
          </p>
          <RouterLink
            class="hero-body-text"
            to="/getting-started/">
            Get Started
          </RouterLink>
        </div>

        <FeaturedContributors />
      </div>

      <div class="col-12 col-md-6 offset-lg-1 order-1 order-md-2">

        <RouterLink to="/#documentation" class="onboard-illustration">
          <div style="position: relative;">
            <!-- <img class="not-zoomable" style="max-width: 390px;width: 100%;" src="/cookbook.png" /> -->

            <div class="logo-clip"></div>

            <svg width="392" height="323" viewBox="0 0 392 323" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="clipPath">
                  <path d="M389.102 191.032L360.639 181.648L361.313 182.348L203.861 239.433L53.1348 80.2552L16.1405 68.0574C-2.53857 81.265 -4.6275 118.868 7.91956 131.955L193.969 323L390.76 252.613C372.836 242.826 358.294 214.97 389.102 191.045V191.032ZM183.525 242.583L28.4854 81.992H33.1215L187.473 239.419L183.511 242.583H183.525ZM195.371 317.251C195.371 317.251 173.916 292.209 201.719 258.901L370.194 197.952C370.194 197.952 350.814 231.193 373.496 250.823L195.371 317.265V317.251ZM53.1348 80.2552L47.9866 74.816L205.047 19.1045L360.639 181.648L389.089 191.032C388.954 191.14 388.819 191.247 388.685 191.355L392 190.17L208.403 0L16.8683 68.2863L53.1213 80.2418L53.1348 80.2552Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M184.104 106.345C170.359 114.442 167.894 130.454 178.501 142.095C189.109 153.736 208.841 156.674 222.586 148.577C236.331 140.481 238.796 124.468 228.188 112.827C217.581 101.186 197.849 98.2489 184.104 106.345ZM173.871 144.823C161.221 130.939 164.22 111.935 180.474 102.361C196.727 92.7874 220.168 96.2166 232.819 110.1C245.469 123.983 242.47 142.987 226.216 152.561C209.963 162.135 186.522 158.706 173.871 144.823Z" fill="white"/>
                  <path d="M215.768 132.674C215.433 132.528 215.087 132.336 214.73 132.1C214.373 131.863 214.014 131.602 213.653 131.316C213.606 131.773 213.498 132.241 213.329 132.719C213.159 133.197 212.919 133.674 212.607 134.15C212.297 134.607 211.9 135.056 211.415 135.496C210.939 135.948 210.367 136.371 209.698 136.765C208.61 137.407 207.484 137.864 206.321 138.136C205.171 138.401 204.049 138.486 202.955 138.391C201.861 138.297 200.829 138.028 199.861 137.584C198.882 137.129 198.036 136.51 197.322 135.727C195.579 133.815 195.067 131.848 195.785 129.826C196.506 127.786 198.526 125.788 201.845 123.833L204.895 122.036L203.917 120.962C203.121 120.09 202.16 119.599 201.032 119.49C199.895 119.369 198.696 119.68 197.437 120.422C196.322 121.079 195.697 121.765 195.562 122.48C195.418 123.184 195.656 123.877 196.278 124.559L190.808 127.782C190.104 127.01 189.634 126.161 189.395 125.236C189.17 124.303 189.198 123.35 189.48 122.376C189.775 121.394 190.336 120.428 191.163 119.477C191.992 118.507 193.122 117.601 194.552 116.758C195.837 116.001 197.153 115.432 198.5 115.051C199.86 114.663 201.186 114.492 202.478 114.539C203.77 114.585 205.013 114.876 206.206 115.411C207.389 115.935 208.459 116.722 209.417 117.774L216.511 125.559C217.398 126.532 218.204 127.295 218.929 127.847C219.654 128.4 220.363 128.824 221.057 129.12L221.317 129.406L215.768 132.674ZM207.572 132.474C208.123 132.15 208.584 131.792 208.954 131.402C209.324 131.012 209.618 130.616 209.836 130.213C210.053 129.81 210.197 129.415 210.269 129.029C210.331 128.632 210.333 128.27 210.276 127.942L207.433 124.821L204.639 126.467C203.786 126.97 203.124 127.471 202.653 127.972C202.172 128.462 201.858 128.947 201.713 129.428C201.556 129.899 201.549 130.367 201.692 130.833C201.824 131.288 202.079 131.722 202.456 132.136C203.027 132.762 203.757 133.132 204.645 133.244C205.547 133.349 206.523 133.092 207.572 132.474Z" fill="white"/>
                </clipPath>
              </defs>
            </svg>

          </div>
        </RouterLink>

      </div>

      <div class="col-12 order-3">
        <div style="text-align: center;margin-top: 80px;opacity: 0.1;">
          <svg width="33" height="17" viewBox="0 0 33 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="text-fill" d="M30.513 0.375433L16.8219 13.7214L3.13073 0.375433C2.88611 0.136502 2.55774 0.00273913 2.21579 0.00273913C1.87385 0.00273913 1.54547 0.136502 1.30086 0.375433C1.18242 0.491482 1.08832 0.629998 1.02408 0.782869C0.959845 0.935741 0.926758 1.09989 0.926758 1.26571C0.926758 1.43153 0.959845 1.59568 1.02408 1.74856C1.08832 1.90143 1.18242 2.03994 1.30086 2.15599L15.8659 16.3567C16.1216 16.606 16.4647 16.7455 16.8219 16.7455C17.1791 16.7455 17.5221 16.606 17.7779 16.3567L32.3429 2.15873C32.4622 2.0426 32.557 1.90374 32.6217 1.75036C32.6865 1.59698 32.7198 1.43219 32.7198 1.26571C32.7198 1.09923 32.6865 0.934441 32.6217 0.781063C32.557 0.627685 32.4622 0.488829 32.3429 0.372693C32.0983 0.133762 31.7699 0 31.428 0C31.086 0 30.7577 0.133762 30.513 0.372693V0.375433Z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="row cards">
      <div class="col-12">
        <h2 class="header">First Time?</h2>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <RouterLink to="/getting-started/quick-starts/hw-no-code" class="onboard-card">
          <div class="card-content">
            <div class="icon-container">
              <div class="icon hello_world"></div>
            </div>

            <h2 class="title">Hello World</h2>
            <p class="body-text">Getting started with the Permaweb</p>
          </div>

          <span style="color: #397BC5;" class="body-text card-action">Let's Go</span>
        </RouterLink>
      </div>
      
      <div class="col-12 col-md-6 col-xl-3">
        <RouterLink to="/concepts" class="onboard-card">
          <div class="card-content">
            <div class="icon-container">
              <div class="icon key"></div>
            </div>

            <h2 class="title">Core Concepts</h2>
            <p class="body-text">Comprehensive building blocks for developers</p>
          </div>

          <span style="color: #DDB44A;" class="body-text card-action">Get Started</span>
        </RouterLink>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <RouterLink to="/guides" class="onboard-card">
          <div class="card-content">
            <div class="icon-container">
              <div class="icon guides"></div>
            </div>

            <h2 class="title">Guides</h2>
            <p class="body-text">Specific deployments made easy</p>
          </div>

          <span style="color: #3DA36B;" class="body-text card-action">Get Started</span>
        </RouterLink>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <a target="_blank" href="https://github.com/twilson63/permaweb-cookbook" class="onboard-card">
          <div class="card-content">
            <div class="icon-container">
              <div class="icon code"></div>
            </div>

            <h2 class="title">Contribute</h2>
            <p class="body-text">Share your knowledge</p>
          </div>

          <span style="color: #AB54D3;" class="body-text card-action">Go to Github repo</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import FeaturedContributors from './FeaturedContributors.vue';
</script>

<style lang="scss">
@import "../styles/bootstrap.scss";

.onboarding {
  padding: 150px 0 60px;

  @include media-breakpoint-down(md) { 
    padding: 30px 0;
  }

  @include media-breakpoint-down(lg) {
    .onboard-illustration {
      transform: scale(0.68);
    }
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
    display: flex;
    justify-content: center;

    margin-bottom: 30px;
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

  .logo-clip {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    clip-path: url(#clipPath);

    animation: gradientAnimation 20s infinite linear;
    background: linear-gradient( 90deg, hsla(263, 93%, 69%, 1), hsla(282, 57%, 64%, 1), hsla(325, 55%, 66%, 1), hsla(0, 92%, 75%, 1), hsla(16, 65%, 78%, 1), hsla(32, 50%, 80%, 1), hsla(16, 65%, 78%, 1), hsla(0, 92%, 75%, 1), hsla(325, 55%, 66%, 1), hsla(282, 57%, 64%, 1), hsla(263, 93%, 69%, 1) ) 0 0 / 400% 100%;
  
    @keyframes gradientAnimation {
      to {
        background-position: 400% 0;
      }
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

    transition: .18s all;
    
    background: var(--c-card-bg);
    border: 1px solid var(--c-card-border-color);
    box-shadow: var(--c-card-shadow-inset), 0 14px 66px rgb(0 0 0 / 7%), 0 10px 17px rgb(0 0 0 / 3%), 0 4px 7px rgb(0 0 0 / 5%);
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

      .icon.hello_world {
        background-image: url('https://arweave.net/yDLNl01wdFyTLpA2Ye1HvEO06YDoIP54s1KfVOLUpV8');
      }

      .icon.key {
        background-image: url('https://arweave.net/oC6qhjx68j12tnCXnzRZYRvlmNJnoT5ClsNV78NauqI');
      }

      .icon.guides {
        background-image: url('https://arweave.net/72gHKRr0PCvNtQSFLb6P2y8zKjuKxeY1TJUcZarl2vI');
      }

      .icon.code {
        background-image: url('https://arweave.net/5AEQQ8_j-gEoJziYRSPJgaYBXTHNKI8Z8mmnTUyUk3M');
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
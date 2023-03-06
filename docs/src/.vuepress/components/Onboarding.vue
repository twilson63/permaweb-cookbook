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

        <div class="onboard-illustration">
          <div style="position: relative;">
            <!-- <img class="not-zoomable" style="max-width: 390px;width: 100%;" src="/cookbook.png" /> -->

            <div class="logo-clip"></div>

            <svg style="max-width: 390px;" width="392" height="323" viewBox="0 0 392 323" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="clipPath">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M388.725 191.341L392 190.17L208.403 0L16.8683 68.2863L44.9482 77.5464L44.9616 77.5603L16.1405 68.0574C-2.53857 81.265 -4.6275 118.868 7.91956 131.955L193.969 323L390.76 252.613C372.909 242.866 358.414 215.199 388.725 191.341ZM183.519 242.577L187.473 239.419L33.1215 81.992H28.4854L183.519 242.577ZM201.719 258.901C173.916 292.209 195.371 317.251 195.371 317.251V317.265L373.496 250.823C350.814 231.193 370.194 197.952 370.194 197.952L201.719 258.901ZM184.104 106.345C170.359 114.442 167.894 130.454 178.501 142.095C189.109 153.736 208.841 156.674 222.586 148.577C236.331 140.481 238.796 124.468 228.188 112.827C217.581 101.186 197.849 98.2489 184.104 106.345ZM173.871 144.823C161.221 130.939 164.22 111.935 180.474 102.361C196.727 92.7874 220.168 96.2166 232.819 110.1C245.469 123.983 242.47 142.987 226.216 152.561C209.963 162.135 186.522 158.706 173.871 144.823ZM214.73 132.1C215.087 132.336 215.433 132.528 215.767 132.674L221.317 129.406L221.057 129.12C220.363 128.824 219.654 128.4 218.929 127.847C218.203 127.295 217.398 126.532 216.511 125.559L209.417 117.774C208.459 116.722 207.389 115.935 206.206 115.411C205.013 114.876 203.77 114.585 202.478 114.539C201.185 114.492 199.86 114.663 198.5 115.051C197.153 115.432 195.837 116.001 194.552 116.758C193.122 117.601 191.992 118.507 191.162 119.477C190.336 120.428 189.775 121.394 189.48 122.376C189.198 123.35 189.17 124.303 189.395 125.236C189.633 126.161 190.104 127.01 190.807 127.782L196.278 124.559C195.656 123.877 195.418 123.184 195.562 122.48C195.697 121.765 196.321 121.079 197.436 120.422C198.696 119.68 199.894 119.369 201.032 119.49C202.16 119.599 203.121 120.09 203.916 120.962L204.895 122.036L201.845 123.833C198.526 125.788 196.506 127.785 195.785 129.826C195.067 131.848 195.579 133.815 197.322 135.727C198.035 136.51 198.881 137.129 199.86 137.584C200.829 138.028 201.86 138.297 202.955 138.391C204.049 138.486 205.171 138.401 206.321 138.136C207.483 137.864 208.609 137.407 209.698 136.765C210.367 136.371 210.939 135.948 211.414 135.496C211.9 135.056 212.297 134.607 212.606 134.15C212.919 133.674 213.159 133.197 213.329 132.719C213.498 132.241 213.606 131.773 213.653 131.316C214.014 131.602 214.373 131.863 214.73 132.1ZM208.954 131.402C208.584 131.792 208.123 132.15 207.572 132.474C206.523 133.092 205.547 133.349 204.645 133.244C203.756 133.132 203.027 132.762 202.456 132.136C202.079 131.722 201.824 131.288 201.692 130.833C201.549 130.367 201.556 129.899 201.712 129.428C201.858 128.947 202.172 128.462 202.653 127.972C203.124 127.471 203.786 126.969 204.638 126.467L207.433 124.821L210.276 127.942C210.333 128.27 210.33 128.632 210.269 129.029C210.197 129.415 210.053 129.81 209.835 130.213C209.618 130.616 209.324 131.012 208.954 131.402Z" fill="#fff"/>
                </clipPath>
              </defs>
            </svg>

            <!-- <svg style="position: absolute;left: 0;" width="100%" height="100%" viewBox="0 0 392 323" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="clipPath">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M205 18.5L47.5 74.5L204 240L361.5 182.5L205 18.5ZM184.104 106.345C170.359 114.442 167.894 130.454 178.501 142.095C189.109 153.736 208.841 156.674 222.586 148.577C236.331 140.481 238.796 124.468 228.188 112.827C217.581 101.186 197.849 98.2489 184.104 106.345ZM173.871 144.823C161.221 130.939 164.22 111.935 180.474 102.361C196.727 92.7874 220.168 96.2166 232.819 110.1C245.469 123.983 242.47 142.987 226.216 152.561C209.963 162.135 186.522 158.706 173.871 144.823ZM214.73 132.1C215.087 132.336 215.433 132.528 215.767 132.674L221.317 129.406L221.057 129.12C220.363 128.824 219.654 128.4 218.929 127.847C218.203 127.295 217.398 126.532 216.511 125.559L209.417 117.774C208.459 116.722 207.389 115.935 206.206 115.411C205.013 114.876 203.77 114.585 202.478 114.539C201.185 114.492 199.86 114.663 198.5 115.051C197.153 115.432 195.837 116.001 194.552 116.758C193.122 117.601 191.992 118.507 191.162 119.477C190.336 120.428 189.775 121.394 189.48 122.376C189.198 123.35 189.17 124.303 189.395 125.236C189.633 126.161 190.104 127.01 190.807 127.782L196.278 124.559C195.656 123.877 195.418 123.184 195.562 122.48C195.697 121.765 196.321 121.079 197.436 120.422C198.696 119.68 199.894 119.369 201.032 119.49C202.16 119.599 203.121 120.09 203.916 120.962L204.895 122.036L201.845 123.833C198.526 125.788 196.506 127.785 195.785 129.826C195.067 131.848 195.579 133.815 197.322 135.727C198.035 136.51 198.881 137.129 199.86 137.584C200.829 138.028 201.86 138.297 202.955 138.391C204.049 138.486 205.171 138.401 206.321 138.136C207.483 137.864 208.609 137.407 209.698 136.765C210.367 136.371 210.939 135.948 211.414 135.496C211.9 135.056 212.297 134.607 212.606 134.15C212.919 133.674 213.159 133.197 213.329 132.719C213.498 132.241 213.606 131.773 213.653 131.316C214.014 131.602 214.373 131.863 214.73 132.1ZM208.954 131.402C208.584 131.792 208.123 132.15 207.572 132.474C206.523 133.092 205.547 133.349 204.645 133.244C203.756 133.132 203.027 132.762 202.456 132.136C202.079 131.722 201.824 131.288 201.692 130.833C201.549 130.367 201.556 129.899 201.712 129.428C201.858 128.947 202.172 128.462 202.653 127.972C203.124 127.471 203.786 126.969 204.638 126.467L207.433 124.821L210.276 127.942C210.333 128.27 210.33 128.632 210.269 129.029C210.197 129.415 210.053 129.81 209.835 130.213C209.618 130.616 209.324 131.012 208.954 131.402Z" fill="#E8E8E8"/>
                </clipPath>
              </defs>
            </svg> -->

            <!-- <svg width="0" height="0" viewBox="0 0 105 85" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="clipPath">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M33.1041 21.3455C19.3588 29.4421 16.8942 45.4543 27.5015 57.0952C38.1088 68.7361 57.8406 71.6737 71.5858 63.5771C85.3311 55.4805 87.7958 39.4683 77.1885 27.8273C66.5812 16.1864 46.8494 13.2489 33.1041 21.3455ZM22.8712 59.8226C10.2206 45.9393 13.2204 26.9353 29.4737 17.3614C45.7271 7.78742 69.1681 11.2166 81.8187 25.0999C94.4693 38.9832 91.4695 57.9873 75.2162 67.5612C58.9629 77.1351 35.5218 73.706 22.8712 59.8226Z" fill="white"/>
                  <path d="M64.7677 47.6744C64.4327 47.528 64.0868 47.3363 63.7302 47.0996C63.3731 46.8629 63.0142 46.6017 62.6531 46.3159C62.6061 46.7733 62.4981 47.241 62.3287 47.7187C62.1593 48.1968 61.9188 48.6738 61.6065 49.1498C61.2974 49.6068 60.9001 50.0559 60.4145 50.4964C59.9393 50.9482 59.3673 51.3713 58.6983 51.7654C57.6095 52.4067 56.4835 52.8636 55.3207 53.136C54.1709 53.4008 53.049 53.486 51.9549 53.3913C50.8606 53.2967 49.8292 53.0276 48.8605 52.5841C47.8816 52.1293 47.0357 51.5104 46.3222 50.7274C44.5793 48.8146 44.0669 46.8477 44.785 44.8259C45.5062 42.7855 47.5261 40.7878 50.845 38.8328L53.895 37.0362L52.9166 35.9624C52.1215 35.0899 51.1602 34.5991 50.0325 34.4899C48.8947 34.3694 47.696 34.68 46.4367 35.4218C45.3216 36.0787 44.6969 36.7648 44.5623 37.4799C44.4178 38.184 44.6562 38.8772 45.2779 39.5594L39.8076 42.7816C39.1044 42.0099 38.6336 41.1614 38.3952 40.2361C38.17 39.303 38.1983 38.3495 38.4801 37.3756C38.7749 36.394 39.336 35.4277 40.1626 34.4766C40.9923 33.5066 42.122 32.6005 43.5519 31.7582C44.8374 31.001 46.1535 30.4321 47.5001 30.0514C48.8598 29.663 50.1857 29.4923 51.4779 29.5388C52.7703 29.5854 54.0131 29.8761 55.206 30.4111C56.3889 30.9347 57.4593 31.7223 58.4173 32.7737L65.5111 40.5587C66.3978 41.5318 67.2037 42.2948 67.9291 42.8473C68.6543 43.3999 69.3635 43.8243 70.0569 44.1205L70.3168 44.4057L64.7677 47.6744ZM56.5722 47.4743C57.1232 47.1497 57.5839 46.7925 57.9541 46.4025C58.3244 46.0123 58.6183 45.6159 58.8355 45.2127C59.0529 44.8097 59.1973 44.4152 59.2691 44.0292C59.3306 43.6321 59.3329 43.2696 59.2764 42.942L56.4328 39.8214L53.6386 41.4673C52.786 41.9695 52.1242 42.4711 51.6531 42.9719C51.172 43.4617 50.8585 43.9471 50.7125 44.4285C50.5562 44.8986 50.5494 45.3667 50.692 45.8329C50.8242 46.2878 51.079 46.7221 51.4561 47.136C52.0269 47.7624 52.7565 48.1319 53.6452 48.2444C54.5471 48.349 55.5227 48.0925 56.5722 47.4743Z" fill="white"/>
                </clipPath>
              </defs>
            </svg> -->
          </div>
        </div>

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

            <h2 class="title">Concept</h2>
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
    padding: 60px 0;
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

    animation: gradientAnimation 18s infinite linear;
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
        background-image: url('/hello_world.png');
      }

      .icon.key {
        background-image: url('/key.png');
      }

      .icon.guides {
        background-image: url('/guides.png');
      }

      .icon.code {
        background-image: url('/code.png');
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
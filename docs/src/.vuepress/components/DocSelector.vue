<template>
  <!-- This component handles the logic for the globally-injected DocSelector -->
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

// State management
let componentReady = false;
let componentElements = [];
let isDocSelectorVisible = false;
let currentPath = "";

// Check if current page should show DocSelector
function shouldShowDocSelector(pathname = window.location.pathname) {
  return !(pathname === "/" || pathname === "/index.html");
}

// Find all DocSelector elements using multiple selectors
function findComponentElements() {
  const selectors = [
    '[data-doc-selector="true"]',
    "[data-doc-selector]",
    ".doc-selector",
    "#doc-selector",
    '[class*="doc-selector"]',
    '[id*="doc-selector"]',
  ];

  componentElements = [];
  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => componentElements.push(el));
  });

  return componentElements.length > 0;
}

// Instantly hide DocSelector
function hideDocSelector() {
  if (findComponentElements()) {
    componentElements.forEach((el) => {
      el.style.display = "none";
    });
    console.log(`Instantly hid ${componentElements.length} DocSelector elements`);
  }
  isDocSelectorVisible = false;
}

// Instantly show DocSelector
function showDocSelector() {
  if (findComponentElements()) {
    componentElements.forEach((el) => {
      el.style.display = "";
    });
    console.log(`Instantly showed ${componentElements.length} DocSelector elements`);
    isDocSelectorVisible = true;
  } else if (componentReady) {
    // Component should be ready but elements not found - wait a bit
    setTimeout(() => {
      if (findComponentElements()) {
        componentElements.forEach((el) => {
          el.style.display = "";
        });
        isDocSelectorVisible = true;
      }
    }, 100);
  }
}

// Handle navigation changes (instant show/hide)
function handleNavigation() {
  const newPath = window.location.pathname;

  if (newPath !== currentPath) {
    console.log(`Navigation: ${currentPath} → ${newPath}`);
    currentPath = newPath;

    if (!componentReady) {
      console.log("Component not ready yet, navigation will apply when ready");
      return;
    }

    if (shouldShowDocSelector(newPath)) {
      if (!isDocSelectorVisible) {
        showDocSelector();
      }
    } else {
      if (isDocSelectorVisible) {
        hideDocSelector();
      }
    }
  }
}

// Load DocSelector script in background (always)
function loadDocSelectorInBackground() {
  console.log("Loading DocSelector in background...");

  // Configuration for the DocSelector component
  window.DocSelectorConfig = {
    currentCookbook: "ARWEAVE", // AO, HYPERBEAM, ARWEAVE
    links: {
      AO: "https://cookbook_ao.arweave.net/welcome/ao-core-introduction.html",
      HYPERBEAM: "https://hyperbeam.arweave.net/build/introduction/what-is-hyperbeam.html",
      ARWEAVE: "https://cookbook.arweave.net/getting-started/index.html",
    },
  };

  const script = document.createElement("script");
  script.src = "https://arweave.net/uUdfnAHLxvRswVdGTiLg4_RXYUIb_4BvyTxVQ8m1X28";
  script.async = true;

  script.onload = () => {
    console.log("DocSelector loaded in background");

    // Give component time to initialize
    setTimeout(() => {
      componentReady = true;

      // Apply initial visibility based on current page
      if (shouldShowDocSelector()) {
        showDocSelector();
      } else {
        hideDocSelector();
        console.log("DocSelector preloaded and hidden on index page");
      }
    }, 200);
  };

  script.onerror = () => {
    console.error("Failed to load DocSelector in background");
  };

  document.head.appendChild(script);
}

// Initialize
function initialize() {
  currentPath = window.location.pathname;

  // ALWAYS load DocSelector in background (even on index page)
  loadDocSelectorInBackground();

  // Navigation detection
  window.addEventListener("popstate", handleNavigation);

  // SPA navigation polling (lightweight since we're just comparing strings)
  const navInterval = setInterval(handleNavigation, 300);

  // Store interval for cleanup
  window._docSelectorNavInterval = navInterval;

  console.log("DocSelector background preloading initialized");
}

onMounted(() => {
  initialize();
});

onUnmounted(() => {
  // Clean up navigation polling
  if (window._docSelectorNavInterval) {
    clearInterval(window._docSelectorNavInterval);
    delete window._docSelectorNavInterval;
  }

  // Clean up config from external script
  if (window.DocSelectorConfig) {
    delete window.DocSelectorConfig;
  }
});
</script>
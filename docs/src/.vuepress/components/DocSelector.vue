<template>
  <div ref="docSelectorContainer" />
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

const currentCookbook = "ARWEAVE"; // AO, HYPERBEAM, ARWEAVE

// Documentation links for each layer
const AO_LINK = "https://cookbook_ao.arweave.net/";
const HYPERBEAM_LINK = "https://hyperbeam.arweave.net/";
const ARWEAVE_LINK = "https://cookbook.arweave.net/";

const bottomLayer = `
    <path d="M75.749 31.3628L38.5 52.8696L1.25 31.3628L38.5 9.85596L75.749 31.3628Z" fill="black" stroke="white" stroke-width="0.25"/>
    <path d="M75.875 22.7754V31.1465L38.625 9.63965V1.26855L75.875 22.7754Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round"/>
    <path d="M38.3751 9.63965L1.12506 31.1465V22.7754L38.3751 1.26855V9.63965Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M1 22.7031L38.5 44.3538V53.014L1 31.3634V22.7031Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M38.5 44.3538L76 22.7031V31.3634L38.5 53.014V44.3538Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round"/>
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 1.05273)" fill="black" fill-opacity="0.9" stroke="white" stroke-width="0.25"/>
`;

const selectedBottomLayer = `<path d="M75.749 31.3628L38.5 52.8696L1.25 31.3628L38.5 9.85596L75.749 31.3628Z" fill="black" stroke="white" stroke-width="0.25" />
    <path d="M75.875 22.7754V31.1465L38.625 9.63965V1.26855L75.875 22.7754Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round" />
    <path d="M38.3751 9.63965L1.12506 31.1465V22.7754L38.3751 1.26855V9.63965Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M1 22.7031L38.5 44.3538V53.014L1 31.3634V22.7031Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M38.5 44.3538L76 22.7031V31.3634L38.5 53.014V44.3538Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round" />
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 1.05273)" fill="black" fill-opacity="0.9" stroke="white" stroke-width="0.25" />
    <rect x="0.194856" y="0.3375" width="4.09545" height="4.09545" transform="matrix(0.866025 0.5 0 1 32.8443 42.9934)" stroke="#FF6A13" stroke-width="0.45" />
    <rect width="1.81818" height="1.81818" transform="matrix(-1.89276e-08 1 -0.866025 -0.5 35.5737 46.0454)" fill="#FF6A13" />
 `;

const middleLayer = `
    <path d="M75.749 30.7031L38.5 52.21L1.25 30.7031L38.5 9.19629L75.749 30.7031Z" fill="#CACACA" stroke="black" stroke-width="0.25" />
    <path d="M75.875 22.1152V30.4863L38.625 8.97949V0.608398L75.875 22.1152Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path d="M38.3751 8.97949L1.12506 30.4863V22.1152L38.3751 0.608398V8.97949Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M1 22.0435L38.5 43.6941V52.3543L1 30.7037V22.0435Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M38.5 43.6941L76 22.0435V30.7037L38.5 52.3543V43.6941Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 0.392578)" fill="#CACACA" fill-opacity="0.9" stroke="black" stroke-width="0.25" />
`;

const selectedMiddleLayer = `
    <path d="M75.749 30.7031L38.5 52.21L1.25 30.7031L38.5 9.19629L75.749 30.7031Z" fill="#CACACA" stroke="black" stroke-width="0.25"/>
    <path d="M75.875 22.1152V30.4863L38.625 8.97949V0.608398L75.875 22.1152Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path d="M38.3751 8.97949L1.12506 30.4863V22.1152L38.3751 0.608398V8.97949Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M1 22.0435L38.5 43.6941V52.3543L1 30.7037V22.0435Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M38.5 43.6941L76 22.0435V30.7037L38.5 52.3543V43.6941Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 0.392578)" fill="#CACACA" fill-opacity="0.9" stroke="black" stroke-width="0.25"/>
`;

const topLayer = `
    <path d="M75.749 31.311L38.5 52.8179L1.25 31.311L38.5 9.8042L75.749 31.311Z" fill="white" stroke="black" stroke-width="0.25" />
    <path d="M75.875 22.7227V31.0938L38.625 9.58691V1.21582L75.875 22.7227Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path d="M38.3751 9.58691L1.12506 31.0938V22.7227L38.3751 1.21582V9.58691Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M1 22.6504L38.5 44.301V52.9613L1 31.3106V22.6504Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M38.5 44.301L76 22.6504V31.3106L38.5 52.9613V44.301Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 1)" fill="white" fill-opacity="0.9" stroke="black" stroke-width="0.25" />
`;

const selectedTopLayer = `
    <path d="M75.749 31.311L38.5 52.8179L1.25 31.311L38.5 9.8042L75.749 31.311Z" fill="white" stroke="black" stroke-width="0.25"/>
    <path d="M75.875 22.7227V31.0938L38.625 9.58691V1.21582L75.875 22.7227Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path d="M38.3751 9.58691L1.12506 31.0938V22.7227L38.3751 1.21582V9.58691Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M1 22.6504L38.5 44.301V52.9613L1 31.3106V22.6504Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <rect x="0.194856" y="0.3375" width="4.09545" height="4.09545" transform="matrix(0.866025 0.5 0 1 31.7079 42.948)" stroke="#FF6A13" stroke-width="0.45"/>
    <rect width="1.81818" height="1.81818" transform="matrix(-1.89276e-08 1 -0.866025 -0.5 34.4374 46)" fill="#FF6A13"/>
    <path opacity="0.9" d="M38.5 44.301L76 22.6504V31.3106L38.5 52.9613V44.301Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 1)" fill="white" fill-opacity="0.9" stroke="black" stroke-width="0.25"/>
`;

let svgContainer = null;
let unregisterThemeObserver = null;
let mouseMoveHandler = null;

onMounted(() => {
  initDocSelector();
});

onUnmounted(() => {
  // Clean up when component is destroyed
  if (svgContainer && svgContainer.parentNode) {
    svgContainer.parentNode.removeChild(svgContainer);
  }
  if (unregisterThemeObserver) {
    unregisterThemeObserver();
  }
  if (mouseMoveHandler) {
    document.removeEventListener("mousemove", mouseMoveHandler);
  }
});

function initDocSelector() {
  let isDark = false;
  let topLabel, middleLabel, bottomLabel, docText, innerWhiteSquare;
  let activeLayer = null;
  let isExpanded = false;

  function onThemeChange(cb) {
    const root = document.documentElement;

    // Fire once on start-up
    cb(root.classList.contains("dark"));

    // Observe further changes
    const ob = new MutationObserver(() => cb(root.classList.contains("dark")));
    ob.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => ob.disconnect(); // optional: call to stop watching
  }

  // Function to update theme colors
  function updateThemeColors(dark) {
    isDark = dark;

    const textColor = isDark ? "#e5e5e5" : "#333";
    const lineColor = isDark ? "#888" : "#666";

    // Update the "Select your documentation" text color
    const docTextSpan = docText.querySelector("span");
    if (docTextSpan) {
      docTextSpan.style.color = textColor;
    }

    // Update label colors
    if (topLabel && topLabel.label) {
      topLabel.label.style.color = textColor;
      topLabel.svg.querySelector("path").setAttribute("stroke", lineColor);
    }
    if (middleLabel && middleLabel.label) {
      middleLabel.label.style.color = textColor;
      middleLabel.svg.querySelector("path").setAttribute("stroke", lineColor);
    }
    if (bottomLabel && bottomLabel.label) {
      bottomLabel.label.style.color = textColor;
      bottomLabel.svg.querySelector("path").setAttribute("stroke", lineColor);
    }
    if (innerWhiteSquare) {
      innerWhiteSquare.style.backgroundColor = isDark ? "black" : "white";
    }
  }

  // Create container for the layered SVG structure
  svgContainer = document.createElement("div");
  svgContainer.style.position = "fixed";
  svgContainer.style.bottom = "15px";
  svgContainer.style.right = "30px";
  svgContainer.style.zIndex = "1000";

  // Select your documentation text with chevron
  docText = document.createElement("div");
  docText.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 14px; text-align: center; font-family: monospace; font-weight: 400; font-size: 10px;">
      <span>Select your documentation</span>
      <svg width="12" height="7" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.875 1L4.4375 4.125L1 1" stroke="#939393" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  `;
  docText.style.position = "absolute";
  docText.style.top = "-70px";
  docText.style.left = "50%";
  docText.style.transform = "translateX(-50%)";
  docText.style.transition = "opacity 0.15s ease";
  docText.style.opacity = "1";

  // Create a wrapper for the layered SVGs
  const layerWrapper = document.createElement("div");
  layerWrapper.style.position = "relative";
  layerWrapper.style.width = "77px";
  layerWrapper.style.height = "70px";
  layerWrapper.style.transition = "all 0.1s ease";
  layerWrapper.style.zIndex = "1001"; // Higher than hover zone

  // Create containers for each layer that will be either an 'a' or 'div' tag
  const createLayerContainer = (cookbookName, link) => {
    const container = document.createElement("div");
    const isCurrent = currentCookbook === cookbookName;

    if (isCurrent) {
      container.style.cursor = "default";
    }

    container.style.position = "absolute";
    container.style.display = "block";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.top = "0";
    container.style.left = "0";
    container.style.pointerEvents = "none";

    return container;
  };

  const aoContainer = createLayerContainer("AO", AO_LINK);
  const hyperbeamContainer = createLayerContainer("HYPERBEAM", HYPERBEAM_LINK);
  const arweaveContainer = createLayerContainer("ARWEAVE", ARWEAVE_LINK);

  const createLayerLabel = (text, color, position, lineDirection) => {
    const labelContainer = document.createElement("div");
    labelContainer.style.position = "absolute";
    labelContainer.style.display = "flex";
    labelContainer.style.alignItems = "center";
    labelContainer.style.transition = "all 0.15s ease";
    labelContainer.style.opacity = "0"; // Initially hidden
    labelContainer.style.pointerEvents = "none";

    // Create text label first
    const label = document.createElement("span");
    label.textContent = text;
    label.style.position = "absolute";
    label.style.fontSize = "12px";
    label.style.fontFamily = "Roboto Mono, monospace";
    label.style.color = "#333";
    label.style.fontWeight = "400";
    label.style.whiteSpace = "nowrap";
    label.style.padding = "2px 0";
    label.style.letterSpacing = "-1%";
    label.style.display = "flex"; // for the orange square
    label.style.alignItems = "center";

    // Create connecting line using SVG for angled lines
    const lineSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    lineSvg.setAttribute("width", "60");
    lineSvg.setAttribute("height", "30");
    lineSvg.setAttribute("viewBox", "0 0 60 30");
    lineSvg.style.position = "absolute";

    let linePath, labelPosition, svgPosition;

    switch (position) {
      case "top-right":
        // Line goes from bottom-left to top-right
        linePath = "M-3.57628e-07 7H48V0";
        labelPosition = { right: "-28px", top: "-15px" };
        svgPosition = { right: "-31px", top: "10px" };
        labelContainer.style.flexDirection = "row";
        break;
      case "left":
        // Line goes horizontally to the left
        linePath = "M39.5 6H1V0";
        labelPosition = { right: "-52px", top: "-15px" };
        svgPosition = { right: "-80px", top: "10px" };
        labelContainer.style.flexDirection = "row";
        break;
      case "bottom-right":
        // Line goes from top-left to bottom-right
        linePath = "M2.38419e-07 1H49V8";
        labelPosition = { right: "-55px", bottom: "-2px" };
        svgPosition = { right: "-31px", top: "-30px" };
        labelContainer.style.flexDirection = "row";
        break;
    }

    // Set label position
    Object.assign(label.style, labelPosition);

    // Create the line path
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", linePath);
    path.setAttribute("stroke", "#666");
    path.setAttribute("stroke-width", "1");
    path.setAttribute("fill", "none");

    lineSvg.appendChild(path);

    // Set SVG position
    Object.assign(lineSvg.style, svgPosition);

    labelContainer.appendChild(label);
    labelContainer.appendChild(lineSvg);

    return { container: labelContainer, svg: lineSvg, label: label };
  };

  // Create label containers for each layer
  topLabel = createLayerLabel("AO", "#333", "top-right");
  middleLabel = createLayerLabel("HYPERBEAM", "#333", "left");
  bottomLabel = createLayerLabel("ARWEAVE", "#333", "bottom-right");

  topLabel.container.addEventListener("click", () => {
    if (currentCookbook !== "AO") window.location.href = AO_LINK;
  });
  middleLabel.container.addEventListener("click", () => {
    if (currentCookbook !== "HYPERBEAM") window.location.href = HYPERBEAM_LINK;
  });
  bottomLabel.container.addEventListener("click", () => {
    if (currentCookbook !== "ARWEAVE") window.location.href = ARWEAVE_LINK;
  });

  // Add orange square accent to current cookbook label
  const orangeSquare = document.createElement("div");
  orangeSquare.style.width = "12px";
  orangeSquare.style.height = "12px";
  orangeSquare.style.marginRight = "6px";
  orangeSquare.style.flexShrink = "0";
  orangeSquare.style.position = "relative";
  orangeSquare.style.backgroundColor = "#FF6A13";
  orangeSquare.style.border = "1px solid #FF6A13";

  // Create inner white square
  innerWhiteSquare = document.createElement("div");
  innerWhiteSquare.style.width = "10px";
  innerWhiteSquare.style.height = "10px";
  innerWhiteSquare.style.backgroundColor = "white";
  innerWhiteSquare.style.position = "absolute";
  innerWhiteSquare.style.border = "1px solid #FF6A13";

  // Create innermost orange square
  const innermostSquare = document.createElement("div");
  innermostSquare.style.width = "4px";
  innermostSquare.style.height = "4px";
  innermostSquare.style.backgroundColor = "#FF6A13";
  innermostSquare.style.position = "absolute";
  innermostSquare.style.top = "2px";
  innermostSquare.style.left = "2px";

  innerWhiteSquare.appendChild(innermostSquare);
  orangeSquare.appendChild(innerWhiteSquare);

  // Add the orange square directly to the current cookbook label
  if (currentCookbook === "ARWEAVE") {
    bottomLabel.label.insertBefore(orangeSquare, bottomLabel.label.firstChild);
  } else if (currentCookbook === "HYPERBEAM") {
    middleLabel.label.insertBefore(orangeSquare, middleLabel.label.firstChild);
  } else if (currentCookbook === "AO") {
    topLabel.label.insertBefore(orangeSquare, topLabel.label.firstChild);
  }

  // Position the label containers relative to the layer wrapper
  topLabel.container.style.top = "0px";
  topLabel.container.style.right = "0px";

  middleLabel.container.style.top = "22px";
  middleLabel.container.style.left = "0px";

  bottomLabel.container.style.bottom = "-15px";
  bottomLabel.container.style.right = "-140px";

  // Create bottom layer SVG
  const bottomSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  bottomSvg.setAttribute("width", "77");
  bottomSvg.setAttribute("height", "70");
  bottomSvg.setAttribute("viewBox", "0 0 77 70");
  bottomSvg.style.position = "absolute";
  bottomSvg.style.top = "17px";
  bottomSvg.style.left = "0";
  bottomSvg.style.transition = "all 0.15s ease";
  if (currentCookbook === "ARWEAVE") {
    bottomSvg.innerHTML = selectedBottomLayer;
  } else {
    bottomSvg.innerHTML = bottomLayer;
  }

  // Create middle layer SVG
  const middleSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  middleSvg.setAttribute("width", "77");
  middleSvg.setAttribute("height", "70");
  middleSvg.setAttribute("viewBox", "0 0 77 70");
  middleSvg.style.position = "absolute";
  middleSvg.style.top = "9px";
  middleSvg.style.left = "0";
  middleSvg.style.transition = "all 0.15s ease";
  if (currentCookbook === "HYPERBEAM") {
    middleSvg.innerHTML = selectedMiddleLayer;
  } else {
    middleSvg.innerHTML = middleLayer;
  }

  // Create top layer SVG
  const topSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  topSvg.setAttribute("width", "77");
  topSvg.setAttribute("fill", "none");
  topSvg.setAttribute("height", "70");
  topSvg.setAttribute("viewBox", "0 0 77 70");
  topSvg.style.position = "absolute";
  topSvg.style.top = "0px";
  topSvg.style.left = "0";
  topSvg.style.transition = "all 0.15s ease";
  if (currentCookbook === "AO") {
    topSvg.innerHTML = selectedTopLayer;
  } else {
    topSvg.innerHTML = topLayer;
  }

  // Add the documentation text and layer wrapper to the main container
  layerWrapper.appendChild(docText);
  svgContainer.appendChild(layerWrapper);

  // Create a large hover detection area that covers the entire bottom-right corner
  const hoverZone = document.createElement("div");
  hoverZone.style.position = "absolute";
  hoverZone.style.width = "150px";
  hoverZone.style.height = "160px";
  hoverZone.style.bottom = "0px";
  hoverZone.style.right = "0px";
  hoverZone.style.background = "transparent";
  hoverZone.style.pointerEvents = "none";
  hoverZone.style.zIndex = "1000";
  svgContainer.appendChild(hoverZone);

  function expandState() {
    if (isExpanded) return;
    isExpanded = true;

    svgContainer.style.right = "70px";

    // Hide the documentation text when hovering over layers
    docText.style.opacity = "0";

    // Show the labels
    topLabel.container.style.opacity = "1";
    middleLabel.container.style.opacity = "1";
    bottomLabel.container.style.opacity = "1";

    // Enable pointer events for clickable labels
    if (currentCookbook !== "AO") {
      topLabel.container.style.pointerEvents = "auto";
      topLabel.container.style.cursor = "pointer";
    }
    if (currentCookbook !== "HYPERBEAM") {
      middleLabel.container.style.pointerEvents = "auto";
      middleLabel.container.style.cursor = "pointer";
    }
    if (currentCookbook !== "ARWEAVE") {
      bottomLabel.container.style.pointerEvents = "auto";
      bottomLabel.container.style.cursor = "pointer";
    }

    // Increase container size to accommodate scaling and gaps
    layerWrapper.style.width = "120px";
    layerWrapper.style.height = "90px";

    // Scale and reposition each layer to create gaps
    topSvg.style.transform = "scale(1.4)";
    topSvg.style.top = "-7px";

    middleSvg.style.transform = "scale(1.4)";
    middleSvg.style.top = "15px";

    bottomSvg.style.transform = "scale(1.4)";
    bottomSvg.style.top = "35px";

    // Adjust label positions to match the new layer positions
    topLabel.container.style.top = "-0px";
    topLabel.container.style.right = "0px";

    middleLabel.container.style.top = "22px";
    middleLabel.container.style.left = "-74px";

    bottomLabel.container.style.bottom = "0px";
    bottomLabel.container.style.right = "0px";

    // Enlarge hoverZone and enable pointer capture during expanded state
    hoverZone.style.width = "300px";
    hoverZone.style.height = "220px";
    hoverZone.style.pointerEvents = "auto";
  }

  // Add hover effects to the layer wrapper to trigger expansion
  layerWrapper.addEventListener("mouseenter", expandState);
  hoverZone.addEventListener("mouseenter", expandState);

  // Function to reset hover state
  function resetHoverState() {
    if (!isExpanded) return;
    isExpanded = false;

    // Shrink hoverZone and disable pointer capture
    hoverZone.style.width = "150px";
    hoverZone.style.height = "160px";
    hoverZone.style.pointerEvents = "none";

    svgContainer.style.right = "30px";

    // Show the documentation text when not hovering
    docText.style.opacity = "1";

    // Hide the labels
    topLabel.container.style.opacity = "0";
    middleLabel.container.style.opacity = "0";
    bottomLabel.container.style.opacity = "0";

    // Reset label colors when collapsing
    resetLabelColors();

    // Disable pointer events when not hovering
    topLabel.container.style.pointerEvents = "none";
    middleLabel.container.style.pointerEvents = "none";
    bottomLabel.container.style.pointerEvents = "none";

    // Reset container size
    layerWrapper.style.width = "77px";
    layerWrapper.style.height = "70px";

    // Reset scale and positioning
    topSvg.style.transform = "scale(1)";
    topSvg.style.top = "0px";

    middleSvg.style.transform = "scale(1)";
    middleSvg.style.top = "9px";

    bottomSvg.style.transform = "scale(1)";
    bottomSvg.style.top = "17px";

    // Reset label positions
    topLabel.container.style.top = "-7px";
    topLabel.container.style.right = "-140px";

    middleLabel.container.style.top = "15px";
    middleLabel.container.style.left = "-140px";

    bottomLabel.container.style.bottom = "-15px";
    bottomLabel.container.style.right = "-140px";

    // Remove global mousemove handler
    if (mouseMoveHandler) {
      document.removeEventListener("mousemove", mouseMoveHandler);
      mouseMoveHandler = null;
    }
  }

  // Reset when mouse leaves the hover zone
  hoverZone.addEventListener("mouseleave", resetHoverState);

  // Track mouse movement globally to collapse when cursor exits the component
  mouseMoveHandler = (event) => {
    const bounds = svgContainer.getBoundingClientRect();
    if (
      event.clientX < bounds.left - 2 ||
      event.clientX > bounds.right + 2 ||
      event.clientY < bounds.top - 2 ||
      event.clientY > bounds.bottom + 2
    ) {
      resetHoverState();
    }
  };
  document.addEventListener("mousemove", mouseMoveHandler);

  // Add click listener to the wrapper
  layerWrapper.addEventListener("click", () => {
    if (!activeLayer || activeLayer === currentCookbook) return;

    const links = {
      AO: AO_LINK,
      HYPERBEAM: HYPERBEAM_LINK,
      ARWEAVE: ARWEAVE_LINK,
    };

    const link = links[activeLayer];
    if (link) {
      window.location.href = link;
    }
  });

  // Function to handle layer opacity based on mouse position
  function handleLayerOpacity(event) {
    // If the mouse is over a label, let the label's handler take precedence
    if (
      topLabel.container.matches(":hover") ||
      middleLabel.container.matches(":hover") ||
      bottomLabel.container.matches(":hover")
    ) {
      return;
    }

    const rect = layerWrapper.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;
    const containerHeight = rect.height;

    // Divide the container into three equal sections
    const sectionHeight = containerHeight / 3;

    // Determine which section the mouse is in and highlight that layer
    if (mouseY <= sectionHeight) {
      setHighlight("AO");
    } else if (mouseY <= sectionHeight * 2) {
      setHighlight("HYPERBEAM");
    } else {
      setHighlight("ARWEAVE");
    }
  }

  // Function to grey out non-active labels
  function greyOutOtherLabels(activeLayerName) {
    const greyColor = isDark ? "#666" : "#999";
    const greyLineColor = isDark ? "#444" : "#bbb";
    const normalColor = isDark ? "#e5e5e5" : "#333";
    const normalLineColor = isDark ? "#888" : "#666";

    // Reset all labels and lines to normal color first
    topLabel.label.style.color = normalColor;
    middleLabel.label.style.color = normalColor;
    bottomLabel.label.style.color = normalColor;
    topLabel.svg.querySelector("path").setAttribute("stroke", normalLineColor);
    middleLabel.svg
      .querySelector("path")
      .setAttribute("stroke", normalLineColor);
    bottomLabel.svg
      .querySelector("path")
      .setAttribute("stroke", normalLineColor);

    // Grey out the non-active labels and their lines
    if (activeLayerName === "AO") {
      middleLabel.label.style.color = greyColor;
      bottomLabel.label.style.color = greyColor;
      middleLabel.svg
        .querySelector("path")
        .setAttribute("stroke", greyLineColor);
      bottomLabel.svg
        .querySelector("path")
        .setAttribute("stroke", greyLineColor);
    } else if (activeLayerName === "HYPERBEAM") {
      topLabel.label.style.color = greyColor;
      bottomLabel.label.style.color = greyColor;
      topLabel.svg.querySelector("path").setAttribute("stroke", greyLineColor);
      bottomLabel.svg
        .querySelector("path")
        .setAttribute("stroke", greyLineColor);
    } else if (activeLayerName === "ARWEAVE") {
      topLabel.label.style.color = greyColor;
      middleLabel.label.style.color = greyColor;
      topLabel.svg.querySelector("path").setAttribute("stroke", greyLineColor);
      middleLabel.svg
        .querySelector("path")
        .setAttribute("stroke", greyLineColor);
    }
  }

  // Function to reset all labels to normal color
  function resetLabelColors() {
    const normalColor = isDark ? "#e5e5e5" : "#333";
    const normalLineColor = isDark ? "#888" : "#666";

    topLabel.label.style.color = normalColor;
    middleLabel.label.style.color = normalColor;
    bottomLabel.label.style.color = normalColor;

    topLabel.svg.querySelector("path").setAttribute("stroke", normalLineColor);
    middleLabel.svg
      .querySelector("path")
      .setAttribute("stroke", normalLineColor);
    bottomLabel.svg
      .querySelector("path")
      .setAttribute("stroke", normalLineColor);
  }

  // Function to set the highlight state of the layers
  function setHighlight(layerName) {
    if (layerName === "AO") {
      topSvg.style.opacity = "1";
      middleSvg.style.opacity = "0.15";
      bottomSvg.style.opacity = "0.05";
      activeLayer = "AO";
      layerWrapper.style.cursor =
        currentCookbook !== "AO" ? "pointer" : "default";
      greyOutOtherLabels("AO");
    } else if (layerName === "HYPERBEAM") {
      topSvg.style.opacity = "0.15";
      middleSvg.style.opacity = "1";
      bottomSvg.style.opacity = "0.05";
      activeLayer = "HYPERBEAM";
      layerWrapper.style.cursor =
        currentCookbook !== "HYPERBEAM" ? "pointer" : "default";
      greyOutOtherLabels("HYPERBEAM");
    } else if (layerName === "ARWEAVE") {
      topSvg.style.opacity = "0.15";
      middleSvg.style.opacity = "0.15";
      bottomSvg.style.opacity = "1";
      activeLayer = "ARWEAVE";
      layerWrapper.style.cursor =
        currentCookbook !== "ARWEAVE" ? "pointer" : "default";
      greyOutOtherLabels("ARWEAVE");
    }
  }

  // Add mouseenter events to labels to set the highlight
  topLabel.container.addEventListener("mouseenter", () => {
    setHighlight("AO");
    greyOutOtherLabels("AO");
  });
  middleLabel.container.addEventListener("mouseenter", () => {
    setHighlight("HYPERBEAM");
    greyOutOtherLabels("HYPERBEAM");
  });
  bottomLabel.container.addEventListener("mouseenter", () => {
    setHighlight("ARWEAVE");
    greyOutOtherLabels("ARWEAVE");
  });

  // When leaving a label, re-evaluate position-based highlighting
  const handleLabelMouseLeave = (event) => {
    // Reset label colors when leaving a label
    resetLabelColors();

    // We need to manually trigger a mousemove to re-evaluate the position
    const moveEvent = new MouseEvent("mousemove", {
      bubbles: true,
      cancelable: true,
      clientX: event.clientX,
      clientY: event.clientY,
    });
    layerWrapper.dispatchEvent(moveEvent);
  };

  topLabel.container.addEventListener("mouseleave", handleLabelMouseLeave);
  middleLabel.container.addEventListener("mouseleave", handleLabelMouseLeave);
  bottomLabel.container.addEventListener("mouseleave", handleLabelMouseLeave);

  // Function to reset all layers to full opacity when mouse leaves
  function resetLayerOpacity() {
    topSvg.style.opacity = "1";
    middleSvg.style.opacity = "1";
    bottomSvg.style.opacity = "1";
    layerWrapper.style.cursor = "default";
    activeLayer = null;
    resetLabelColors();
  }

  // Add mouse tracking to the layer wrapper
  layerWrapper.addEventListener("mousemove", handleLayerOpacity);
  layerWrapper.addEventListener("mouseleave", resetLayerOpacity);

  // Layer the SVGs (bottom to top)
  arweaveContainer.appendChild(bottomSvg);
  hyperbeamContainer.appendChild(middleSvg);
  aoContainer.appendChild(topSvg);

  // Add the labels to the layer wrapper
  layerWrapper.appendChild(topLabel.container);
  layerWrapper.appendChild(middleLabel.container);
  layerWrapper.appendChild(bottomLabel.container);

  // Add the new containers to the main wrapper
  layerWrapper.appendChild(arweaveContainer);
  layerWrapper.appendChild(hyperbeamContainer);
  layerWrapper.appendChild(aoContainer);

  // Append container to body
  document.body.appendChild(svgContainer);

  // Set up theme change handler after all elements are created
  unregisterThemeObserver = onThemeChange(updateThemeColors);
}
</script> 
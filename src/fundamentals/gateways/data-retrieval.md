---
title: Fetching Data from Arweave
---

# Fetching Data from Arweave

Once you have a transaction ID (txid) or ArNS name, there are several ways to fetch the associated data from the Arweave network. This guide covers the main approaches available to developers.

## Overview

When you need to retrieve data stored on Arweave, you have multiple options depending on your use case:

- **HTTP API**: Direct HTTP requests to gateway endpoints
- **Arweave.js**: JavaScript/TypeScript SDK for programmatic access
- **ARIO Wayfinder**: Intelligent routing and verification protocol

## Available Methods

### [HTTP API](./http-api.md)

The simplest approach using standard HTTP requests to Arweave gateways. Perfect for basic data retrieval and when you want minimal dependencies.

**Best for:**

- Simple data fetching
- Server-side applications
- When you want to avoid additional packages

### [Arweave JS](./arweave-js.md)

The official JavaScript/TypeScript SDK that provides a comprehensive interface to the Arweave network.

**Best for:**

- JavaScript/TypeScript applications
- Complex Arweave operations
- When you need transaction metadata and data

### [ARIO Wayfinder](./wayfinder.md)

A protocol that provides decentralized, cryptographically verified access with intelligent gateway routing.

**Best for:**

- Production applications requiring reliability
- When you need automatic gateway selection
- Applications requiring data verification

## Quick Comparison

| Method     | Complexity | Dependencies            | Features                          |
| ---------- | ---------- | ----------------------- | --------------------------------- |
| HTTP API   | Low        | None                    | Basic data retrieval              |
| Arweave.js | Medium     | `arweave` package       | Full transaction access           |
| Wayfinder  | Medium     | `@ar.io/wayfinder-core` | Intelligent routing, verification |

## Getting Started

Choose the method that best fits your needs:

1. **Start with HTTP API** if you want the simplest approach
2. **Use Arweave.js** if you're building a JavaScript/TypeScript application
3. **Consider Wayfinder** if you need production-grade reliability and verification

Each method page includes installation instructions, basic usage examples, and links to more detailed documentation.

# Changelog

All notable changes to CineBook will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-05-31

### Added
- ⭐ **User Reviews & Ratings** — Logged-in users can rate movies (1-10 stars) and leave comments.
- 🔄 Automatic calculation of movie overall rating based on user reviews using MongoDB transactions.
- 🎨 Interactive `ReviewModal` for submission and `ReviewSection` for displaying reviews with dark-mode support.

## [1.2.0] - 2026-05-31

### Added
- 🌙 **Dark Mode Toggle** — sun/moon switch in the header with smooth transitions
- 🎨 Dark theme for all pages: Home, Movies, Movie Details, Profile, Login, Signup
- 🎨 Dark theme for all components: Header, Footer, BannerSlider, Recommended, LiveEvents, MovieCard, MovieFilters, MovieList, TheaterTimings
- 💾 Theme preference persisted in localStorage
- 🧩 New `ThemeContext` provider for app-wide dark mode state management

## [1.1.0] - 2026-05-31

### Added
- 🔧 `/api/v1/version` endpoint — returns app name, version, and timestamp
- 🏷️ Version badge in the frontend footer — visually shows deployed version

## [1.0.0] - 2026-05-31

### Added
- 🎭 Theatre & Show Management
- 🎟️ Movie Listings with Metadata
- 🪑 Dynamic Seat Layouts with Real-Time Status
- 🧾 Booking with Payment Simulation
- 🧮 Concurrency Handling for Seat Booking
- 🗺️ Grouped Showtimes by Location & Theatre
- 🔐 Auth & Role-Based Access (Admin/Customer)
- ⚙️ Clean Architecture (Services, Controllers, Routes, Validations)
- 📦 MongoDB + Mongoose Models
- 💬 Toast & Modal Feedback UI
- 🐳 Docker Compose multi-container setup (MongoDB + Backend + Frontend)
- 🤖 Jenkins CI/CD pipelines (EC2 + Kubernetes)
- 📜 Ansible deployment playbook
- ☸️ Kubernetes manifests for container orchestration
- 🏷️ Release versioning system with Git tags + Docker image tagging

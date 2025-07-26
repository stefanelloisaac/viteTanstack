# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application built with TanStack Start (React Router) and Vite, using shadcn/ui components with Tailwind CSS. The project demonstrates a server-side rendered counter application with file-based persistence.

## Development Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm test` - No tests configured (placeholder script)

## Architecture

### Tech Stack
- **Framework**: TanStack Start (React Router with SSR)
- **Build Tool**: Vite 7
- **UI Library**: shadcn/ui components (New York style)
- **Styling**: Tailwind CSS v4 with CSS variables
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Project Structure
- `src/routes/` - File-based routing (TanStack Router)
- `src/components/ui/` - shadcn/ui component library
- `src/lib/utils.ts` - Utility functions (cn helper, etc.)
- `src/hooks/` - Custom React hooks
- `components.json` - shadcn/ui configuration

### Key Features
- Server functions for data persistence using `createServerFn`
- File-based state persistence (`count.txt`)
- Complete shadcn/ui component set pre-installed
- TypeScript with path aliases (`@/*` → `./src/*`)

### Server Functions
The app uses TanStack Start's server functions pattern:
- `getCount` - GET method to read current count from file
- `updateCount` - POST method to modify count value
- Server functions are defined in route files and called from client components

### Development Notes
- Uses React 19 with modern JSX transform
- Tailwind CSS v4 with Vite plugin integration
- TypeScript strict null checks enabled
- Path resolution configured for `@/` imports
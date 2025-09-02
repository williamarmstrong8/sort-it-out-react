# Component Map - React Migration

## Legacy HTML Structure → React Components

### Pages
- `index.html` → `src/pages/Home.tsx`
- `thank-you.html` → `src/pages/ThankYou.tsx`

### Layout Components
- `src/layouts/SiteLayout.tsx` - Main layout with header/footer
- `src/layouts/SimpleLayout.tsx` - Minimal layout for thank you page

### UI Components
- `src/components/ui/Button.tsx` - CTA buttons, form buttons
- `src/components/ui/Input.tsx` - Form inputs with floating labels
- `src/components/ui/Modal.tsx` - Any modals (if needed)
- `src/components/ui/Navbar.tsx` - Navigation with mobile menu
- `src/components/ui/Footer.tsx` - Site footer

### Section Components
- `src/components/sections/Hero.tsx` - Hero section with background image
- `src/components/sections/Services.tsx` - Services slider with before/after
- `src/components/sections/System.tsx` - 3 'S' System section
- `src/components/sections/About.tsx` - About section
- `src/components/sections/Contact.tsx` - Contact form and info

### Hooks
- `src/hooks/useScrollPosition.ts` - Navbar scroll effects
- `src/hooks/useIntersectionObserver.ts` - Scroll animations
- `src/hooks/useLocalStorage.ts` - Form persistence (if needed)

### Legacy Features to Migrate

#### Navigation
- Sticky navbar with scroll effects
- Services dropdown menu
- Mobile hamburger menu
- Smooth scroll to sections

#### Services Slider
- 7 service slides with before/after images
- Interactive before/after slider handle
- Navigation arrows and indicators
- Auto-advance functionality

#### Form Handling
- Contact form with FormSubmit.co integration
- Floating label inputs
- Form validation
- Thank you page redirect

#### Animations
- Hero text fade-in animations
- Scroll-triggered section reveals
- Hover effects on buttons and cards
- Smooth transitions

#### Responsive Behavior
- Mobile-first design
- Breakpoints: 375px, 768px, 1024px, 1440px
- Mobile menu overlay
- Responsive grid layouts

## CSS to Tailwind Mapping

### Colors
- `--primary-color: #1a1a1a` → `text-primary`
- `--accent-color: #D4AF37` → `text-accent`
- `--accent-color-dark: #1e3a5f` → `text-accent-dark`

### Typography
- `font-family: 'Playfair Display'` → `font-playfair`
- `font-family: 'Inter'` → `font-inter`
- `font-size: 4.5rem` → `text-7xl` (hero h1)
- `font-size: 3rem` → `text-5xl` (section headings)

### Spacing
- `padding: 8rem 2rem` → `py-32 px-8`
- `margin-bottom: 4rem` → `mb-16`
- `gap: 4rem` → `gap-16`

### Layout
- `max-width: 1400px` → `max-w-7xl`
- `grid-template-columns: 1fr 1fr` → `grid-cols-1 lg:grid-cols-2`
- `border-radius: 10px` → `rounded-lg`

## JavaScript to React Hooks

### DOM Manipulation
- `document.querySelector` → `useRef` + `useEffect`
- `addEventListener` → Event handlers in JSX
- `classList.toggle` → `useState` boolean
- `scrollIntoView` → `useNavigate` or scroll refs

### State Management
- Slider state → `useState` for current slide
- Mobile menu → `useState` for menu open/closed
- Form data → `useState` for form fields
- Scroll position → `useState` + `useEffect`

### Effects
- Scroll listeners → `useEffect` + `useCallback`
- Intersection Observer → Custom hook
- Form submission → `useEffect` for side effects
- Image lazy loading → `useEffect` + Intersection Observer

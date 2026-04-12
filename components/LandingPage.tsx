'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import HeroSVG from '@/components/Herosvg'
import styles from './landingpage.module.css'

const FEATURES = [
  {
    icon: '🌍',
    title: 'World Cuisines',
    desc: 'Explore authentic recipes from 11 cuisines — Italian, Japanese, Indian, Mexican, Thai and more.',
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    desc: 'Filter by cuisine, category, or main ingredient to find exactly what you feel like cooking.',
  },
  {
    icon: '🔖',
    title: 'Save Favourites',
    desc: 'Bookmark recipes you love and build your personal collection to revisit any time.',
  },
  {
    icon: '🍽️',
    title: '70+ Recipes',
    desc: 'Hand-curated dishes from starters to desserts, with full ingredients and step-by-step instructions.',
  },
  {
    icon: '⏱',
    title: 'Quick & Easy',
    desc: 'Every recipe shows cook time so you can plan meals around your schedule.',
  },
  {
    icon: '📱',
    title: 'Works Everywhere',
    desc: 'Perfectly designed for desktop and mobile — cook from your phone right in the kitchen.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    role: 'Home cook',
    avatar: 'SM',
    quote: 'FlavorFinds completely changed how I plan my weekly meals. The filter system is incredibly easy to use.',
  },
  {
    name: 'David K.',
    role: 'Food enthusiast',
    avatar: 'DK',
    quote: 'I discovered so many cuisines I had never tried before. The recipes are authentic and easy to follow.',
  },
  {
    name: 'Priya R.',
    role: 'Cooking teacher',
    avatar: 'PR',
    quote: 'I recommend FlavorFinds to all my students. The variety and quality of recipes is outstanding.',
  },
]

const CUISINE_BADGES = [
  '🍝 Italian', '🍣 Japanese', '🍛 Indian', '🌮 Mexican',
  '🥘 Spanish', '🍜 Thai', '🥗 French', '🫕 British',
  '🥡 Chinese', '🍖 American', '🍁 Canadian',
]

const STATS = [
  { value: '70+', label: 'Curated Recipes' },
  { value: '11',  label: 'World Cuisines'  },
  { value: '20+', label: 'Categories'      },
  { value: '100%', label: 'Free to Use'    },
]

export default function LandingPage() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.root}>

      {/* ══════════ NAVBAR ══════════ */}
      <header className={`${styles.navbar} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navInner}>

          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🍴</span>
            <span className={styles.logoText}>FlavorFinds</span>
          </Link>

          {/* Desktop nav links */}
          <nav className={styles.navLinks}>
            <a href="#features"      className={styles.navLink}>Features</a>
            <a href="#cuisines"      className={styles.navLink}>Cuisines</a>
            <a href="#testimonials"  className={styles.navLink}>Reviews</a>
          </nav>

          {/* Desktop CTA */}
          <div className={styles.navCta}>
            <Link href="/login"  className={styles.navLoginBtn}>Log in</Link>
            <Link href="/signup" className={styles.navSignupBtn}>Get started</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <a href="#features"     className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#cuisines"     className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Cuisines</a>
            <a href="#testimonials" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Reviews</a>
            <div className={styles.mobileDivider} />
            <Link href="/login"  className={styles.mobileLoginBtn}  onClick={() => setMenuOpen(false)}>Log in</Link>
            <Link href="/signup" className={styles.mobileSignupBtn} onClick={() => setMenuOpen(false)}>Get started free</Link>
          </div>
        )}
      </header>

      {/* ══════════ HERO ══════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}><HeroSVG /></div>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Discover · Cook · Enjoy
          </div>

          <h1 className={styles.heroTitle}>
            Your world of<br />
            <em>delicious recipes</em><br />
            awaits
          </h1>

          <p className={styles.heroSub}>
            Explore 70+ hand-curated recipes from 11 cuisines around the globe.
            Search by ingredient, category, or cuisine — and find your next favourite dish in seconds.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/signup" className={styles.heroCtaPrimary}>
              Get started free
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link href="/login" className={styles.heroCtaSecondary}>
              Sign in
            </Link>
          </div>

          <div className={styles.heroStats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.heroStat}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel} />
          </div>
        </div>
      </section>

      {/* ══════════ CUISINE BADGES ══════════ */}
      <section className={styles.cuisineStrip} id="cuisines">
        <div className={styles.stripTrack}>
          {[...CUISINE_BADGES, ...CUISINE_BADGES].map((c, i) => (
            <span key={i} className={styles.stripBadge}>{c}</span>
          ))}
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className={styles.features} id="features">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Why FlavorFinds</div>
          <h2 className={styles.sectionTitle}>
            Everything you need to<br /><em>cook with confidence</em>
          </h2>
          <p className={styles.sectionSub}>
            From discovery to the dinner table — FlavorFinds makes cooking accessible, enjoyable, and endlessly inspiring.
          </p>

          <div className={styles.featureGrid}>
            {FEATURES.map(f => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIconWrap}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SHOWCASE BAND ══════════ */}
      <section className={styles.showcase}>
        <div className={styles.showcaseBg}><HeroSVG /></div>
        <div className={styles.showcaseOverlay} />
        <div className={styles.showcaseInner}>
          <div className={styles.showcaseText}>
            <div className={styles.sectionLabel} style={{ color: '#FFB87A' }}>Explore the world</div>
            <h2 className={styles.showcaseTitle}>
              From street food to<br /><em>fine dining — all here</em>
            </h2>
            <p className={styles.showcaseSub}>
              Whether you're craving a comforting bowl of ramen, a smoky BBQ rack, or a delicate French tart — FlavorFinds has you covered with authentic, tested recipes.
            </p>
            <Link href="/signup" className={styles.heroCtaPrimary}>
              Start exploring free →
            </Link>
          </div>
          <div className={styles.showcaseCards}>
            {[
              { emoji: '🍝', name: 'Spaghetti Bolognese', tag: 'Italian · 40 min' },
              { emoji: '🍛', name: 'Lamb Biryani',         tag: 'Indian · 55 min'  },
              { emoji: '🌮', name: 'Chicken Fajitas',      tag: 'Mexican · 25 min' },
            ].map(r => (
              <div key={r.name} className={styles.showcaseCard}>
                <div className={styles.showcaseCardEmoji}>{r.emoji}</div>
                <div>
                  <div className={styles.showcaseCardName}>{r.name}</div>
                  <div className={styles.showcaseCardTag}>{r.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className={styles.testimonials} id="testimonials">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>What people say</div>
          <h2 className={styles.sectionTitle}>
            Loved by <em>food lovers</em> worldwide
          </h2>

          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>★★★★★</div>
                <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <div className={styles.finalCtaEmoji}>🍽️</div>
          <h2 className={styles.finalCtaTitle}>
            Ready to discover your next<br /><em>favourite dish?</em>
          </h2>
          <p className={styles.finalCtaSub}>
            Join thousands of food lovers. Free forever — no credit card required.
          </p>
          <div className={styles.finalCtaBtns}>
            <Link href="/signup" className={styles.heroCtaPrimary}>
              Create free account →
            </Link>
            <Link href="/login" className={styles.heroCtaSecondary} style={{ borderColor: 'rgba(255,248,240,0.3)', color: '#FFF8F0' }}>
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span>🍴</span>
            <strong>FlavorFinds</strong>
          </div>
          <div className={styles.footerLinks}>
            <a href="#features">Features</a>
            <Link href="/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </div>
          <p className={styles.footerCopy}>© 2025 FlavorFinds — Made with ♥ for food lovers</p>
        </div>
      </footer>

    </div>
  )
}

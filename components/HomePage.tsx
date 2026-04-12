'use client'

import { useState, useEffect, useCallback } from 'react'
import { Category, Ingredient, Meal, MealListItem } from '@/lib/types'
import { fetchCategories, fetchIngredients, fetchMealById, searchMeals } from '@/lib/api'
import RecipeCard from '@/components/RecipeCard'
import RecipeModal from '@/components/RecipeModal'
import HeroSVG from '@/components/Herosvg'
import styles from './homepage.module.css'
import { signOut } from "next-auth/react";
import Link from 'next/link'

const CUISINES = [
  'American', 'British', 'Canadian', 'Chinese', 'French',
  'Indian', 'Italian', 'Japanese', 'Mexican', 'Spanish', 'Thai',
]

const CATEGORY_PILLS = [
  { label: 'All', value: '', emoji: '' },
  { label: 'Beef', value: 'Beef', emoji: '🥩' },
  { label: 'Chicken', value: 'Chicken', emoji: '🍗' },
  { label: 'Seafood', value: 'Seafood', emoji: '🦞' },
  { label: 'Vegetarian', value: 'Vegetarian', emoji: '🥦' },
  { label: 'Pasta', value: 'Pasta', emoji: '🍝' },
  { label: 'Dessert', value: 'Dessert', emoji: '🍰' },
  { label: 'Starter', value: 'Starter', emoji: '🫕' },
  { label: 'Vegan', value: 'Vegan', emoji: '🌿' },
  { label: 'Pork', value: 'Pork', emoji: '🐷' },
  { label: 'Lamb', value: 'Lamb', emoji: '🍖' },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [category, setCategory] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [activePill, setActivePill] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [menuOpen, setMenuOpen] = useState(false)

  const [categories, setCategories] = useState<Category[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [filtersLoading, setFiltersLoading] = useState(true)

  const [meals, setMeals] = useState<MealListItem[]>([])
  const [resultsLoading, setResultsLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)

  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    async function loadFilters() {
      try {
        const [cats, ings] = await Promise.all([fetchCategories(), fetchIngredients()])
        setCategories(cats)
        setIngredients(ings)
      } catch (err) {
        console.error('Error loading filters:', err)
      } finally {
        setFiltersLoading(false)
      }
    }
    loadFilters()
  }, [])

  const doSearch = useCallback(async (
    term: string, cuis: string, cat: string, ing: string
  ) => {
    setResultsLoading(true)
    setNoResults(false)
    setMeals([])
    try {
      const results = await searchMeals(term, cuis, cat, ing)
      if (!results) {
        setNoResults(true)
      } else {
        setMeals(results)
      }
    } catch (err) {
      console.error('Error fetching recipes:', err)
      setNoResults(true)
    } finally {
      setResultsLoading(false)
    }
  }, [])

  useEffect(() => {
    doSearch('', '', '', '')
  }, [doSearch])

  const handleSearch = () => doSearch(searchTerm, cuisine, category, ingredient)

  const handleFilterChange = (
    field: 'cuisine' | 'category' | 'ingredient',
    value: string
  ) => {
    let newCuisine = cuisine, newCategory = category, newIngredient = ingredient
    if (field === 'cuisine') newCuisine = value
    if (field === 'category') newCategory = value
    if (field === 'ingredient') newIngredient = value
    setCuisine(newCuisine)
    setCategory(newCategory)
    setIngredient(newIngredient)
    doSearch(searchTerm, newCuisine, newCategory, newIngredient)
  }

  const handlePillClick = (value: string) => {
    setActivePill(value)
    setCategory(value)
    doSearch(searchTerm, cuisine, value, ingredient)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setCuisine('')
    setCategory('')
    setIngredient('')
    setActivePill('')
    doSearch('', '', '', '')
  }

  const handleViewRecipe = async (id: string) => {
    setModalOpen(true)
    setModalLoading(true)
    setSelectedMeal(null)
    try {
      const meal = await fetchMealById(id)
      setSelectedMeal(meal)
    } catch (err) {
      console.error('Error loading recipe:', err)
    } finally {
      setModalLoading(false)
    }
  }

  return (
    <>
    {/* ══════════ NAVBAR ══════════ */}
      <header className={styles.navbar}>
  <div className={styles.navInner}>

    {/* Logo */}
    <Link href="/" className={styles.logo}>
      <span className={styles.logoIcon}>🍴</span>
      <span className={styles.logoText}>FlavorFinds</span>
    </Link>

    {/* Nav Menu */}
    <nav className={styles.navMenu}>
      <button
        className={styles.navLink}
        onClick={() => document.getElementById('recipes-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Recipes
      </button>
      <Link href="/diet" className={styles.navLink}>
        Diet Tracker
      </Link>
    </nav>

    {/* Hamburger */}
    <button
      className={styles.hamburger}
      onClick={() => setMenuOpen(o => !o)}
      aria-label="Toggle menu"
    >
      <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
      <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
      <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
    </button>

    {/* Logout button */}
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={styles.logoutBtn}
    >
      Logout
    </button>

  </div>

  {/* Mobile menu */}
  {menuOpen && (
    <div className={styles.mobileMenu}>
      <button
        className={styles.mobileLink}
        onClick={() => {
          document.getElementById('recipes-section')?.scrollIntoView({ behavior: 'smooth' })
          setMenuOpen(false)
        }}
      >
        Recipes
      </button>
      <Link href="/diet" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
        Diet Tracker
      </Link>
      <div className={styles.mobileDivider} />
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className={styles.mobileLogoutBtn}
      >
        Logout
      </button>
    </div>
  )}
</header>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <HeroSVG />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover your next<br />
            <em>favourite dish</em>
          </h1>
          <p className={styles.heroSub}>
            Explore thousands of recipes from every corner of the world — find
            exactly what your taste buds are craving.
          </p>

          <div className={styles.searchWrap}>
            <span className={styles.searchIconInner}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search recipes, ingredients, cuisines…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
            />
            <button className={styles.searchBtn} onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.stat}><strong>70+</strong> Recipes</div>
            <div className={styles.stat}><strong>11</strong> Cuisines</div>
            <div className={styles.stat}><strong>20+</strong> Categories</div>
          </div>
        </div>
      </section>

      {/* ── PAGE BODY ── */}
      <div className={styles.pageBody}>

        {/* ── SIDEBAR ── */}
     
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Filters</div>
          <div className={styles.filterSection}>

            <div className={styles.filterBlock}>
              <label htmlFor="cuisine-filter">🌍 Cuisine</label>
              <select
                id="cuisine-filter"
                value={cuisine}
                onChange={e => handleFilterChange('cuisine', e.target.value)}
              >
                <option value="">All Cuisines</option>
                {CUISINES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.divider} />

            <div className={styles.filterBlock}>
              <label htmlFor="category-filter">🏷 Category</label>
              <select
                id="category-filter"
                value={category}
                disabled={filtersLoading}
                onChange={e => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c.strCategory} value={c.strCategory}>
                    {c.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.divider} />

            <div className={styles.filterBlock}>
              <label htmlFor="ingredient-filter">🥕 Main Ingredient</label>
              <select
                id="ingredient-filter"
                value={ingredient}
                disabled={filtersLoading}
                onChange={e => handleFilterChange('ingredient', e.target.value)}
              >
                <option value="">All Ingredients</option>
                {ingredients.map(i => (
                  <option key={i.strIngredient} value={i.strIngredient}>
                    {i.strIngredient}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.divider} />

            <button className={styles.clearBtn} onClick={handleClearFilters}>
              Clear all filters
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main id="recipes-section">
          {/* Category Pills */}
          <div className={styles.categoryPills}>
            {CATEGORY_PILLS.map(pill => (
              <button
                key={pill.value}
                className={`${styles.catPill} ${activePill === pill.value ? styles.catPillActive : ''}`}
                onClick={() => handlePillClick(pill.value)}
              >
                {pill.emoji && <span>{pill.emoji}</span>} {pill.label}
              </button>
            ))}
          </div>

          {/* Content Header */}
          <div className={styles.contentHeader}>
            <div>
              <div className={styles.contentTitle}>Popular Recipes</div>
              <div className={styles.resultCount}>
                {resultsLoading
                  ? 'Loading…'
                  : `Showing ${meals.length} recipe${meals.length !== 1 ? 's' : ''}`}
              </div>
            </div>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                ⊞
              </button>
              <button
                className={`${styles.viewToggleBtn} ${viewMode === 'list' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('list')}
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Results */}
          <div className={`${styles.recipeGrid} ${viewMode === 'list' ? styles.recipeList : ''}`}>
            {resultsLoading && Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skelImg} />
                <div className={styles.skelBody}>
                  <div className={styles.skelLine} />
                  <div className={`${styles.skelLine} ${styles.skelLineShort}`} />
                </div>
              </div>
            ))}

            {!resultsLoading && noResults && (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🍽️</div>
                <h3>No recipes found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}

            {!resultsLoading && meals.map(meal => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                onViewRecipe={handleViewRecipe}
                viewMode={viewMode}
              />
            ))}
          </div>
        </main>
      </div>

      {/* ── MODAL ── */}
      {modalOpen && (
        <RecipeModal
          meal={selectedMeal}
          loading={modalLoading}
          onClose={() => { setModalOpen(false); setSelectedMeal(null) }}
        />
      )}

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© 2025 <strong>FlavorFinds</strong> — Made with ♥ for food lovers</p>
        </div>
      </footer>
    </>
  )
}
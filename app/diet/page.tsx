import { DietProvider } from '@/components/diet/DietContext'
import NutritionSummary from '@/components/diet/NutritionSummary'
import FoodSearch from '@/components/diet/FoodSearch'
import FoodLog from '@/components/diet/FoodLog'
import GoalsEditor from '@/components/diet/GoalsEditor'
import HeroSVG from '@/components/Herosvg'

export default function DietPage() {
  return (
    <DietProvider>
      <header className="diet-page-header">
        <div className="diet-header-bg">
          <HeroSVG />
        </div>
        <div className="diet-header-overlay" />
        <div className="container">
          <div className="header-content">
            <h1><i className="fas fa-leaf" /> Diet Tracker</h1>
            <p className="diet-tagline">
              Track your nutrition with FlovorFinds — over 1 million foods
            </p>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Nav back to recipes */}
        <div className="diet-nav">
          <a href="/" className="diet-nav-link">
            <i className="fas fa-arrow-left" /> Back to Recipes
          </a>
        </div>

        <div className="diet-layout">
          {/* Left column */}
          <div className="diet-sidebar">
            <div className="diet-card">
              <NutritionSummary />
            </div>
            <div className="diet-card">
              <GoalsEditor />
            </div>
          </div>

          {/* Right column */}
          <div className="diet-main">
            <div className="diet-card">
              <FoodSearch />
            </div>
            <div className="diet-card">
              <FoodLog />
            </div>
          </div>
        </div>
      </div>

      <footer className="diet-footer">
        <div className="container">
          <p>
            © 2025 FlavorFinds | Nutrition data from{' '}
            <a
              href="https://fdc.nal.usda.gov/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffb26b' }}
            >
              USDA FoodData Central
            </a>
          </p>
        </div>
      </footer>
    </DietProvider>
  )
}

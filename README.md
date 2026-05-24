# Real Estate Investment Calculator

A web-based financial calculator tool for real estate investors with a freemium business model. Built to generate passive income with minimal maintenance after initial setup.

## Overview

This tool helps real estate investors analyze property deals by calculating key metrics like:
- Capitalization Rate (Cap Rate)
- Cash on Cash Return
- Monthly Mortgage Payment
- Loan-to-Value Ratio (LTV)
- And more...

Free tier provides essential calculations, while Premium ($7 one-time) unlocks advanced features like multi-year projections, export capabilities, and professional reports.

## Features

### Free Tier
- Cap Rate calculation
- Cash on Cash Return
- Monthly Mortgage Payment
- Loan-to-Value Ratio (LTV)
- Basic Annual Cash Flow
- Mobile-responsive design
- Unlimited calculations

### Premium Features ($7 one-time)
- Everything in Free
- Multi-Year Cash Flow Projections (5-10 years)
- Expense Growth & Appreciation Modeling
- Sensitivity Analysis (Best/Worst Case)
- Export Results (PDF/CSV)
- Professional Investment Reports
- Property Comparison Tool
- Tax Benefit Estimations
- Priority Support
- Free Updates for Life

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript (no frameworks)
- **Hosting**: GitHub Pages (free static hosting)
- **Payments**: Stripe integration (planned)
- **Analytics**: Google Analytics (optional)

## File Structure

```
financial-calculator-tool/
├── index.html          # Main calculator interface
├── pricing.html        # Premium upgrade page
├── calc.js             # Financial calculation engine
├── ui.js               # UI logic and DOM interactions
├── style.css           # Responsive styling
├── assets/             # Images, icons
├── .github/            # GitHub Pages configuration
└── README.md           # This file
```

## Setup Instructions

### Local Development
1. Clone or download this repository
2. Open `index.html` in your browser to test the calculator
3. No build process or dependencies required

### Deployment to GitHub Pages (Free)
1. Create a GitHub repository
2. Push this code to the `main` branch
3. Go to Repository Settings → Pages
4. Select source: `main` branch, `/` (root)
5. Your site will be live at `https://[username].github.io/[repository-name]`

### Stripe Integration (Future)
To enable payments:
1. Create a Stripe account at https://stripe.com
2. Get your publishable and secret keys
3. Implement Stripe Checkout in pricing.html
4. Add webhook handling for payment verification
5. Update the premium unlock logic in ui.js

## Maintenance Schedule

After launch, maintenance requirements are minimal:
- **Monthly**: Check analytics, respond to support inquiries (<30 mins)
- **Quarterly**: Review if financial formulas need updates (rare)
- **Bi-annually**: Consider adding new features based on user feedback
- **Ongoing**: Passive income from tool usage

## Business Model

This tool is designed as a passive income machine:
- **Hard Setup**: Initial development and niche research
- **Low Maintenance**: Stable financial formulas require infrequent updates
- **Low Cost**: Free hosting, minimal third-party services
- **Scalable**: Can create additional calculators in related niches
- **Evergreen**: Real estate calculations don't change drastically

## Customization

To adapt this tool for a different niche:
1. Update `calc.js` with relevant financial formulas
2. Modify `index.html` form fields for new inputs
3. Adjust result display in `ui.js`
4. Update marketing copy and SEO in HTML files
5. Change branding and color scheme in `style.css`

## Future Enhancements

- User accounts for saving calculations (Firebase/Supabase free tier)
- Email capture for marketing (Mailchimp free tier)
- Blog content for SEO and authority building
- Affiliate program for related real estate services
- Additional calculator tabs for different analysis types
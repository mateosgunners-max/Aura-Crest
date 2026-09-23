# Aura & Crest | Professional Business Consulting Website Template

A complete, production-ready, multi-page business website template engineered specifically for selling to local businesses and mid-market firms ($500 – $2,000 value). Built using pure semantic HTML5, modern CSS3 (with CSS Custom Properties/variables, Grid, and Flexbox), and vanilla ES6+ JavaScript—with zero framework dependencies, external runtime libraries, or build steps.

---

## 📁 Project Architecture

```text
├── index.html       # Homepage (Hero, Services Overview, Why Choose Us, Animated Stats, Testimonials, CTA, Footer)
├── about.html       # About Us (Origin Story, Mission & Vision, 4-Member Leadership Team, Milestone Timeline)
├── services.html    # Services & Pricing (6 Detailed Service Cards, 3-Tier Pricing Table with 'Most Popular' highlight, 8-Item FAQ Accordion)
├── portfolio.html   # Case Studies & Portfolio (Interactive Category Filter: All, Branding, Web, Marketing, Lightbox Modal)
├── blog.html        # Insights & Thought Leadership (6 Article Cards, Sidebar Search Filter, Category Counts, Recent Posts)
├── contact.html     # Contact & Booking (Validated Form, Google Maps Embed, Office Hours Table, Social Links)
├── style.css        # Single Master Stylesheet (CSS Variables, Responsive Breakpoints, Sticky Glassmorphism Header, Print CSS)
├── script.js        # Pure Vanilla JS (Drawer Nav, Animated Counters, Lightbox, FAQ Accordion, Form Validation, Blog Search)
└── README.md        # Comprehensive Termux Setup, Customization, and Client Delivery Guide
```

---

## 🎨 Theme Customization (Instant Rebranding)

You can instantly rebrand this website for any client (law firm, dental clinic, accounting practice, architectural studio, restaurant, or marketing agency) simply by modifying the CSS variables located at the top of `style.css`:

```css
:root {
  /* Change these to match your client's brand palette */
  --color-primary: #0B192C;        /* Dark Navy */
  --color-primary-light: #182C47;
  --color-secondary: #1E3E62;
  --color-accent: #C5A059;         /* Warm Gold Accent */
  --color-accent-hover: #D4AF37;
  --color-accent-light: #F9F5EC;   /* Soft Champagne Background */
  
  /* Typography */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 📱 Complete Termux Setup & Deployment Guide

This comprehensive guide takes you from an empty Termux installation on Android all the way to testing, LAN sharing, cloud deployment, and client packaging.

### Step 1: Install Required Packages in Termux

Launch Termux on your Android device and execute the following commands to update the package manager and install Python, Node.js, Git, and Zip utilities:

```bash
# Update repository lists and upgrade base packages
pkg update && pkg upgrade -y

# Grant Termux storage access permission (tap 'Allow' on Android pop-up)
termux-setup-storage

# Install Python 3, Node.js LTS, Git, and Zip
pkg install -y python nodejs git zip curl
```

Verify your installations:
```bash
python --version
node -v
git --version
zip -v
```

---

### Step 2: Create Project Folder Structure & Place Files

Create a dedicated folder for the project:

```bash
# Navigate to Termux home directory
cd ~

# Create the project directory and move inside
mkdir -p aura-crest-consulting
cd aura-crest-consulting
```

*Note:* You can either clone your repository, download the files directly into this directory, or write them using the built-in `nano` or `micro` editor:
```bash
# Example if using nano to edit any file
nano style.css
# Press CTRL+O to save, and CTRL+X to exit
```

---

### Step 3: Serve the Website Locally

You have two simple options to serve the website right from Termux:

#### Option A: Using Python 3 (Recommended - Fast & Lightweight)
```bash
# Run from inside the aura-crest-consulting folder:
python -m http.server 8080 --bind 0.0.0.0
```

#### Option B: Using Node.js (`npx serve`)
```bash
# Run with npx (no global install needed):
npx serve -l 8080
```

---

### Step 4: Test in Phone Browser via Localhost

1. Leave Termux running in the background.
2. Open Chrome, Brave, Firefox, or Samsung Internet on your Android device.
3. In the URL address bar, enter:
   ```text
   http://localhost:8080
   ```
4. Test navigation between all 6 pages, open the mobile hamburger menu, filter the portfolio gallery, expand the FAQ items, and test the contact form validation.

---

### Step 5: Share Local Server over LAN (Preview on Laptops, Tablets, or Client Phones)

To preview the live site on your laptop, iPad, or another client device connected to the **same Wi-Fi network**:

1. Find your phone's local IP address in Termux:
   ```bash
   # Check network interfaces (look for wlan0 'inet' address)
   ip addr show wlan0
   ```
   *Alternative one-liner to get just your IP:*
   ```bash
   ifconfig wlan0 | grep 'inet ' | awk '{print $2}'
   ```
   *(Example output: `192.168.1.45`)*

2. Start the Python server bound to all network interfaces:
   ```bash
   python -m http.server 8080 --bind 0.0.0.0
   ```

3. Open the browser on your laptop or client device and navigate to:
   ```text
   http://192.168.1.45:8080
   ```
   *(Replace `192.168.1.45` with your phone's actual IP address).*

---

### Step 6: Deploy Free to GitHub Pages or Netlify CLI

#### Option A: Deploy to GitHub Pages (Free Permanent Hosting)

1. Initialize git and commit:
   ```bash
   cd ~/aura-crest-consulting
   git init
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   git add .
   git commit -m "Initial commit of Aura & Crest website template"
   ```

2. Create a repository on GitHub (e.g. `client-website`), then link and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/client-website.git
   git push -u origin main
   ```

3. In GitHub repo settings: Navigate to **Settings** > **Pages** > Under "Branch", select `main` and `/ (root)` > Click **Save**.
4. Your site will be live at: `https://<your-username>.github.io/client-website/` within 60 seconds!

#### Option B: Deploy Instantly with Netlify CLI

Netlify gives you an instant SSL-secured production URL with custom domain support:

```bash
# Install Netlify CLI globally via npm
npm install -g netlify-cli

# Login to your Netlify account (opens a browser authentication tab)
netlify login

# Deploy your site directly from Termux
cd ~/aura-crest-consulting
netlify deploy --prod --dir=.
```
Follow the interactive prompts (select "Create & configure a new site"). Netlify will output your live URL (e.g., `https://client-firm-preview.netlify.app`).

---

### Step 7: Zip the Project for Client Delivery

When you are ready to package the finished website for handoff to your client or upload to cPanel/hosting:

```bash
cd ~/aura-crest-consulting

# Package all production files into a clean distribution zip
zip -r ../client-website-deliverable.zip index.html about.html services.html portfolio.html blog.html contact.html style.css script.js README.md

# Copy the zip to your phone's accessible Downloads folder
cp ../client-website-deliverable.zip /sdcard/Download/
```

Now you can open your phone's Files app, locate `client-website-deliverable.zip` in your **Downloads** folder, and email it directly or send via WhatsApp / Google Drive to your client.

---

## 💼 How to Sell This Template for $500 – $2,000

1. **Target Businesses:** Local medical/dental practices, boutique accounting/law firms, high-end construction contractors, engineering consultancies, or premier restaurants.
2. **Value Pitch:** Explain that unlike slow, bloated WordPress sites that require constant plugin maintenance and get hacked, this website is:
   - Ultra-fast (loads in under 0.5s, 100/100 Google PageSpeed)
   - Zero maintenance overhead (no database, no WordPress vulnerabilities)
   - Completely responsive on all devices
   - SEO-optimized with Open Graph social preview cards
3. **Turnaround Time:** Rebrand the client's name, phone, email, and 3 colors in `style.css` in less than 2 hours. Deliver within 24-48 hours and collect $500 to $2,000.

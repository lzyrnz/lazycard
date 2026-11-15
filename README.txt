LazyCard website (v2)
=====================

What customers get
  1. They buy a Lazy card from you. Every new card has this link written on it:
       https://lazycard.netlify.app/setup
  2. They tap the card, the setup opens, and they build their page:
       Style (calling card or business card, design, color)
       About you (name, role, logo or photo, cover image)
       Links (phone, email, WhatsApp, website, location, booking, 7 social networks)
       Sections (about, experience timeline, education, skills, services, gallery, reviews,
                 opening hours, custom buttons, payment details, languages, certifications,
                 status badge, announcement)
       Publish (they choose a link name and a PIN)
  3. Their page goes live at:  https://lazycard.netlify.app/theirname
  4. On Android they tap "Write to my Lazy card" and hold the card to the phone. On iPhone they
     use the free NFC Tools app (the page shows the steps).
  5. To edit later they open the setup, enter their link name and PIN, change anything, publish.

Files
  index.html, style.css          The page and its design
  templates.css                  The nine card designs and their animations
  config.js                      YOUR SETTINGS (Facebook, price, card images, site address)
  card.js, setup.js, app.js      The website code
  favicon.svg                    The logo mark
  netlify/functions/card.mjs     The small backend that stores each customer's page
  package.json                   Tells Netlify to install its storage library
  netlify.toml, _headers         Makes /theirname addresses work

Pictures
  Photos, logos, covers and gallery pictures are resized and compressed in the browser before saving
  (about 60 KB for a photo, 150 KB for a cover, 120 KB per gallery picture), so pages load fast.

Put it online (Netlify)
  The page needs the backend function, so it must be deployed with the function.
  Drag and drop does NOT install the function's library. Use one of these:
  A) GitHub (easiest):
     1. Make a free GitHub account and a new repository. Upload every file in this folder
        (keep the netlify folder and its path exactly).
     2. In Netlify choose Add new site, Import an existing project, pick the repository.
        Leave the build command empty. Publish directory: .   (a single dot)
     3. Site settings, Change site name, set it to "lazycard" to get lazycard.netlify.app
        (if that name is free) or use your own domain.
  B) Netlify CLI:  npm i -g netlify-cli   then   netlify deploy --prod
  After deploying, open /api/card?ping=1 on your site. You should see {"ok":true}.

Settings (config.js)
  fb         Your Facebook link
  ig, tt     Instagram / TikTok links, or "" to hide them
  price      Your Standard price, for example "PHP 499"
  cardFront  Picture for the front of the Lazy card, for example "card-front.png"
  cardBack   Picture for the back of the Lazy card
  site       Your website address with no slash at the end
  To try a card picture first, open your site with #admin at the end of the address.
  Use a credit-card shape, about 1012 x 638 px.

Writing the default link on new cards
  Use the free NFC Tools app: Write, Add a record, URL, paste
  https://lazycard.netlify.app/setup  then hold each blank card to the phone.
  After a customer writes their own link, the card shows their page instead.

Good to know
  Pages are stored in Netlify Blobs (built in, no database to run).
  PINs are stored hashed, never as plain text.
  Anyone with a link can view that page. Names like setup, admin, api are reserved.
  Photos are shrunk in the browser before saving. A page can hold up to about 1.5 MB.
  Writing NFC from the browser works on Android Chrome. iPhone cannot, so use NFC Tools.
  If the backend is missing, the setup falls back to long links (text only, no photos).
  Netlify's free plan limits change over time. Check netlify.com/pricing for current numbers.
  There is no rate limiting. If someone abuses it, add a Netlify firewall rule or ask for help.

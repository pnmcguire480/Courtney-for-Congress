#!/bin/bash
# Quick article publisher for Cort4Congress
# Usage: bash news/publish.sh "Article Title Here" "Short description under 160 chars" "campaign-update"
#
# Article types: campaign-update | statement | event-recap | press-release
#
# This creates the article file from the template and tells you what to do next.

TITLE="$1"
DESC="$2"
TYPE="${3:-campaign-update}"

if [ -z "$TITLE" ] || [ -z "$DESC" ]; then
  echo ""
  echo "Usage: bash news/publish.sh \"Title\" \"Description\" [type]"
  echo ""
  echo "Types: campaign-update | statement | event-recap | press-release"
  echo ""
  echo "Example:"
  echo "  bash news/publish.sh \"Why a Nurse Is Running for Congress\" \"Cortney Peterson explains why healthcare workers belong in Congress — and what she'll fight for in Ohio's 11th District.\" statement"
  echo ""
  exit 1
fi

# Generate slug from title
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')
DATE=$(date +%Y-%m-%d)
DISPLAY_DATE=$(date +"%B %-d, %Y")
FILENAME="${DATE}-${SLUG}.html"
URL="https://cortneyforcongress.org/news/${FILENAME}"

# Map type to tag
case "$TYPE" in
  campaign-update) TAG="Campaign Update"; TAG_CLASS="tag-update" ;;
  statement)       TAG="Statement";       TAG_CLASS="tag-statement" ;;
  event-recap)     TAG="Event Recap";     TAG_CLASS="tag-event-recap" ;;
  press-release)   TAG="Press Release";   TAG_CLASS="tag-press" ;;
  *)               TAG="Campaign Update"; TAG_CLASS="tag-update" ;;
esac

# Copy template
cp news/_template.html "news/${FILENAME}"

# Replace placeholders
if [[ "$OSTYPE" == "darwin"* ]]; then
  SED_I="sed -i ''"
else
  SED_I="sed -i"
fi

$SED_I "s|POST TITLE|${TITLE}|g" "news/${FILENAME}"
$SED_I "s|POST DESCRIPTION — 1-2 sentences, under 160 characters.|${DESC}|g" "news/${FILENAME}"
$SED_I "s|POST DESCRIPTION|${DESC}|g" "news/${FILENAME}"
$SED_I "s|YYYY-MM-DD-slug.html|${FILENAME}|g" "news/${FILENAME}"
$SED_I "s|YYYY-MM-DD|${DATE}|g" "news/${FILENAME}"
$SED_I "s|Month DD, YYYY|${DISPLAY_DATE}|g" "news/${FILENAME}"
$SED_I "s|Campaign Update</div>|${TAG}</div>|g" "news/${FILENAME}"

echo ""
echo "  Created: news/${FILENAME}"
echo "  URL:     ${URL}"
echo ""
echo "  Next steps:"
echo "  1. Edit news/${FILENAME} — write the article content"
echo "  2. Add a card to news/index.html (copy the template comment)"
echo "  3. Add to sitemap.xml"
echo "  4. git add, commit, push"
echo "  5. Share on social media with the URL above"
echo ""

# Generate the card HTML for news/index.html
echo "  Card HTML for news/index.html (paste above the existing cards):"
echo ""
echo "      <article class=\"post-card reveal\">"
echo "        <div class=\"post-card-body\">"
echo "          <div class=\"post-meta\">"
echo "            <span class=\"post-date\">${DISPLAY_DATE}</span>"
echo "            <span class=\"post-tag ${TAG_CLASS}\">${TAG}</span>"
echo "          </div>"
echo "          <h3 class=\"post-title\"><a href=\"${FILENAME}\">${TITLE}</a></h3>"
echo "          <p class=\"post-excerpt\">WRITE A 1-2 SENTENCE EXCERPT HERE</p>"
echo "          <a href=\"${FILENAME}\" class=\"post-read-more\" aria-label=\"Read full post: ${TITLE}\">Read More</a>"
echo "        </div>"
echo "      </article>"
echo ""

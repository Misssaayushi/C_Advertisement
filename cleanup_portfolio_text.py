import re

file_path = r'c:\Users\aayus\Desktop\service based site\portfolio.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find h4 and p within the overlay div
# <div class="absolute inset-0 ..."> ... <h4 ...>...</h4> ... <p ...>...</p> ... </div>
# We want to remove the h4 and p but keep the div and its classes.

# regex to match the h4 and p blocks inside the portfolio items
pattern = re.compile(r'(<div class="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">\s*)(<h4.*?>.*?</h4>\s*<p.*?>.*?</p>)(\s*</div>)', re.DOTALL)

new_content = pattern.sub(r'\1\3', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully removed h4 and p tags from portfolio.html")

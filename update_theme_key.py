import os
import re

html_files = [
    "index.html",
    "about.html",
    "services.html",
    "portfolio.html",
    "contact.html"
]

base_dir = r"c:\Users\aayus\Desktop\service based site"

# New inline script that uses 'theme-preference' and defaults to light
new_inline_script = '''<script>
        if (localStorage.getItem('theme-preference') === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>'''

for file_name in html_files:
    file_path = os.path.join(base_dir, file_name)
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the old inline script block
    # Match any <script> if (localStorage.getItem(...) === 'dark') { ... } </script>
    pattern = r'<script>\s*if\s*\(localStorage\.getItem\(\'[^\']+\'\)\s*===\s*\'dark\'\).*?</script>'
    content = re.sub(pattern, new_inline_script, content, flags=re.DOTALL)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Update main.js
main_js_path = os.path.join(base_dir, "js", "main.js")
if os.path.exists(main_js_path):
    with open(main_js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace 'color-theme' with 'theme-preference' everywhere
    content = content.replace("'color-theme'", "'theme-preference'")
    
    with open(main_js_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Theme preference key updated to 'theme-preference' and standardized across all files!")

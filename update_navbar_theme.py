import os

html_files = [
    "index.html",
    "about.html",
    "services.html",
    "portfolio.html",
    "contact.html"
]

base_dir = r"c:\Users\aayus\Desktop\service based site"

for file in html_files:
    file_path = os.path.join(base_dir, file)
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Light theme default
    # Replace window.matchMedia check with just checking if 'dark' is explicitly stored
    old_theme_script = "if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {document.documentElement.classList.add('dark');} else {document.documentElement.classList.remove('dark');}"
    new_theme_script = "if (localStorage.getItem('color-theme') === 'dark') {document.documentElement.classList.add('dark');} else {document.documentElement.classList.remove('dark');}"
    content = content.replace(old_theme_script, new_theme_script)
    
    # Also fix secondary pages if they have slightly different format 
    # (Just in case)
    import re
    content = re.sub(r'if \(localStorage\.getItem\(\'color-theme\'\) === \'dark\' \|\|.*?\}\) \{document', 
                     "if (localStorage.getItem('color-theme') === 'dark') {document", content)

    # 2. Change Mobile navbar theme in light theme
    # Old nav class: `bg-[#121212] border border-gray-800`
    # New nav class: `bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800`
    old_mobile_nav_class = 'class="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-[#121212] border border-gray-800'
    new_mobile_nav_class = 'class="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-white/95 dark:bg-[#121212]/95 border border-gray-200 dark:border-gray-800'
    content = content.replace(old_mobile_nav_class, new_mobile_nav_class)
    
    # Fix the inactive hover state on the text of the mobile nav to be respectful of light mode
    content = content.replace('class="flex flex-col items-center justify-center w-14 transition-colors text-gray-500 hover:text-gray-300"',
                              'class="flex flex-col items-center justify-center w-14 transition-colors text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-gray-200"')

    # 3. Make the top navbar "static"
    # User requested: "keep navbar and toogle button static on every page"
    # The header has `fixed w-full top-0 ...`
    # If we change it to `relative bg-white z-50 ...` and remove `fixed w-full top-0`, we must also remove the pt-20 from `<main class="flex-grow pt-20">` so there's no massive gap.
    # Wait, if they just mean "static", I will replace `fixed w-full top-0` with `sticky top-0 w-full`? Sticky is generally preferred, but CSS 'static' means `relative` or `static`. Let's use `sticky top-0 z-50` because that means it stays at the top but is part of the document flow, removing overlap. If they explicitly want `static`, I will supply `relative` and remove `pt-20` on `<main>`
    if 'fixed w-full top-0' in content:
        content = content.replace('fixed w-full top-0', 'relative w-full')
        # Also fix main pt-20 to pt-4 or pt-8
        content = content.replace('pt-20', 'pt-8')
        content = content.replace('pt-24', 'pt-12') # adjust Hero top padding
        content = content.replace('pt-32', 'pt-16') # adjust secondary pages top padding

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Applied static navbar layout, light theme defaulted, and mobile navbar light-mode tweaks!")

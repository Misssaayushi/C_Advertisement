import os

html_files = [
    ("index.html", "Home"),
    ("about.html", "About"),
    ("services.html", "Services"),
    ("portfolio.html", "Portfolio"),
    ("contact.html", "Contact")
]

base_dir = r"c:\Users\aayus\Desktop\service based site"

def get_nav_html(active_page):
    nav_items = [
        ("Home", "index.html", "ph-house"),
        ("About", "about.html", "ph-info"),
        ("Services", "services.html", "ph-sparkle"),
        ("Portfolio", "portfolio.html", "ph-image"),
        ("Contact", "contact.html", "ph-envelope-simple")
    ]
    
    html = '<nav class="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-[#121212] border border-gray-800 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex justify-around items-center px-2 py-3 backdrop-blur-md bg-opacity-95">\n'
    
    for name, link, icon in nav_items:
        is_active = (name == active_page)
        color_class = "text-primary dark:text-primaryLighter" if is_active else "text-gray-500 hover:text-gray-300"
        icon_weight = "ph-fill" if is_active else "ph"
        
        html += f'''        <a href="{link}" class="flex flex-col items-center justify-center w-14 transition-colors {color_class}">
            <i class="{icon_weight} {icon} text-2xl mb-1"></i>
            <span class="text-[10px] font-medium tracking-wide">{"Home" if name=="Home" and is_active else name.capitalize()}</span>
        </a>\n'''
        
    html += '    </nav>'
    return html


for file_name, active_page in html_files:
    file_path = os.path.join(base_dir, file_name)
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove the old hamburger button from header 
    hamburger_snippet = '''                    <button class="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none" aria-label="Open Menu">
                    <i class="ph ph-list text-3xl"></i>
                </button>'''
    
    if hamburger_snippet in content:
        content = content.replace(hamburger_snippet, "")

    # 2. Inject the mobile nav right before <!-- Footer --> or Custom JS
    # First, check if there's already a mobile nav injected (in case script is run twice)
    if '<nav class="md:hidden fixed bottom-6' in content:
        import re
        content = re.sub(r'<nav class="md:hidden fixed bottom-6.*?</nav>', get_nav_html(active_page), content, flags=re.DOTALL)
    else:
        # Inject right before <!-- Custom JS -->
        content = content.replace('    <!-- Custom JS -->', get_nav_html(active_page) + '\n\n    <!-- Custom JS -->')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Mobile bottom navigation applied to all files!")

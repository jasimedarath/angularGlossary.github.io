import os
import re
from pathlib import Path

def fix_curly_braces_in_template_literals(content):
    """Replace { and } with &#123; and &#125; only within backtick template literals."""
    def replace_in_template(match):
        template_content = match.group(1)
        # Replace curly braces with HTML entities
        modified = template_content.replace('{', '&#123;').replace('}', '&#125;')
        return f'`{modified}`'
    
    # Match backtick template literals and replace braces inside them
    # This regex matches everything between backticks (non-greedy)
    pattern = r'`((?:[^`\\]|\\.)*?)`'
    result = re.sub(pattern, replace_in_template, content, flags=re.DOTALL)
    return result

def count_replacements(original, modified):
    """Count how many braces were replaced."""
    # Count braces in template literals in original
    original_braces = len(re.findall(r'`[^`]*[{}][^`]*`', original))
    return original_braces

def main():
    react_dir = Path('src/app/components/react')
    summary = []
    
    # Find all .component.ts files (excluding .spec.ts)
    for ts_file in react_dir.rglob('*.component.ts'):
        if '.spec.' in ts_file.name:
            continue
        
        # Read file
        with open(ts_file, 'r', encoding='utf-8') as f:
            original_content = f.read()
        
        # Fix braces
        modified_content = fix_curly_braces_in_template_literals(original_content)
        
        # Count braces in original template literals
        original_brace_count = original_content.count('{') + original_content.count('}')
        modified_brace_count = modified_content.count('{') + modified_content.count('}')
        replacements = original_brace_count - modified_brace_count
        
        # Write back if changed
        if original_content != modified_content:
            with open(ts_file, 'w', encoding='utf-8', newline='') as f:
                f.write(modified_content)
            
            summary.append({
                'file': ts_file.name,
                'replacements': replacements // 2  # Divide by 2 since we replace both { and }
            })
    
    # Print summary
    print("\n=== SUMMARY ===\n")
    print(f"{'File':<45} {'Replacements':<15}")
    print("-" * 60)
    for item in sorted(summary, key=lambda x: x['file']):
        print(f"{item['file']:<45} {item['replacements']:<15}")
    
    print("-" * 60)
    print(f"\nTotal files fixed: {len(summary)}")
    print(f"Total brace pairs replaced: {sum(item['replacements'] for item in summary)}")

if __name__ == '__main__':
    main()
